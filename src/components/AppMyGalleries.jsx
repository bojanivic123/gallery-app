import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { getUser, getUserGalleries } from "../services/AuthService"; 
import { Link } from "react-router-dom";

const AppMyGalleries = () => {
  const { user } = useContext(UserContext);
  const [galleries, setGalleries] = useState([]);
  const [author, setAuthor] = useState(null);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [visibleGalleries, setVisibleGalleries] = useState(10);

  useEffect(() => {
    if (user && user.id) {
      getUserGalleries(user.id).then(({ data }) => {
        setGalleries(data.galleries);
        setFilteredGalleries(data.galleries);
        getUser(user.id).then(({ data }) => {
          setAuthor(data.user);
        });
      });
    }
  }, [user]);

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
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="d-flex mt-3" onSubmit={handleFilter}>
          <input
            type="text"
            style={{ width: "300px" }}
            className="form-control mr-2"
            placeholder="Search by name, or description..."
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-success">
            Filter
          </button>
        </form>
      </div>
      <div
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
        style={{ margin: "auto" }}
      >
        {Array.isArray(filteredGalleries) && filteredGalleries.length > 0 ? (
          filteredGalleries.slice(0, visibleGalleries).map((gallery, id) => (
            <div
              key={id}
              className="col m-5"
              style={{ width: "380px", borderRadius: "5px", opacity: "90%" }}
            >
              <div className="card shadow-sm">
                <h3>
                  <Link
                    to={`/galleries/${gallery.id}`}
                    style={{ textDecoration: "none", color: "darkslategrey" }}
                  >
                    {gallery.name}
                  </Link>
                </h3>
                <p className="card-text mb-auto">
                  {new Date(gallery.created_at).toLocaleString()}
                </p>
                <img
                  src={JSON.parse(gallery.urls || "[]")[0]}
                  className="card-img-top"
                  alt={`${gallery.name}`}
                  width="100"
                  height="300"
                />
                <p className="mb-1 text-body-secondary">
                  <Link
                    to={`/authors/${gallery.id}`}
                    style={{ textDecoration: "none", color: "darkslategrey" }}
                  >
                    Author: {author?.first_name} {author?.last_name}
                  </Link>
                </p>
                <p className="card-text mb-auto">
                  Description:{" "}
                  {gallery.description
                    ? gallery.description.substring(0, 50) + "..."
                    : "No description"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1 className="container mt-5" style={{ width: "auto" }}>
            You don't have galleries yet.
          </h1>
        )}
      </div>
      {visibleGalleries < filteredGalleries.length && (
        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-primary" onClick={loadMoreGalleries}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AppMyGalleries;