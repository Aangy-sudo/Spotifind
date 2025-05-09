import "./App.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loading from "./components/Loading";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ErrorAlert from "./components/ErrorAlert";
import BookmarkButton from "./components/BookmarkButton";
import AlbumGrid from "./components/AlbumGrid";

import {
  fetchAccessToken,
  fetchArtistId,
  fetchArtistAlbums,
} from "./api/spotify";

import Pagination from "./components/Pagination"; // Import the Pagination component

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookmarkedAlbums, setBookmarkedAlbums] = useState([]);
  const [showBookmarked, setShowBookmarked] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of albums per page

  useEffect(() => {
    fetchAccessToken().then(setAccessToken);
    const savedAlbums = localStorage.getItem("bookmarkedAlbums");
    if (savedAlbums) {
      setBookmarkedAlbums(JSON.parse(savedAlbums));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedAlbums", JSON.stringify(bookmarkedAlbums));
  }, [bookmarkedAlbums]);

  const search = async () => {
    setErrorMessage("");
    setAlbums([]);
    setLoading(true);
    setShowBookmarked(false);

    try {
      const artistID = await fetchArtistId(searchInput, accessToken);
      const albumData = await fetchArtistAlbums(artistID, accessToken);

      if (albumData.length === 0) {
        setErrorMessage("This artist has no albums.");
      } else {
        setAlbums(albumData);
        setCurrentPage(1); // Reset to the first page
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = (album) => {
    setBookmarkedAlbums((prev) => {
      const isBookmarked = prev.some((a) => a.id === album.id);
      if (isBookmarked) {
        return prev.filter((a) => a.id !== album.id);
      } else {
        return [...prev, album];
      }
    });
  };

  const isAlbumBookmarked = (album) => {
    return bookmarkedAlbums.some((a) => a.id === album.id);
  };

  // Pagination logic
  const displayedAlbums = showBookmarked
    ? bookmarkedAlbums.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : albums.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  const totalPages = Math.ceil(
    (showBookmarked ? bookmarkedAlbums.length : albums.length) / itemsPerPage
  );

  return (
    <>
      <BookmarkButton
        showBookmarked={showBookmarked}
        toggleShowBookmarked={() => setShowBookmarked(!showBookmarked)}
      />
      <Header showHeader={albums.length === 0 && !loading && !errorMessage} />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={search}
          />
        </div>
      </Container>
      <Container>
        <ErrorAlert message={errorMessage} />
        {loading ? (
          <Loading />
        ) : (
          <>
            <AlbumGrid
              albums={displayedAlbums}
              toggleBookmark={toggleBookmark}
              isAlbumBookmarked={isAlbumBookmarked}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default App;