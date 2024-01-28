import ChatBubble from "./../Functional/ChatBubble";
import ChatInput from "./../Functional/ChatInput";
import { Col } from "react-bootstrap";
import "./ResponseView.css";
import { useState } from "react";
function ResponseView() {
  const [loading, setLoading] = useState(false);

  return (
    <Col md={12} lg={12} sm={12} className="gpt-cl-ResponseView-wrapper">
      <div className="gpt-cl-ResponseView h-100">
        <ChatBubble loading={loading} setLoading={setLoading} />
        <ChatInput loading={loading} setLoading={setLoading} />
      </div>
    </Col>
  );
}

export default ResponseView;
