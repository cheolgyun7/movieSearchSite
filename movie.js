const apiKey = '3b7f26c67cbc849c009b06c2dd22d7f3'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjdmMjZjNjdjYmM4NDljMDA5YjA2YzJkZDIyZDdmMyIsInN1YiI6IjY1OTM5OWVkZTY0MGQ2MDE0MGQ2MjgyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KaMA3mWm1eYmxbAex21Sbmhg5fMb4JS8AGtL2-ZOVvI'
  }
};

function displayMovies(response){ //response라는 매개변수를 받음
  const movieList = document.getElementById('movieList');
  response.results.forEach(list => { // 존재하는 데이터를 리스트로 보여줌
    const divList = document.createElement('div'); // 데이터하나하나를 li태그로 감싸준다
    const movieTitle = document.createElement('h3'); // 영화제목태그생성
    const movieImg = document.createElement('img'); //img태그 생성
    const movieDetail = document.createElement('span'); //span태그생성
    const movieGrade = document.createElement('p');

    movieImg.src = `https://image.tmdb.org/t/p/w500${list.backdrop_path}`;

    divList.classList.add("listUp"); // li에 class명을 넣음
    movieImg.classList.add("imgClass");
    movieTitle.textContent = list.title; // li에 li.title을 넣어준다
    movieDetail.textContent = list.overview;
    movieGrade.textContent = `평점 : ${list.vote_average}`;

    movieList.appendChild(divList); // section 태그에 id값 movieList로 가지고 있는곳에 복붙으로 넣어줘야함
    divList.appendChild(movieImg);
    divList.appendChild(movieTitle); //div안에 h3를 넣음
    divList.appendChild(movieDetail);
    divList.appendChild(movieGrade);

    divList.onclick = () => { alert(`영화ID ${list.id}`)} //클릭했을때 영화아이디 나오게
  })
}

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    displayMovies(response); //displayMovies함수 실행
  })
  .catch(err => console.error(err));


  function movieSearch() {
    const searchInput = document.getElementById("searchId").value;
    console.log(searchInput);
    document.getElementById("movieList").innerHTML = '';
  
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&language=ko-KR&page=1&include_adult=false`, options)
      .then(response => response.json())
      .then(response => {
        displayMovies(response);
      })
      .catch(err => console.error(err));
  }

