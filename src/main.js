import { handleSearch } from "./search.js";
import { movieCards, fetchMovieData } from "./movie.js";

const newFunction = async function () {
  const movies = await fetchMovieData();
  movieCards(movies);
};

newFunction();

const searchInput = document.querySelector("#searchId");
searchInput.focus();

// form 태그 submit event 실행 막기
const form = document.querySelector("#search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); //form태그 실행을하면 새로고침이 실행되는데 그걸 막아줌.

  // input창에 아무것도 입력되지 않을때 alert
  if (searchInput.value.trim() === "") {
    // trim() : spacebar 눌렀을 때 무시.
    alert("제목을 입력해 주세요.");

    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach((card) => {
      card.style.display = "block";
    });
    return;
  }

  handleSearch(searchInput.value.trim());
});
