// 파일이 열림과 동시에 실행, api 호출
window.onload = function detailPageOn() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTNiMjM4YTI1YTUzZjZmZDY1M2NjMDk1NGRiOTRjZCIsInN1YiI6IjY1OTdlYzkxNzI2ZmIxMWIwNmFiMjg1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k99JbwB2RPUnBnx3Wk-Kl_y1bNbwm09wpwpmpDAVWTs"
    }
  };

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

      // 장르도 객체안에 있는 배열 값 추출해서 문자열로 합침
      const genres = data["genres"];
      const genreList = [];
      for (key in genres) {
        genreList.push(genres[key].name);
      }
      const genre = genreList.join(", ");

      // 받아온 데이터들을 html 파일에 붙이기
      const temp_html1 = `
                      <img src="https://image.tmdb.org/t/p/original${posterPath}" class="posterImage" alt="${title}"/>
                     `;
      const temp_html2 = `
                      <div class="title">
                              <h1 class="title_font">${title}</h1>
                      </div>
                      </div>
                      <div class="content_top">
                          <p class="releaseDate">개봉일 : ${releaseDate}</p>
                          <p class="genres">장르 : ${genre}</p>
                          <p class="voteAverage">평점 : ${voteAverage}</p>
                      </div>
                      <div class="content_bottom">
                          <p class="overview">${overview}</p><br>
                      </div>
                      <div class="reviewBox">
                        <div class="writeBox">
                          <p>
                            <input type="text" id="reviewer" placeholder="작성자명">
                            <input type="text" id="pwd" placeholder="비밀번호">
                            <button id="saveButton">저장</button>
                          </p>
                          <textarea type="text" id="review" placeholder="리뷰작성"></textarea>
                        </div>
                        <div class="readBox">

                        </div>
                      </div>
                 `;

      document.querySelector("#firstPage").insertAdjacentHTML("beforeend", temp_html1);
      document.querySelector(".detailMovie").insertAdjacentHTML("beforeend", temp_html2);
      form.addEventListener("submit", (e) => rereview(e, movieId));
    });

  const rereview = (e, movieId) => {
    e.preventDefault(); //기존 폼 제출 동작방지
    const existingReview = JSON.parse(localStorage.getItem(movieId)) || []; //기존리뷰를 가지고 오거나 빈배열을 초기화함

    const reviewerInput = document.getElementById("reviewer").value;
    const reviewInput = document.getElementById("review").value;
    const pwdInput = document.getElementById("pwd").value;

    /**
     * 유효성검사 함수
     */
    // 1.작성자 유효성 검사 함수
    function validateName(name) {
      // 최소 2자 이상, 한글 또는 영어
      return /^[가-힣a-zA-Z]{2,}$/.test(name);
    }
    if (!validateName(reviewerInput)) {
      alert("작성자 이름을 입력하세요 (최소 2자, 한글 또는 영어).");
      return;
    }
    // 2.리뷰 유효성 검사 함수
    if (!reviewInput.trim()) {
      alert("리뷰를 작성하세요");
      return;
    }
    // 3.비밀번호 유효성 검사 함수
    function validatePwd(pwd) {
      // 4자리 숫자
      return /^\d{4}$/.test(pwd);
    }
    if (!validatePwd(pwdInput)) {
      alert("비밀번호 4자리를입력하세요(숫자)");
      return;
    }
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

    document.getElementById("reviewer").value = "";
    document.getElementById("review").value = "";
    document.getElementById("pwd").value = "";
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
