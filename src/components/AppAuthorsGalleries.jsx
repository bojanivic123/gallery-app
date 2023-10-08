import { useEffect, useState } from "react";
import { getUserGalleries, getUser } from "../services/AuthService";
import { Link, useParams } from "react-router-dom";

const AppAuthorsGalleries = () => {
  const { id } = useParams();
  const [galleries, setGalleries] = useState([]);
  const [author, setAuthor] = useState(null);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [visibleGalleries, setVisibleGalleries] = useState(10);

  useEffect(() => {
    if (id) {
      getUserGalleries(id).then(({ data }) => {
        setGalleries(data.galleries);
        setFilteredGalleries(data.galleries);
        getUser(id).then(({ data }) => {
          setAuthor(data.user);
        });
      });
    }
  }, [id]);

  const handleFilter = (e) => {
    e.preventDefault();

    let filteredGalleries = [];

    if (searchParam) {
      filteredGalleries = galleries.filter((gallery) => {
        return (
          gallery.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          gallery.description.toLowerCase().includes(searchParam.toLowerCase())
        );
      });
    } else {
      filteredGalleries = galleries;
    }

    setFilteredGalleries(filteredGalleries);
    setVisibleGalleries(10);
  };

  const loadMoreGalleries = () => {
    setVisibleGalleries((prevVisibleGalleries) => prevVisibleGalleries + 10);
  };

  return (
    <div className="container mt-4">
      {author && (
        <h1 className="mb-4">Author: {author.first_name} {author.last_name}</h1>
      )}
      <form className="mb-4" onSubmit={handleFilter}>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search by name, or description..." value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
          <button type="submit" className="btn btn-outline-success">Filter</button>
        </div>
      </form>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {Array.isArray(filteredGalleries) && filteredGalleries.length > 0 ? (
          filteredGalleries.slice(0, visibleGalleries).map((gallery, id) => (
            <div key={id} className="col mb-4">
              <div className="card h-100"> 
                <Link to={`/galleries/${gallery.id}`} className="text-decoration-none">
                  <img src={JSON.parse(gallery.urls || "[]")[0]} className="card-img-top" alt={`${gallery.name}`} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title"> 
                    <Link to={`/galleries/${gallery.id}`} className="text-dark text-decoration-none">{gallery.name}</Link>
                  </h5>
                  <p className="card-text">{new Date(gallery.created_at).toLocaleString()}</p> 
                  <p className="card-text">{gallery.description ? gallery.description.substring(0, 50) + "..." : "No description"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="container mt-5">No content to show.</h1>
        )}
      </div>
      {visibleGalleries < filteredGalleries.length && (
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary" onClick={loadMoreGalleries}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default AppAuthorsGalleries;



