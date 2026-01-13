const { buildSchema } = require("graphql");
const pool = require("./db");

// GraphQL schema
const schema = buildSchema(`
  type Host {
    id: Int!
    name: String!
  }

  type Episode {
    id: Int!
    title: String!
    episodeNumber: Int
    description: String
    releaseDate: String
    hosts: [Host!]!
  }

  type Query {
    hosts: [Host!]!
    episodes(hostIds: [Int!], matchAll: Boolean): [Episode!]!
    episode(id: Int!): Episode
  }

  type Mutation {
    addHost(name: String!): Host!
    addEpisode(
      title: String!
      episodeNumber: Int
      description: String
      releaseDate: String
      hostIds: [Int!]!
    ): Episode!
    updateEpisode(
      id: Int!
      title: String
      episodeNumber: Int
      description: String
      releaseDate: String
      hostIds: [Int!]
    ): Episode!
    deleteEpisode(id: Int!): Boolean!
  }
`);

// Resolvers
const root = {
  // Query resolvers
  hosts: async () => {
    const result = await pool.query("SELECT * FROM hosts ORDER BY name");
    return result.rows;
  },

  episodes: async ({ hostIds, matchAll }) => {
    console.log('🔧 Backend received:', { hostIds, matchAll });
    
    let query;
    let params = [];
  
    if (!hostIds || hostIds.length === 0) {
      console.log('📋 Mode: SHOW ALL EPISODES');
      query = `
        SELECT DISTINCT e.* 
        FROM episodes e
        ORDER BY e.episode_number DESC, e.id DESC
      `;
    } else if (matchAll === true) {
      console.log('📋 Mode: EXCLUSIVE (checkbox checked)');
      // EXCLUSIVE: Episodes with EXACTLY these hosts and no one else
      query = `
        SELECT e.* 
        FROM episodes e
        WHERE e.id IN (
          SELECT episode_id 
          FROM episode_hosts 
          WHERE host_id = ANY($1)
          GROUP BY episode_id 
          HAVING COUNT(DISTINCT host_id) = $2
        )
        AND e.id NOT IN (
          SELECT episode_id 
          FROM episode_hosts 
          WHERE host_id != ALL($1)
        )
        ORDER BY e.episode_number DESC, e.id DESC
      `;
      params = [hostIds, hostIds.length];
    } else {
      console.log('📋 Mode: CONTAINS ALL (default, checkbox unchecked)');
      // DEFAULT: Episodes that have ALL specified hosts (may have others too)
      query = `
        SELECT e.* 
        FROM episodes e
        WHERE (
          SELECT COUNT(DISTINCT eh.host_id)
          FROM episode_hosts eh
          WHERE eh.episode_id = e.id
          AND eh.host_id = ANY($1)
        ) = $2
        ORDER BY e.episode_number DESC, e.id DESC
      `;
      params = [hostIds, hostIds.length];
    }
  
    console.log('🔎 Query params:', params);
    const result = await pool.query(query, params);
    console.log('✅ Found', result.rows.length, 'episodes');
    
    // Fetch hosts for each episode
    const episodes = await Promise.all(
      result.rows.map(async (episode) => {
        const hostsResult = await pool.query(
          `SELECT h.* FROM hosts h
           INNER JOIN episode_hosts eh ON h.id = eh.host_id
           WHERE eh.episode_id = $1
           ORDER BY h.name`,
          [episode.id]
        );
        return {
          ...episode,
          episodeNumber: episode.episode_number,
          releaseDate: episode.release_date,
          hosts: hostsResult.rows
        };
      })
    );
  
    return episodes;
  },

  episode: async ({ id }) => {
    const result = await pool.query("SELECT * FROM episodes WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) return null;

    const episode = result.rows[0];
    const hostsResult = await pool.query(
      `SELECT h.* FROM hosts h
       INNER JOIN episode_hosts eh ON h.id = eh.host_id
       WHERE eh.episode_id = $1
       ORDER BY h.name`,
      [id]
    );

    return {
      ...episode,
      episodeNumber: episode.episode_number,
      releaseDate: episode.release_date,
      hosts: hostsResult.rows,
    };
  },

  // Mutation resolvers
  addHost: async ({ name }) => {
    const result = await pool.query(
      "INSERT INTO hosts (name) VALUES ($1) RETURNING *",
      [name]
    );
    return result.rows[0];
  },

  addEpisode: async ({
    title,
    episodeNumber,
    description,
    releaseDate,
    hostIds,
  }) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Insert episode
      const episodeResult = await client.query(
        `INSERT INTO episodes (title, episode_number, description, release_date) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, episodeNumber, description, releaseDate]
      );
      const episode = episodeResult.rows[0];

      // Insert episode-host relationships
      for (const hostId of hostIds) {
        await client.query(
          "INSERT INTO episode_hosts (episode_id, host_id) VALUES ($1, $2)",
          [episode.id, hostId]
        );
      }

      await client.query("COMMIT");

      // Fetch hosts
      const hostsResult = await pool.query(
        `SELECT h.* FROM hosts h
         INNER JOIN episode_hosts eh ON h.id = eh.host_id
         WHERE eh.episode_id = $1
         ORDER BY h.name`,
        [episode.id]
      );

      return {
        ...episode,
        episodeNumber: episode.episode_number,
        releaseDate: episode.release_date,
        hosts: hostsResult.rows,
      };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  updateEpisode: async ({
    id,
    title,
    episodeNumber,
    description,
    releaseDate,
    hostIds,
  }) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Build dynamic update query
      const updates = [];
      const params = [];
      let paramCount = 1;

      if (title !== undefined) {
        updates.push(`title = $${paramCount++}`);
        params.push(title);
      }
      if (episodeNumber !== undefined) {
        updates.push(`episode_number = $${paramCount++}`);
        params.push(episodeNumber);
      }
      if (description !== undefined) {
        updates.push(`description = $${paramCount++}`);
        params.push(description);
      }
      if (releaseDate !== undefined) {
        updates.push(`release_date = $${paramCount++}`);
        params.push(releaseDate);
      }

      if (updates.length > 0) {
        params.push(id);
        await client.query(
          `UPDATE episodes SET ${updates.join(", ")} WHERE id = $${paramCount}`,
          params
        );
      }

      // Update hosts if provided
      if (hostIds) {
        await client.query("DELETE FROM episode_hosts WHERE episode_id = $1", [
          id,
        ]);
        for (const hostId of hostIds) {
          await client.query(
            "INSERT INTO episode_hosts (episode_id, host_id) VALUES ($1, $2)",
            [id, hostId]
          );
        }
      }

      await client.query("COMMIT");

      // Fetch updated episode
      const episodeResult = await pool.query(
        "SELECT * FROM episodes WHERE id = $1",
        [id]
      );
      const episode = episodeResult.rows[0];

      const hostsResult = await pool.query(
        `SELECT h.* FROM hosts h
         INNER JOIN episode_hosts eh ON h.id = eh.host_id
         WHERE eh.episode_id = $1
         ORDER BY h.name`,
        [id]
      );

      return {
        ...episode,
        episodeNumber: episode.episode_number,
        releaseDate: episode.release_date
          ? episode.release_date.toString()
          : null,
        hosts: hostsResult.rows,
      };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  deleteEpisode: async ({ id }) => {
    const result = await pool.query("DELETE FROM episodes WHERE id = $1", [id]);
    return result.rowCount > 0;
  },
};

module.exports = { schema, root };
