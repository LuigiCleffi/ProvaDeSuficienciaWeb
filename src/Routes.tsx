import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import { PostsCreation } from "./pages/PostsCreation";
import { EditPost } from "./pages/EditPost";

export default function Routing() {
    return (
        <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/newPost" element={<PostsCreation />} />
                  <Route path="/home/posts/:postId" element={<EditPost />} />
                </Routes>
        </BrowserRouter>
    );
  }