import React from "react";
import { Row } from "react-bootstrap";
import AlbumCard from "./AlbumCard";

function AlbumList({ albums }) {
  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
      }}
    >
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </Row>
  );
}

export default AlbumList;