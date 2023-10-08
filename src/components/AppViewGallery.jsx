import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteComment, deleteGallery, getSingle } from "../services/GalleryService";
import AddComment from "./AddComment";
import UserContext from "../context/UserContext";
import MyCarousel from "./MyCarousel";
import Comments from "./Comments";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; 

const AppViewGallery = () => {
  const { loggedIn, user } = useContext(UserContext);
  const [gallery, setGallery] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const formattedDate = new Date(gallery.created_at).toLocaleString();
  const urls = JSON.parse(gallery.urls || "[]"); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getSingle(id).then(({ data }) => {
        setGallery(data);
        setComments(data.comments);
      });
    }
  }, [id, setComments]);

  const handleDeleteComm = (id) => {
    confirmAlert({
      title: "Delete Comment",
      message: "Are you sure you want to delete the comment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteComment(id);
            setComments((prevComments) =>
              prevComments.filter((comment) => comment.id !== id)
            );
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleDeleteGallery = (id) => {
    confirmAlert({
      title: "Delete Gallery",
      message: "Are you sure you want to delete the gallery?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteGallery(id);
            navigate("/my-galleries");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div>
      <div
        className="row row-cols-1 justify-content-center"
        style={{ margin: "auto" }}
      >
        <div
          className="col m-5"
          style={{ width: "700px", borderRadius: "5px", opacity: "90%" }}
        >
          <div className="card shadow-sm">
            <div className="card-body bg-light border rounded border">
              <h3 className="card-text">{gallery.name}</h3>
              <div className="mb-1 text-body-secondary">
                Author: {gallery.user?.first_name} {gallery.user?.last_name}
              </div>
              <p className="card-text mb-2">Release date: {formattedDate}</p>
              <p className="card-text mb-3">
                Description: {gallery.description}
              </p>
              {loggedIn && user.id === gallery.user_id ? (
                <div className="d-flex justify-content-evenly">
                  <Link
                    className="btn btn-warning"
                    to={`/edit-gallery/${gallery.id}`}
                  >
                    Edit Gallery
                  </Link>
                  <button
                    className="btn btn-danger"
                    type="delete"
                    onClick={() => handleDeleteGallery(gallery.id)}
                  >
                    Delete Gallery
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ margin: "auto", width: "700px" }}
      >
        <MyCarousel urls={urls} />
      </div>
      {loggedIn ? (
        <AddComment galleryId={id} setComments={setComments} />
      ) : null}
      <Comments
        comments={comments}
        user={user}
        handleDeleteComm={(id) => handleDeleteComm(id)}
        loggedIn={loggedIn}
      />
    </div>
  );
};

export default AppViewGallery;