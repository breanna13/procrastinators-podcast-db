export interface Host {
  id: number;
  name: string;
}

export interface Episode {
  id: number;
  title: string;
  episodeNumber: number | null;
  description: string | null;
  releaseDate: string | null;
  hosts: Host[];
}

export interface FilterState {
  selectedHostIds: number[];
  matchAll: boolean;
}
