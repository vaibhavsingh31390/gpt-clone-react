import { Container, Row, Col } from "react-bootstrap";
import RegisterForm from "./../../Components/Form/RegisterForm";
import "./Register.css";
const Register = () => {
  return (
    <Container className="p-4">
      <Row>
        <Col md={6} sm={12} className="d-flex flex-column">
          <div className="d-flex flex-column h-100 align-items-center justify-content-center">
            <h1 className="text-left w-100 custom--heading">
              The ChatGPT Clone.
            </h1>
            <span className="text-right w-100 mb-2 px-1">powered by MERN</span>
          </div>
        </Col>
        <Col md={6} sm={12} className="d-flex align-items-center">
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
