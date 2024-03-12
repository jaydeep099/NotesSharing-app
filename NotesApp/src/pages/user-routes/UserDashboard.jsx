import { Container } from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import { useEffect, useState } from "react";
import { getCurrentUserDetails } from "../../auth";
import {
  deletePostService,
  loadPostUserWise,
} from "../../Services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";
const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setUser(getCurrentUserDetails());
    loadPostData();
  }, []);

  function deletePost(post) {
    deletePostService(post?.postId)
      .then((res) => {
        toast.success("post is deleted");
        loadPostData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in deleting post");
      });
  }

  function loadPostData() {
    loadPostUserWise(getCurrentUserDetails().id)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading user post");
      });
  }
  return (
    <Base>
      <Container>
        <AddPost />
        <h1 className="my-3">Your Posts</h1>
        {posts.map((post, index) => {
          return <Post key={index} post={post} deletePost={deletePost} />;
        })}
      </Container>
    </Base>
  );
};

export default UserDashboard;
