import ChatBubble from "./../Functional/ChatBubble";
import ChatInput from "./../Functional/ChatInput";
import { Col } from "react-bootstrap";
import "./ResponseView.css";
function ResponseView() {
  return (
    <Col md={12} lg={12} sm={12} className="gpt-cl-ResponseView-wrapper">
      <div className="gpt-cl-ResponseView h-100">
        <ChatBubble />
        <ChatInput />
      </div>
    </Col>
  );
}

export default ResponseView;
