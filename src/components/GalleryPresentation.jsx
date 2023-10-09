import { Link } from "react-router-dom";

const GalleryPresentation = ({ gallery, id }) => {
  const formattedDate = new Date(gallery.created_at).toLocaleString();
  const urls = JSON.parse(gallery.urls || "[]");
  const firstImageUrl = urls[0] || "";
  const description = gallery.description
    ? gallery.description.substring(0, 50) + "..."
    : "No description";

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={firstImageUrl} className="card-img-top" alt={`${gallery.name}`} style={{ height: "200px", objectFit: "cover" }} />
        <div className="card-body">
          <h5 className="card-title"><Link to={`/galleries/${gallery.id}`} className="text-dark text-decoration-none">{gallery.name}</Link></h5>
          <p className="card-text mb-2">{formattedDate}</p>
          <p className="card-text mb-2">
            <Link to={`/authors/${gallery.user?.id}`} className="text-dark text-decoration-none">Author: {gallery.user?.first_name} {gallery.user?.last_name}</Link>
          </p>
          <p className="card-text mb-2">Description: {description}</p> 
        </div>
      </div>
    </div>
  );
};

export default GalleryPresentation; 



