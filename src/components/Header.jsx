import React from "react";
import { Container } from "react-bootstrap";
import spotifyLogo from "../assets/spotifyLogo.png"; 

function Header({ showHeader }) {
  if (!showHeader) return null;

  return (
    <Container style={{ textAlign: "center", marginTop: "-40px" }}>
      <img
        src={spotifyLogo}
        alt="Spotify Logo"
        style={{ width: "420px", height: "120px", marginBottom: "-20px" }}
      />
      
      <h1>What artist do you want to listen.</h1>
    </Container>
  );
}

export default Header;