window.onload = function detailPageOn() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTNiMjM4YTI1YTUzZjZmZDY1M2NjMDk1NGRiOTRjZCIsInN1YiI6IjY1OTdlYzkxNzI2ZmIxMWIwNmFiMjg1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k99JbwB2RPUnBnx3Wk-Kl_y1bNbwm09wpwpmpDAVWTs"
    }
  };

  //이 부분이 아이디 값 받아올 부분입니다!!!! 임의로 값을 변수에 넣어서 해놓은 부분입니다
  // get 함수를 이용해서 각각 id에 맞는 값만 가져올 수 있도록 함
  const URLSearch = new URLSearchParams(location.search);
  let id = URLSearch.get("id");
  console.log(id);

  // url에서 id값 추출해서 적용. 추출해온 값을 토대로 그 id 값에 맞는 페이지를 각각 불러올 수 있도록 함.
  let movieId = id;

  let url = "https://api.themoviedb.org/3/movie/" + movieId + "?language=ko-KR";
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const title = data["title"];
      const posterPath = data["poster_path"];
      const voteAverage = data["vote_average"];
      const releaseDate = data["release_date"];
      const overview = data["overview"];

      const temp_html1 = `
                         <img src="https://image.tmdb.org/t/p/original${posterPath}" class="posterImage" alt="${title}"/>
                     `;
      const temp_html2 = `
                      <div class="title">
                              <h1>${title}</h1>
                          </div>
                          <div class="content">
                              <p>개봉일 : ${releaseDate}</p><br>
                              <p>평점 : ${voteAverage}</p><br>
                              <p>줄거리</p><br>
                              <p>${overview}</p>
                          </div>
                          <div class="reviewBox">
                          <input type="text" id="reviewer" placeholder="작성자명">
                          <input type="text" id="review" placeholder="리뷰작성">
                          <input type="text" id="pwd" placeholder="비밀번호">
                            <button id="saveButton">저장</button>
                          </div>
                 `;

      document.querySelector("#firstPage").insertAdjacentHTML("beforeend", temp_html1);
      document.querySelector(".detailMovie").insertAdjacentHTML("beforeend", temp_html2);
      form.addEventListener("submit", (e) => rereview(e, movieId));
    });

  const rereview = (e, movieId) => {
    e.preventDefault(); //기존 폼 제출 동작방지
    const existingReview = JSON.parse(localStorage.getItem(movieId)) || []; //기존리뷰를 가지고 오거나 빈배열을 초기화함

    const newReview = {
      //새로운리뷰
      reviewer: document.getElementById("reviewer").value,
      review: document.getElementById("review").value,
      pwd: document.getElementById("pwd").value
    };
    //기존배열에 새 배열을 push함
    existingReview.push(newReview);
    localStorage.setItem(movieId, JSON.stringify(existingReview));
    reviewList();
  };
  const reviewList = () => {
    const reviewsContainer = document.getElementById("reviewForm");
    reviewsContainer.innerHTML = ""; // 기존 내용을 지우고 새로운 리뷰로 대체

    const movieId = URLSearch.get("id");
    const existingReview = JSON.parse(localStorage.getItem(movieId)) || [];

    existingReview.forEach((review, index) => {
      reviewsContainer.insertAdjacentHTML(
        "beforeend",
        `리뷰 ${index + 1}: ${review.reviewer} - ${review.review}<br />`
      );
    });
  };
  reviewList();
};
