import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { getCurrentUserDetails, isLoggedIn } from "../auth";
import { useEffect, useState } from "react";

const Post = ({ post = { postId: 0, title: "Default title" },deletePost }) => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  useEffect(() => {
    setUser(getCurrentUserDetails());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Card className="shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <div>
          <Link className="btn btn-secondary" to={"/posts/" + post.postId}>
            Read more
          </Link>
          {isLoggedIn ? (
            user?.id == post.user.id ? (
              <Button 
              onClick={()=>deletePost(post)}
              color="danger" className="ms-2">
                Delete
              </Button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
