import { useEffect, useState } from "react";
import { loadAllPosts } from "../Services/post-service";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });
  useEffect(() => {
    changePage(0);
  }, []);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
      return;
    }
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent(data);
        window.scroll(0, 0);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts");
      });
  };
  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 12
          }}
        >
          {postContent?.content?.map((post) => (
            <Post post={post} key={post.postId} />
          ))}
          <Container className="mt-3">
            <Pagination size="lg">
              <PaginationItem
                onClick={() => changePage(postContent.pageNumber - 1)}
                disabled={postContent.pageNumber === 0}
              >
                <PaginationLink previous></PaginationLink>
              </PaginationItem>
              {[...Array(postContent.totalPages)].map((item,index) => (
                <PaginationItem
                  onClick={() => changePage(index)}
                  active={index === postContent.pageNumber}
                  key={index}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem
                onClick={() => changePage(postContent.pageNumber + 1)}
                disabled={postContent.lastPage}
              >
                <PaginationLink next></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default NewFeed;
