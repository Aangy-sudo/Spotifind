import React from "react";
import { Button } from "react-bootstrap";

function BookmarkButton({ showBookmarked, toggleShowBookmarked }) {
  return (
    <Button
      onClick={toggleShowBookmarked}
      style={{
        position: "fixed",
        top: "30px",
        right: "40px",
        backgroundColor: showBookmarked ? "#ff0000" : "black",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "10px 20px",
        height: "45px",
        zIndex: 1000,
      }}
    >
      {showBookmarked ? "Show Search" : "View Saved Albums"}
    </Button>
  );
}

export default BookmarkButton;