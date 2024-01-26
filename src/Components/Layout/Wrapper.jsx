/* eslint-disable react/prop-types */
import { Container, Row, Col } from "react-bootstrap";
import bgImage from "./../../assets/media/images/bg.jpg";
import { useContext } from "react";
import AuthContext from "./../../store/auth-context.js";

const Wrapper = (props) => {
  const authCtx = useContext(AuthContext);
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100svh",
  };
  return (
    <Container fluid style={backgroundStyle}>
      <Row>
        <Col
          md={12}
          lg={12}
          sm={12}
          className={`${
            !authCtx.isAuthenticated
              ? "d-flex align-items-center justify-content-center"
              : ""
          } p-0 h-100 `}
          style={{
            minHeight: "100svh",
            maxHeight: "100svh",
            overflow: "hidden",
          }}
        >
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

export default Wrapper;
