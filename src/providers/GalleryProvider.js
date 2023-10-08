import { useState } from "react";
import { addGallery } from "../services/GalleryService";
import GalleryContext from "../context/GalleryContext";

const GalleryProvider = ({ children }) => {
  const [galleryState, setGalleryState] = useState([]);

  const addNewGallery = (name, description, urls, user_id) => {
    addGallery(name, description, urls, user_id)
      .then(({ data }) => {
        setGalleryState((prevState) => [...prevState, data]);
      })
      .catch((error) => {
        console.error("Error occurred while adding gallery:", error);
      });
  };

  const galleryContext = {
    galleries: galleryState,
    updateGallery: setGalleryState,
    addGallery: addNewGallery,
  };

  return (
    <GalleryContext.Provider value={galleryContext}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;



