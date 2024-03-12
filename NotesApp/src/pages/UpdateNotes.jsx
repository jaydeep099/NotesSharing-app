import { useNavigate, useParams } from "react-router-dom";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import {
  
  loadPost,
  updatePost,
} from "../Services/post-service";
import { toast } from "react-toastify";
import { loadAllCategories } from "../Services/category";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";

const UpdateNotes = ({ user }) => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState(null);
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    loadPost(noteId)
      .then((data) => {
        setPost({ ...data });
      })
      .catch((error) => {
        console.log(error);
        toast.error("error loading the post");
      });
  }, []);

  useEffect(() => {
    if (!post) {
      if (post?.user?.id != user?.id) {
        toast.error("This is not your post !!");
        navigate("/");
      }
    }
  }, [post]);
  const handleChange = (e, filedName) => {
    setPost({
      ...post,
      [filedName]: e.target.value,
    });
  };
  const UpdateNote = (e) => {
    e.preventDefault();
    console.log(post);
    updatePost(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((response) => {
        console.log(response);
        toast.success("Your post is updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Your post is not updated");
      });
  };

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const updateHtml = () => {
    return (
      <div className="wrapper">
        <Card className="shadow-sm mt-2">
          <CardBody>
            <h3> Update your post here</h3>
            <Form onSubmit={UpdateNote}>
              <div className="my-3">
                <Label for="title">Post Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter the Title "
                  value={post?.title}
                  onChange={(e) => {
                    handleChange(e, "title");
                  }}
                  name="title"
                />
              </div>

              <div className="mt-3">
                <Label for="pdf">Update your Notes Here</Label>
                <Input
                  type="file"
                  id="pdf"
                  onChange={handleFileChange}
                />
              </div>

              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  name="categoryId"
                  onChange={(e) => {
                    handleChange(e, "categoryId");
                  }}
                  value={post?.categoryId}
                >
                  <option disabled value={""}>
                    --Select Category--
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>
              <Container className="text-center">
                <Button type="submit" color="primary">
                  Update Post
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
  return (
    <Base>
      <Container>{updateHtml()}</Container>
    </Base>
  );
};

export default UpdateNotes;
