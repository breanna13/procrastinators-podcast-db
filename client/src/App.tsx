import React, { useState, useEffect } from "react";
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
    loadEpisodes();
  }, []);

  async function loadHosts() {
    try {
      const hostsData = await fetchHosts();
      setHosts(hostsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load hosts");
    }
  }

  async function loadEpisodes() {
    try {
      setLoading(true);
      const episodesData = await fetchEpisodes();
      setEpisodes(episodesData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load episodes");
    } finally {
      setLoading(false);
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
      setError(
        err instanceof Error ? err.message : "Failed to search episodes"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClearFilters() {
    setFilterState({
      selectedHostIds: [],
      matchAll: false,
    });
    loadEpisodes();
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <img
            src="/tpc_logo.jpeg"
            alt="The Procrastinators Podcast"
            className="mx-auto w-64 h-auto drop-shadow-2xl rounded-lg"
          />
          <p className="text-white text-xl mt-4 font-semibold drop-shadow-lg">
            <a href="https://youtu.be/XzWcameJDow?si=BlEJ_aby5haFunri&t=69">
              DATABASE!!! DATABASE!!!!!
            </a>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Filter Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-pcp-dark mb-6">
            Filter by Hosts
          </h2>

          {/* Exclusive Mode Toggle */}
          <div className="mb-6">
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filterState.matchAll}
                onChange={handleMatchAllChange}
                className="mt-1 w-5 h-5 text-pcp-purple rounded focus:ring-pcp-blue"
              />
              <div>
                <span className="font-semibold text-pcp-dark group-hover:text-pcp-purple transition">
                  Exclusive mode (ONLY selected hosts)
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Shows ONLY episodes with exactly these hosts and no one else
                </p>
              </div>
            </label>
          </div>

          {/* Host Checkboxes */}
          <div className="mb-6">
            <p className="font-semibold text-pcp-dark mb-3">Select Hosts:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {hosts.map((host) => (
                <label
                  key={host.id}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-pcp-coral/20 cursor-pointer transition group"
                >
                  <input
                    type="checkbox"
                    checked={filterState.selectedHostIds.includes(host.id)}
                    onChange={() => handleHostCheckboxChange(host.id)}
                    className="w-4 h-4 text-pcp-purple rounded focus:ring-pcp-blue"
                  />
                  <span className="text-pcp-dark group-hover:text-pcp-purple transition font-medium">
                    {host.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-pcp-purple to-pcp-blue text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition"
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-pcp-gray text-white font-semibold rounded-lg hover:bg-pcp-dark transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-pcp-dark mb-6">
            Episodes ({episodes.length})
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pcp-purple border-t-transparent"></div>
            </div>
          ) : episodes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No episodes found.</p>
              <p className="text-sm mt-2">
                Try adjusting your filters or add some episodes!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="border-l-4 border-pcp-purple bg-gradient-to-r from-white to-pcp-coral/10 p-6 rounded-lg hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold text-pcp-dark mb-2">
                    {episode.episodeNumber && (
                      <span className="text-pcp-purple">
                        Episode {episode.episodeNumber}:{" "}
                      </span>
                    )}
                    {episode.title}
                  </h3>

                  {episode.description && (
                    <p className="text-gray-700 mb-3">{episode.description}</p>
                  )}

                  {episode.releaseDate && (
                    <p className="text-sm text-gray-500 mb-3">
                      📅 Released: {episode.releaseDate}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="font-semibold text-pcp-dark">Hosts:</span>
                    {episode.hosts.map((host, index) => (
                      <span
                        key={host.id}
                        className="px-3 py-1 bg-pcp-purple/20 text-pcp-purple rounded-full text-sm font-medium"
                      >
                        {host.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
