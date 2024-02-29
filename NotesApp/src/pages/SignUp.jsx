import Base from "../components/Base";
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
const SignUp = () => {
  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse >
              <CardHeader>
                <h3> Register Here!!</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input type="text" placeholder="Enter name" id="name" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input type="email" placeholder="Enter email" id="email" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      id="password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      type="textarea"
                      placeholder="Write something About you"
                      id="about"
                      style={{ height: "200px" }}
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="light" outline>Register</Button>
                    <Button color="secondary" type="reset" className="ms-2">
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

export default SignUp;
