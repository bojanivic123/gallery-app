import { Routes, Route } from "react-router";
import PrivateRouter from "./components/PrivateRouter";
import Home from "./pages/Home";
import ViewGallery from "./pages/ViewGallery";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyGalleries from "./pages/MyGalleries";
import AuthorsGalleries from "./pages/AuthorsGalleries";
import CreateGallery from "./pages/CreateGallery";

const Router = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home />}></Route>
            <Route path="/galleries/:id" element={<ViewGallery />}></Route>
            <Route path="/authors/:id" element={<AuthorsGalleries />}></Route> 
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/create" element={<PrivateRouter><CreateGallery /></PrivateRouter>}></Route> 
            <Route path="/my-galleries" element={<PrivateRouter><MyGalleries /></PrivateRouter>}></Route> 
            <Route path="/edit-gallery/:id" element={<PrivateRouter><CreateGallery /></PrivateRouter>}></Route>  
        </Routes>
    )
}

export default Router;
