import { API } from "../shared/api";

export const register = (
  first_name,
  last_name,
  email,
  password,
  password_confirmation
) => {
  return API.post("/register", {
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
  });
};

export const login = (email, password) => {
  return API.post("/login", {
    email,
    password,
  });
};

export const logout = () => {
  return API.post("/logout");
};

export const getUsers = () => {
  return API.get("/users");
};

export const getUserGalleries = (userId) => {
  return API.get(`/users/${userId}/galleries`);
};

export const getUser = (id) => {
  return API.get(`/users/${id}`);
};


