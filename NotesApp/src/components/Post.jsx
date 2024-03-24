import { Link } from "react-router-dom";
import { Button, Card, CardBody , CardText} from "reactstrap";
import { getCurrentUserDetails, isLoggedIn } from "../auth";
import { useEffect, useState } from "react";

const Post = ({ post = { postId: 0, title: "Default title" }, deletePost }) => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  useEffect(() => {
    setUser(getCurrentUserDetails());
    setLogin(isLoggedIn());
  }, []);
  
  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };

  return (
    <Card className="shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText>
          Posted by <b>{post?.user?.name}</b> on
          <b>{printDate(post?.addedDate)}</b>
        </CardText>
        <div>
          <Link className="btn btn-secondary" to={"/posts/" + post.postId}>
            Read more
          </Link>
          {isLoggedIn ? (
            user?.id == post.user.id ? (
              <Button
                onClick={() => deletePost(post)}
                color="danger"
                className="ms-2"
              >
                Delete
              </Button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {isLoggedIn ? (
            user?.id == post.user.id ? (
              <Button
                tag={Link}
                to={`/user/update-note/${post.postId}`}
                color="warning"
                className="ms-2"
              >
                update
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
