export const movieCards = (movies) => {
  /* 카드 리스트 */
  console.log(movies);

  const movieList = document.querySelector("#movieList");
  movieList.innerHTML = movies
    .map(
      (movie) => `
      <li data-id="${movie.id}" class="movie-card" id="${`movie-${movie.id}`}">
      <div class="cardsTop">
        <div>
          <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt=""
            class="imgClass"
          />
        </div>
        <div class="innerImg">
          <div class="movieOverview">
            <h4>영화 소개</h4>
            <p>${movie.overview}</p>
          </div>
          <div class="movePageBtn">
            <a href="/index2.html?id=${movie.id}">
              <button
                id="pageBtn"
                type="button"
                class="btn btn-danger me-2"
              >
                상세 페이지
              </button>
            </a>
          </div>
        </div>
      </div>
      <div class="cardsBottom">
        <h3 class="movieTitle">${movie.title}</h3>
        <p>${movie.release_date} | ⭐️ : <span class="voteAver">${movie.vote_average}</span></p>
      </div>
    </li>
  `
    )
    .join("");
};

/* 카드 클릭 했을 때, id alert 뜨기 */
// movieList.addEventListener("click", handleClickCard);

// function handleClickCard(event) {
//   // if (target === movieList) return;
//   // if (target === $(".linkBtn")) return;

//   // if (target.matches(".movie-card")) {
//   //   alert(`영화 id : ${target.id}`);
//   // } else {
//   //   alert(`영화 id : ${target.parentNode.id}`);
//   // }
//   if (event.target.matches(".imgClass")) {
//     alert(`영화 id : ${event.target.parentNode.parentNode.parentNode.dataset.id}`);
//     console.log(event.target.parentNode);
//   }
// }

/* 평점 순으로 영화 정렬하기*/
// "평점순" 버튼 클릭 시, 아래 배열대로 영화 정렬하기
const movieLists = document.querySelectorAll(".movie-card");
const movieAverageList = [];

movieLists.forEach((moviecard) => {
  const movieAverage = moviecard.querySelector(".voteAver").textContent;
  const moviesTitle = moviecard.querySelector(".movieTitle").textContent;

  movieAverageList.push({ star: movieAverage, title: moviesTitle });
});

movieAverageList.sort((a, b) => {
  return b.star - a.star;
});

// console.log(movieAverageList);

// for(i=0; i<movieAverageList.length; i++)

/* fetch로 open api 가져오기 */
export async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzFjNzNiNzQ4N2IwMTM5ZTI2MDU5MjFhZTBhMjA0MCIsInN1YiI6IjY1OTY1YTFmMzI2ZWMxNGU2ZDA2YzFkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h6L2OeVyMqWiyUQs3Qi5f-6rwiWL-k8Oku-0G_5f6S0"
    }
  };
  const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=ko-KR", options);
  const data = await response.json();
  return data.results;
}
