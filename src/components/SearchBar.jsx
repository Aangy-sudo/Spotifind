import { InputGroup, FormControl, Button } from "react-bootstrap";

function SearchBar({ value, onChange, onSearch }) {
  return (
    <InputGroup>
      <FormControl
        placeholder="Search For Artist"
        type="input"
        aria-label="Search for an Artist"
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        style={{
          width: "300px",
          height: "35px",
          borderRadius: "5px",
          marginRight: "10px",
          padding: "5px",
          marginBottom: "50px",
        }}
      />
      <Button onClick={onSearch}>Search</Button>
    </InputGroup>
  );
}

export default SearchBar;