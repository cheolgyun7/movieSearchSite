//fetch로 open api 가져오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzFjNzNiNzQ4N2IwMTM5ZTI2MDU5MjFhZTBhMjA0MCIsInN1YiI6IjY1OTY1YTFmMzI2ZWMxNGU2ZDA2YzFkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h6L2OeVyMqWiyUQs3Qi5f-6rwiWL-k8Oku-0G_5f6S0"
  }
};
let link = document.location.href.split("?");
const urlSearchParamsObject = new URLSearchParams(link[1]);
const apiId = urlSearchParamsObject.get("id");

// form으로 id 값 보내주신 것을 받아서 함수 호출
// id값에 해당하는 영화 제목, 줄거리, 이미지, 평점 가져와서 html 파일에 붙임
function detailPageOpen(id) {
  fetch(`https://api.themoviedb.org/3/movie/popular?${apiId}&language=ko-KR`)
    .then((res) => res.json())
    .then((data) => {
      let id_index = data["result"].findIndex((obj) => obj.id == "`${id}`"); //findindex, 받은 id값과 동일한 값이 있는 index값 받기
      let title = data["results"][id_index]["title"]; // 영화 제목
      let overview = data["results"][id_index]["overview"]; // 영화 줄거리
      let poster_path = data["results"][id_index]["poster_path"]; // 영화 이미지
      let img_url = "https://image.tmdb.org/t/p/original" + poster_path; // 영화 이미지 전체 주소
      let vote_average = data["results"][id_index]["vote_average"]; // 영화 평점

      let temp_html = `
            <!--좌측 페이지(first) : 포스터 이미지가 놓일 공간-->
            <div class="first">
                <img src="${img_url}" class="card-img-top" alt="..."/>
            </div>

            <!--우측 페이지(second) : 영화 제목, 줄거리, 평점, 리뷰 작성칸, 리뷰-->
            <div class="second">
                <div class="title">
                    <h1>${title}</h1>
                </div>
                <div class="content">
                    <p>평점 : ${vote_average}</p><br>
                    <p>줄거리</p><br>
                    <p>${overview}</p>
                </div>

                <!--리뷰 작성칸, 리뷰창-->
                <div class="review">
                
                </div>
            </div>
        `;
      document.querySelector("#containerBox").insertAdjacentHTML("beforeend", temp_html);
    });
}
