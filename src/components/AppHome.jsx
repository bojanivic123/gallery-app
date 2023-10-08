import { useContext, useEffect, useState } from "react";
import GalleryContext from "../context/GalleryContext";
import { filterGalleries, getAll } from "../services/GalleryService";
import GalleryPresentation from "./GalleryPresentation";

const AppHome = () => {
  const { galleries, updateGallery } = useContext(GalleryContext);
  const [searchName, setSearchName] = useState("");
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    getAll({ page: 1 }).then(({ data }) => {
      updateGallery(data.data);
      setLastPage(data.last_page);
    });
  }, [updateGallery]);

  useEffect(() => {
    if (isFilterApplied) {
      setCurrentPage(1);
      setLoadMoreVisible(true);
    }
  }, [isFilterApplied]);

  const loadMoreGalleries = () => {
    if (currentPage < lastPage) {
      const nextPage = currentPage + 1;
      getAll({ page: nextPage }).then(({ data }) => {
        const newGalleries = [...galleries, ...data.data];
        updateGallery(newGalleries);
        setCurrentPage(nextPage);
        if (nextPage === lastPage) {
          setLoadMoreVisible(false);
        }
        if (isFilterApplied) {
          const filteredGalleries = newGalleries.filter((gallery) => {
            return (
              gallery.name.toLowerCase().includes(searchName.toLowerCase()) ||
              gallery.description
                .toLowerCase()
                .includes(searchName.toLowerCase()) ||
              gallery.user.first_name
                .toLowerCase()
                .includes(searchName.toLowerCase()) ||
              gallery.user.last_name
                .toLowerCase()
                .includes(searchName.toLowerCase())
            );
          });
          setFilteredGalleries(filteredGalleries);
        }
      });
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();

    if (searchName) {
      filterGalleries(searchName).then(({ data }) => {
        setFilteredGalleries(data.data);
        setLastPage(data.last_page);
      });
      setIsFilterApplied(true);
    } else {
      getAll({ page: 1 }).then(({ data }) => {
        setFilteredGalleries(data.data);
        setLastPage(data.last_page);
      });
      setIsFilterApplied(false);
    }
  };

  return (
    <div className="container-fluid bg-danger p-3"> 
      <div className="d-flex justify-content-center">
        <form className="d-flex mt-2 mb-2" onSubmit={handleFilter}> 
          <input type="text" className="form-control me-2 text-black" style={{ width: "330px" }} placeholder="Search..." value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <button type="submit" className="btn btn-warning text-black">Filter</button> 
        </form>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {galleries.length === 0 ? (
          <h1 className="container mt-5">No galleries available.</h1>
        ) : isFilterApplied && filteredGalleries.length === 0 ? (
          <h1 className="container mt-5">No content by filter.</h1>
        ) : (
          (isFilterApplied ? filteredGalleries : galleries)
            .slice(0, currentPage * 10)
            .map((gallery, id) => (
              <GalleryPresentation key={id} gallery={gallery} id={id} />
            ))
        )}
      </div>
      {loadMoreVisible && currentPage < lastPage && (
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary" onClick={loadMoreGalleries}>Load More</button> 
        </div>
      )}
    </div>
  );
};

export default AppHome;







