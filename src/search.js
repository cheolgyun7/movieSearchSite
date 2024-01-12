export const handleSearch = (searchKeyword) => {
  const movieCards = document.querySelectorAll(".movie-card");
  const cardsArray = [];

  movieCards.forEach((card) => {
    const title = card.querySelector(".movieTitle").textContent.toLowerCase();
    const searchedValue = searchKeyword.toLowerCase();

    // 검색 결과 있을 때, 빈 배열에 카드 제목 추가
    if (title.includes(searchedValue) === true) {
      cardsArray.push(title);
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // 검색 결과가 없을 경우(=빈 배열 상태), alert 띄우기 + 기존 카드 모두 보이게 하기
  if (cardsArray.length === 0) {
    alert(`검색 결과가 없습니다. 다시 입력해 주세요.`);
    movieCards.forEach((card) => {
      card.style.display = "block";
    });
  }
};
