import "./App.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loading from "./components/Loading";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AlbumList from "./components/AlbumList";
import Pagination from "./components/Pagination";
import ErrorAlert from "./components/ErrorAlert";

import {
  fetchAccessToken,
  fetchArtistId,
  fetchArtistAlbums,
} from "./api/spotify";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  const albumsPerPage = 8; // Albums per page

  useEffect(() => {
    fetchAccessToken().then(setAccessToken);
  }, []);

  const search = async () => {
    setErrorMessage("");
    setAlbums([]);
    setLoading(true);
    setCurrentPage(1); // Reset to the first page on a new search

    try {
      const artistID = await fetchArtistId(searchInput, accessToken);
      const albumData = await fetchArtistAlbums(artistID, accessToken);

      if (albumData.length === 0) {
        setErrorMessage("This artist has no albums.");
      } else {
        setAlbums(albumData);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate the albums to display for the current page
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  // Calculate total pages
  const totalPages = Math.ceil(albums.length / albumsPerPage);

  return (
    <>
      <Header showHeader={albums.length === 0 && !loading && !errorMessage} />
      <Container>
        <SearchBar value={searchInput} onChange={setSearchInput} onSearch={search} />
      </Container>
      <Container>
        <ErrorAlert message={errorMessage} />
        {loading ? (
          <Loading />
        ) : (
          <>
            <AlbumList albums={currentAlbums} />
            {albums.length > albumsPerPage && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default App;