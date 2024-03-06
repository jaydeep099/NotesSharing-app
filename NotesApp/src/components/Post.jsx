import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Post = ({post = {postId:0, title:"Default title" }}) => {
  return (
    <Card className="shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <div>
            <Link className="btn btn-secondary" to={'/posts/'+post.postId}>Read more</Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
