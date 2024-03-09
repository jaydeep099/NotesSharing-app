import { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { loadPostCategoryWise } from "../Services/post-service";
import { toast } from "react-toastify";
import Post from "../components/Post";
import CategorySideMenu from "../components/CategorySideMenu";

const Categories = () => {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(categoryId);
    loadPostCategoryWise(categoryId)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading posts");
      });
  }, [categoryId]);
  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-3">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            {posts &&
              posts.map((post, index) => {
                return <Post key={index} post={post} />;
              })}
            {posts.length <= 0 ? <h1>No Post in this Category</h1> : ""}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Categories;
