/* eslint-disable react/prop-types */
import { Container, Row, Col } from "react-bootstrap";
import bgImage from "./../../../assets/media/images/bg.jpg";
const Wrapper = (props) => {
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`, // Set the background image URL
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100svh",
  };
  return (
    <Container fluid style={backgroundStyle}>
      <Row>
        <Col
          className="p-0 h-100 d-flex align-items-center justify-content-center"
          style={{ minHeight: "100svh" }}
        >
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

export default Wrapper;
