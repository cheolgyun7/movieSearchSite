import { handleSearch } from "./search.js";
import { movieCards } from "./movie.js";

movieCards();

const searchInput = document.querySelector("#searchId");
searchInput.focus();

const form = document.querySelector("#search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); //form태그 실행을하면 새로고침이 실행되는데 그걸막아줌
  handleSearch(searchInput.value);
});
