import { useState, useEffect } from "react";
import { Host, Episode, FilterState } from "./types";
import { fetchHosts, fetchEpisodes } from "./api";

function App() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    selectedHostIds: [],
    matchAll: false,
  });

  useEffect(() => {
    loadHosts();
  }, []);

  useEffect(() => {
    loadEpisodes();
  }, []);

  async function loadHosts() {
    try {
      const hostsData = await fetchHosts();
      setHosts(hostsData);
    } catch (err) {
      setError("Failed to load hosts");
    }
  }

  async function loadEpisodes() {
    try {
      setLoading(true);
      const episodesData = await fetchEpisodes();
      setEpisodes(episodesData);
      setError(null);
    } catch (err) {
      setError("Failed to load episodes");
    }
  }

  function handleHostCheckboxChange(hostId: number) {
    setFilterState((prev) => {
      const isSelected = prev.selectedHostIds.includes(hostId);
      const newSelectedIds = isSelected
        ? prev.selectedHostIds.filter((id) => id !== hostId)
        : [...prev.selectedHostIds, hostId];

      return {
        ...prev,
        selectedHostIds: newSelectedIds,
      };
    });
  }

  function handleMatchAllChange() {
    setFilterState((prev) => ({
      ...prev,
      matchAll: !prev.matchAll,
    }));
  }

  async function handleSearch() {
    try {
      setLoading(true);
      const hostIds =
        filterState.selectedHostIds.length > 0
          ? filterState.selectedHostIds
          : undefined;

      const episodesData = await fetchEpisodes(hostIds, filterState.matchAll);
      setEpisodes(episodesData);
      setError(null);
    } catch (err) {
      setError("Failed to search episodes");
    }
  }

  function handleClearAll() {
    setFilterState({
      selectedHostIds: [],
      matchAll: false,
    });
    setEpisodes([]);
  }

  function handleShowAll() {
    setFilterState({
      selectedHostIds: [],
      matchAll: false,
    });
    loadEpisodes();
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>The Procrastinators Podcast DB Tool</h1>

      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #c62828",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          marginBottom: "30px",
          border: "1px solid #ccc",
          padding: "20px",
        }}
      >
        <h2>Hosts</h2>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={filterState.matchAll}
              onChange={handleMatchAllChange}
              style={{ marginRight: "8px" }}
            />
            <strong>Exact Match</strong>
            <div
              style={{ fontSize: "0.9em", color: "#666", marginLeft: "24px" }}
            >
              (Show only episodes with exactly the selected hosts)
            </div>
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Select Hosts:</strong>
          <div style={{ marginTop: "10px" }}>
            {hosts.map((host) => (
              <label
                key={host.id}
                style={{
                  display: "block",
                  marginBottom: "8px",
                  padding: "5px",
                }}
              >
                <input
                  type="checkbox"
                  checked={filterState.selectedHostIds.includes(host.id)}
                  onChange={() => handleHostCheckboxChange(host.id)}
                  style={{ marginRight: "8px" }}
                />
                {host.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={handleSearch}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
          <button
            onClick={handleClearAll}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Clear All
          </button>
          <button
            onClick={handleShowAll}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Show All
          </button>
        </div>
      </div>

      <div>
        <h2>Episodes ({episodes.length})</h2>

        {
          <div>
            {episodes.map((episode) => (
              <div
                key={episode.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  marginBottom: "15px",
                }}
              >
                <h3>{episode.title}</h3>

                {episode.description && (
                  <p style={{ color: "#555" }}>{episode.description}</p>
                )}

                {episode.releaseDate && (
                  <p style={{ fontSize: "0.9em", color: "#666" }}>
                    Date: {episode.releaseDate}
                  </p>
                )}

                <div style={{ marginTop: "10px" }}>
                  <strong>Hosts: </strong>
                  {episode.hosts.map((host, index) => (
                    <span key={host.id}>
                      {host.name}
                      {index < episode.hosts.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
