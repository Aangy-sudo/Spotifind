import { Card, Button } from "react-bootstrap";

function AlbumCard({ album, onBookmark, isBookmarked }) {
  return (
    <Card
      style={{
        backgroundColor: "white",
        margin: "10px",
        borderRadius: "10px",
        marginBottom: "30px",
        position: "relative"
      }}
    >
      <div style={{
        position: "absolute",
        top: "12px",
        right: "12px",
        zIndex: 2
      }}>
        <Button
          onClick={e => {
            e.stopPropagation();
            onBookmark(album);
          }}
          style={{
            backgroundColor: "transparent",
            border: "none",
            fontSize: "24px",
            color: isBookmarked ? "#ff0000" : "#666",
            padding: 0,
            boxShadow: "none",
            outline: "none"
          }}
        >
          <i className={`fa-solid fa-heart ${isBookmarked ? 'text-danger' : ''}`}></i>
        </Button>
      </div>
      <Card.Img
        width={200}
        src={album.images[0].url}
        style={{ borderRadius: "4%" }}
      />
      <Card.Body>
        <Card.Title
          style={{
            whiteSpace: "wrap",
            fontWeight: "bold",
            maxWidth: "200px",
            fontSize: "18px",
            marginTop: "10px",
            color: "#000000",
          }}
        >
          {album.name}
        </Card.Title>
        <Card.Text style={{ color: "black" }}>
          Release Date <br /> {album.release_date}
        </Card.Text>
        <Button
          href={album.external_urls.spotify}
          style={{
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            fontSize: "15px",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          Album Link
        </Button>
      </Card.Body>
    </Card>
  );
}

export default AlbumCard;