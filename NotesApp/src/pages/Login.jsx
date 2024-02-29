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

const Login = () => {
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
                <Form>
                  <FormGroup>
                    <Label for="email">Enter The Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter The password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter  correct password"
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="light" outline>Login</Button>
                    <Button className="ms-2"color="secondary" outline>Reset</Button>
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
