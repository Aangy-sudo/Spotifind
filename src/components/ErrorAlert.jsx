import { Alert } from "react-bootstrap";

function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <Alert variant="danger" style={{ marginBottom: "20px", color: "white", fontWeight: "bold" }}>
      {message}
    </Alert>
  );
}

export default ErrorAlert;