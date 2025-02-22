import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from "./pages/user-routes/UserDashboard";
import Privateroute from "./components/Privateroute";
import PostPage from "./pages/PostPage";
import Categories from "./pages/Categories";
import UpdateNotes from "./pages/UpdateNotes";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/posts/:postId" element={<PostPage />}></Route>
        <Route path="/categories/:categoryId" element={<Categories />}></Route>
        <Route path="/user" element={<Privateroute />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="update-note/:noteId" element={<UpdateNotes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
