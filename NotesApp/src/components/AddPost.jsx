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
import {
  createPost as doCreatePost,
  uploadPostPdf,
} from "../Services/post-service";
import { getCurrentUserDetails } from "../auth";
import { toast } from "react-toastify";

const AddPost = () => {
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    title: "",
    categoryId: "",
  });
  const [pdf, setPdf] = useState(null);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setUser(getCurrentUserDetails());
    loadAllCategories()
      .then((data) => {
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
    if (post.title.trim() === "") {
      alert("post title is required");
      return;
    }

    if (post.categoryId === "") {
      alert("Please Select the Category");
      return;
    }
    post["userId"] = user.id;
    doCreatePost(post)
      .then((data) => {
        uploadPostPdf(pdf, data.postId)
          .then((data) => {
            toast.success("pdf uploaded!!");
          })
          .catch((error) => {
            toast.error("error in uploading image");
            console.log(error);
          });
        toast.success("post created!!");
      })
      .catch((error) => {
        toast.error("error occured");
        console.log(error);
      });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setPdf(e.target.files[0]);
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

            <div className="mt-3">
              <Label for="pdf">Drop your Notes Here</Label>
              <Input type="file" id="pdf" onChange={handleFileChange} />
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
