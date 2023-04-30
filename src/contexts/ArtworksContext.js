import { createContext } from "react";

export const ArtworksContext = createContext({
  artworks: [],
  artworksLoading: true,
});
