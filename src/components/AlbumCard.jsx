import { Card, Button } from "react-bootstrap";

function AlbumCard({ album }) {
  return (
    <Card
      style={{
        backgroundColor: "white",
        margin: "10px",
        borderRadius: "10px",
        marginBottom: "30px",
      }}
    >
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