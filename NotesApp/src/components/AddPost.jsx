import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../Services/category";
import { useEffect, useState } from "react";
import { createPost as doCreatePost } from "../Services/post-service";
import { getCurrentUserDetails } from "../auth";
const AddPost = () => {
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    title: "",
    categoryId: "",
  });
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setUser(getCurrentUserDetails());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filedChanged = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const createPost = (e) => {
    e.preventDefault();
   // console.log(post);
    if (post.title.trim() === "") {
      alert("post title is required");
      return;
    }

    if (post.categoryId === "") {
      alert("Please Select the Category");
      return;
    }
    post["userId"] = user.id;
    //post["categoryId"]=categories.id;
    doCreatePost(post)
      .then((data) => {
        alert("post created");
       // console.log(post);
      })
      .catch((error) => {
        alert("error created");
        console.log(error);
      });
  };
  return (
    <div className="wrapper">
      <Card className="shadow-sm mt-2">
        <CardBody>
          <h3> Post your notes here</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter the Title "
                onChange={filedChanged}
                name="title"
              />
            </div>
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                name="categoryId"
                onChange={filedChanged}
                defaultValue={""}
              >
                <option disabled value={""}>
                  --Select Category--
                </option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>
            <Container className="text-center">
              <Button type="submit" color="primary">
                Post it
              </Button>
              <Button type="reset" color="danger" className="ms-2">
                Reset content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
