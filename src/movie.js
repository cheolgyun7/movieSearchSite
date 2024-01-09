export const movieCards = async () => {
  const movies = await fetchMovieData();
  console.log(movies);
  const movieList = document.querySelector("#movieList");
  movieList.innerHTML = movies
    .map(
      (movie) => `
  <li class="movie-card" id=${movie.id}>
  <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}" class="imgClass">
  <h3 class="movieTitle">${movie.title}</h3>
  <span class="movieDetail">${movie.overview}</span>
  <p class="movieGrade">${movie.vote_average}</p>
  </li>
  `
    )
    .join("");

  movieList.addEventListener("click", handleClickCard);

  function handleClickCard({ target }) {
    if (target === movieList) return;
    if (target.matches(".movie-card")) {
      alert(`영화 id: ${target.id}`);
    } else {
      alert(`영화 id: ${target.parentNode.id}`);
    }
  }
};

async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjdmMjZjNjdjYmM4NDljMDA5YjA2YzJkZDIyZDdmMyIsInN1YiI6IjY1OTM5OWVkZTY0MGQ2MDE0MGQ2MjgyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KaMA3mWm1eYmxbAex21Sbmhg5fMb4JS8AGtL2-ZOVvI"
    }
  };
  const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
  const data = await response.json();
  return data.results;
}
