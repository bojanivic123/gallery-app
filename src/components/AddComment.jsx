import { useContext, useState } from "react";
import { addComment } from "../services/GalleryService";
import UserContext from "../context/UserContext"; 

const AddComment = ({ galleryId, setComments }) => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);

  const [comment, setComment] = useState({
    description: "",
    gallery_id: galleryId,
    user_id: user.id,
  });

  const resetInput = () => {
    setComment({
      description: "",
      gallery_id: galleryId,
      user_id: user.id,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = (event, comment) => {
    event.preventDefault();
    addComment(comment.description, galleryId, user.id)
      .then(({ data }) => {
        setComments((prevComments) => [
          ...prevComments,
          {
            ...data,
            created_at: new Date(data.created_at).toLocaleString(),
          },
        ]);
        setError("");
      })
      .catch(() => {
        setError("Maximum 1000 characters.");
      });

    resetInput();
  };

  return (
    <form className="container mt-5" onSubmit={(event) => handleAdd(event, comment)}>
      <div className="mb-3">
        {error && <div className="alert alert-danger mb-4" role="alert">{error}</div>}
        <label className="form-label">Enter your comment</label>
        <textarea onChange={e => handleInputChange(e)} value={comment.description} placeholder="Add comment..." className="form-control" name="description"></textarea>
      </div>
      <div>
        <button type="submit" className="btn btn-primary" disabled={!comment.description}>Add comment</button> 
      </div>
  </form>
  );
};

export default AddComment;



