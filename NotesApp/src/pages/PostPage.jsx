import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { loadPost } from "../Services/post-service";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../Services/helper";
import { Viewer,Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error loading the particular post");
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };
  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && <Link to="">{post?.title}</Link>}
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 ps-2">
              <CardBody>
                <CardText>
                  Posted by <b>{post?.user?.name}</b> on{" "}
                  <b>{printDate(post?.addedDate)}</b>
                </CardText>
                <CardText>
                  <h2>{post?.title}</h2>
                </CardText>
                <CardText>
                  <span className="text-muted">
                    {post?.category?.categoryTitle}
                  </span>
                </CardText>
                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    height: "750px",
                  }}
                >
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer fileUrl={BASE_URL + "/post/pdf/" + post?.pdfLink} />
                  </Worker>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
