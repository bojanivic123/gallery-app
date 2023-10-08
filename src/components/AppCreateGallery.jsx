import React, { useContext, useEffect, useState } from "react";
import GalleryContext from "../context/GalleryContext";
import UserContext from "../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editGallery, getSingle } from "../services/GalleryService";

const AppCreateGallery = () => {
  const { addGallery } = useContext(GalleryContext);
  const { user } = useContext(UserContext);
  const [urls, setUrls] = useState([""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [gallery, setGallery] = useState({
    name: "",
    description: "",
    urls: [],
    user_id: user.id,
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingle(id).then(({ data }) => {
        setGallery(data);
        setUrls(JSON.parse(data.urls));
      });
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGallery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (gallery.description.length > 1000) {
      setError("Description must be max 1000 characters long.");
      return;
    }

    if (gallery.name.length === 0) {
      setError("Name field is required.");
      return;
    }

    if (gallery.name.length < 2 || gallery.name.length > 255) {
      setError("Name must be between 2 and 255 characters.");
      return;
    }

    if (gallery.urls.length === 0) {
      setError("Url field is required.");
      return;
    }

    if (Array.isArray(gallery.urls) && gallery.urls.some((url) => url === "")) {
      setError("Please fill in all URL fields or remove them.");
      return;
    }

    const imageExtensions = ["png", "jpg", "jpeg"];

    const urlValidationRegex = /^(http|https):\/\/[^ "]+$/;

    for (const url of gallery.urls) {
      if (!urlValidationRegex.test(url)) {
        setError("Please enter a valid URL.");
        return;
      }

      const fileExtension = url.split(".").pop().toLowerCase();
      if (!imageExtensions.includes(fileExtension)) {
        setError(
          "Please enter a URL ending with a valid image extension (png, jpg, jpeg)."
        );
        return;
      }
    }
    if (id) {
      editGallery(id, gallery);
      navigate(`/galleries/${id}`);
    } else {
      addGallery(gallery.name, gallery.description, gallery.urls, user.id);
      setError("");
      setGallery({
        name: "",
        description: "",
        urls: [],
        user_id: user.id,
      });
      navigate("/");
    }
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;

    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index) => {
    if (urls.length === 1) {
      setError("At least one URL is required.");
      return;
    }

    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  const moveUrlUp = (index) => {
    if (index === 0) return;

    const newUrls = [...urls];
    const temp = newUrls[index - 1];
    newUrls[index - 1] = newUrls[index];
    newUrls[index] = temp;
    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  const moveUrlDown = (index) => {
    if (index === urls.length - 1) return;

    const newUrls = [...urls];
    const temp = newUrls[index + 1];
    newUrls[index + 1] = newUrls[index];
    newUrls[index] = temp;
    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className=" d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div
            className="card w-75 container"
            style={{ opacity: "90%", padding: "20px" }}
          >
            <h5 className="text-center mb-4">Add new gallery</h5>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter gallery name"
                    value={gallery.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Description</label>
                  <textarea
                    className="mb-3 form-control"
                    rows="4"
                    cols="50"
                    name="description"
                    placeholder="Enter gallery description"
                    value={gallery.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="row justify-content-between text-left">
                {Array.isArray(urls)
                  ? urls.map((url, index) => (
                      <div
                        className="form-group col-sm-6 flex-column d-flex"
                        key={index}
                      >
                        <label className="form-control-label px-3">Url</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter image url"
                          value={url}
                          onChange={(e) =>
                            handleUrlChange(index, e.target.value)
                          }
                          required
                          pattern=".*\.(png|jpg|jpeg)$"
                          title="Please enter a valid image URL ending with .png, .jpg, or .jpeg"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm mt-2 mb-2"
                            onClick={() => removeUrlField(index)}
                          >
                            Remove URL
                          </button>
                        )}
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm mt-2 mb-2"
                            onClick={() => moveUrlUp(index)}
                          >
                            Move Up
                          </button>
                        )}
                        {index < urls.length - 1 && (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm mt-2 mb-2"
                            onClick={() => moveUrlDown(index)}
                          >
                            Move Down
                          </button>
                        )}
                      </div>
                    ))
                  : null}

                <div className="form-group col-sm-6">
                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={addUrlField}
                  >
                    Add new URL
                  </button>
                </div>
              </div>
              <div className="row justify-content-end mt-3">
                <div className="form-group col-sm-6">
                  {!id ? (
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={handleSubmit}
                    >
                      Add gallery
                    </button>
                  ) : (
                    <div className="d-flex justify-content-evenly">
                      <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={handleSubmit}
                      >
                        Edit gallery
                      </button>
                      <Link to={`/galleries/${id}`} className="btn btn-primary">
                        Cancel
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCreateGallery;

