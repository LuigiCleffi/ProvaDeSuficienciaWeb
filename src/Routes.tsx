import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import { PostsCreation } from "./pages/PostsCreation";

export default function Routing() {
    return (
        <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/newPost" element={<PostsCreation />} />

                </Routes>
        </BrowserRouter>
    );
  }