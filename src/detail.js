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
  const URLSearch = new URLSearchParams(location.search);
  let id = URLSearch.get("id");
  console.log(id);

  // url에서 id값 추출해서 적용
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
      
                          <!--리뷰 작성칸, 리뷰창-->
                          <div id="reviewForm">
                          
                          </div>
                 `;

      document.querySelector("#firstPage").insertAdjacentHTML("beforeend", temp_html1);
      document.querySelector("#secondPage").insertAdjacentHTML("beforeend", temp_html2);
    });

  const rereview = (e, movieId) => {
    e.preventDefault();
    const object = [
      {
        reviewer: document.getElementById("reviewer").value,
        review: document.getElementById("review").value,
        pwd: document.getElementById("pwd").value
      }
    ];
    const objString = JSON.stringify(object);
    console.log(objString);
    console.log(movieId);
    localStorage.setItem(movieId, objString);
    reviewList();
  };
};
