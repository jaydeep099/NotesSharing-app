import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { loginUser } from "../Services/user-service";
import { toast } from "react-toastify";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
 
  const  navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e, field) => {
    let actualValue = e.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetail);
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("Username or password is required");
      return;
    }

    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
          navigate("/user/dashboard")
        });
        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something wernt wrong");
        }
      });
  };
  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Login</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="email">Enter The Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter The password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter the correct password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="light" outline>
                      Login
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="ms-2"
                      color="secondary"
                      outline
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
