import { createContext } from "react";

const GalleryContext = createContext({
  galleries: [],
  updateGallery: () => {},
  addGallery: () => {}
});

export default GalleryContext;


