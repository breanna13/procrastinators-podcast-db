const API_URL = 'http://localhost:4000/graphql';

async function graphqlRequest(query: string, variables?: any) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  
  return result.data;
}

export async function fetchHosts() {
  const query = `
    query {
      hosts {
        id
        name
      }
    }
  `;
  
  const data = await graphqlRequest(query);
  return data.hosts;
}

export async function fetchEpisodes(hostIds?: number[], matchAll?: boolean) {
  const query = `
    query GetEpisodes($hostIds: [Int!], $matchAll: Boolean) {
      episodes(hostIds: $hostIds, matchAll: $matchAll) {
        id
        title
        episodeNumber
        description
        releaseDate
        hosts {
          id
          name
        }
      }
    }
  `;
  
  const data = await graphqlRequest(query, { hostIds, matchAll });
  return data.episodes;
}

export async function addHost(name: string) {
  const mutation = `
    mutation AddHost($name: String!) {
      addHost(name: $name) {
        id
        name
      }
    }
  `;
  
  const data = await graphqlRequest(mutation, { name });
  return data.addHost;
}

export async function addEpisode(
  title: string,
  episodeNumber: number | null,
  description: string | null,
  releaseDate: string | null,
  hostIds: number[]
) {
  const mutation = `
    mutation AddEpisode(
      $title: String!
      $episodeNumber: Int
      $description: String
      $releaseDate: String
      $hostIds: [Int!]!
    ) {
      addEpisode(
        title: $title
        episodeNumber: $episodeNumber
        description: $description
        releaseDate: $releaseDate
        hostIds: $hostIds
      ) {
        id
        title
        episodeNumber
        description
        releaseDate
        hosts {
          id
          name
        }
      }
    }
  `;
  
  const data = await graphqlRequest(mutation, {
    title,
    episodeNumber,
    description,
    releaseDate,
    hostIds,
  });
  return data.addEpisode;
}

export async function deleteEpisode(id: number) {
  const mutation = `
    mutation DeleteEpisode($id: Int!) {
      deleteEpisode(id: $id)
    }
  `;
  
  const data = await graphqlRequest(mutation, { id });
  return data.deleteEpisode;
}
