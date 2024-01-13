import { handleSearch } from "./search.js";
import { movieCards } from "./movie.js";

movieCards();

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

// // /* img 눌렀을 때, 새로고침하기 */
// const headerForm = document.querySelector("#reload-form");

// // img 클릭 시, 화면 새로고침하기
// headerForm.addEventListener("click", (img) => {
//   window.location.reload();
// });

// <!--header에 icon 이용해서 -->
/* <input id="reload-form" type="image" width="100px" src="movie.png" alt="" value="페이지 새로 고침" /> */
