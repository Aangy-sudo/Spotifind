const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;


export async function fetchAccessToken() {
  const authParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  };

  const result = await fetch("https://accounts.spotify.com/api/token", authParams);
  const data = await result.json();
  return data.access_token;
}

export async function fetchArtistId(searchInput, token) {
  const artistParams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, artistParams);
  const data = await result.json();

  if (data.artists.items.length === 0) {
    throw new Error("Artist not found");
  }

  return data.artists.items[0].id;
}

export async function fetchArtistAlbums(artistId, token) {
  const result = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=50`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await result.json();
  return data.items;
}