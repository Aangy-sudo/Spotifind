import React from "react";
import { Row } from "react-bootstrap";
import AlbumCard from "./AlbumCard";

function AlbumGrid({ albums, toggleBookmark, isAlbumBookmarked }) {
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
        <AlbumCard
          key={album.id}
          album={album}
          onBookmark={toggleBookmark}
          isBookmarked={isAlbumBookmarked(album)}
        />
      ))}
    </Row>
  );
}

export default AlbumGrid;