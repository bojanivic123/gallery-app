import { API } from "../shared/api";

export const getAll = (params) => {
  return API.get(`/galleries`, { params });
};

export const filterGalleries = (name) => {
  return API.get(`/galleries?name=${name}`);
};

export const addGallery = (name, description, urls, user_id) => {
  return API.post("/galleries", {
    name,
    description,
    urls,
    user_id,
  });
};
export const getSingle = (id) => {
  return API.get(`/galleries/${id}`);
};

export const addComment = (description, gallery_id, user_id) => {
  return API.post(`/galleries/${gallery_id}/comments`, {
    description,
    gallery_id,
    user_id,
  });
};

export const deleteComment = (id) => {
  return API.delete(`/comments/${id}`);
};

export const editGallery = (id, gallery) => {
  return API.put(`/galleries/${id}`, gallery);
};

export const deleteGallery = (id) => {
  return API.delete(`/galleries/${id}`);
};

