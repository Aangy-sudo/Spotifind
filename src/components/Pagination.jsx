import React from "react";
import { Button } from "react-bootstrap";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          style={{
            margin: "0 5px",
            backgroundColor: currentPage === number ? "#1DB954" : "#f0f0f0",
            color: currentPage === number ? "white" : "black",
            border: "1px solid #ccc",
          }}
        >
          {number}
        </Button>
      ))}
    </div>
  );
}

export default Pagination;