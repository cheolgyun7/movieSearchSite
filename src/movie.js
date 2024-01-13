export const movieCards = async () => {
  const movies = await fetchMovieData();

  const movieList = document.querySelector("#movieList");
  movieList.innerHTML = movies
    .map(
      (movie) => `
  <li data-id=${movie.id} class="movie-card" id=${`movie-${movie.id}`}>
  <div class="cardsTop">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="imgClass">
    <h3 class="movieTitle">${movie.title}</h3>

    <div class="text-wrapper">
      <span class="text">${movie.overview}</span>
      <span class="more-text">더보기</span>
      <span class="less-text">줄이기</span>
    </div>

    <br>
    <p>Release Date : ${movie.release_date}</p>
    <p class="movieGrade">Rating : ${movie.vote_average}</p>
  </div>

    <a href = "/index2.html?id=${movie.id}">
    <div class="movePageBtn">
      <button id="pageBtn" type="button" class="btn btn-outline-dark me-2">상세페이지 이동</button>
    </div> 
    </a>
  </li>
  </a>
  `
    )
    .join("");

  /* 영화 줄거리 더보기/ 줄이기 */

  movies.forEach((repeat) => {
    const moreText = document.querySelector(`#movie-${repeat.id} > div.cardsTop > div > span.more-text`);
    const lessText = document.querySelector(`#movie-${repeat.id} > div.cardsTop > div > span.less-text`);
    const textContent = document.querySelector(`#movie-${repeat.id} > div.cardsTop > div > span.text`);
    // console.log(moreText);
    // console.log(lessText);
    // console.log(textContent);

    // 더보기 클릭 시 이벤트
    moreText.addEventListener("click", () => {
      moreText.style.display = "none";
      lessText.style.display = "inline-block";
      textContent.style.display = "inline-block";
    });

    // 줄이기 클릭 시 이벤트
    lessText.addEventListener("click", () => {
      moreText.style.display = "inline-block";
      lessText.style.display = "none";
      textContent.style.display = "-webkit-box";
    });
  });

  /* 카드 클릭 했을 때 id alert 뜨기 */
  movieList.addEventListener("click", handleClickCard);

  function handleClickCard(event) {
    // if (target === movieList) return;
    // if (target === $(".linkBtn")) return;

    // if (target.matches(".movie-card")) {
    //   alert(`영화 id : ${target.id}`);
    // } else {
    //   alert(`영화 id : ${target.parentNode.id}`);
    // }
    if (event.target.matches(".imgClass")) {
      alert(`영화 id : ${event.target.parentNode.parentNode.dataset.id}`);
      console.log(event.target.parentNode);
    }
  }
};

//fetch로 open api 가져오기
async function fetchMovieData() {
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
