export const handleSearch = (searchKeyword) => {
  const movieCards = document.querySelectorAll(".movie-card");
  const cardsArray = [];

  movieCards.forEach((card) => {
    const title = card.querySelector(".movieTitle").textContent.toLowerCase();
    const searchedValue = searchKeyword.toLowerCase();

    if (title.includes(searchedValue)) {
      cardsArray.push(title);
    } else {
    }
    console.log(cardsArray);

    /* 영화 검색 유효성 검사 */
    if (cardsArray.length === 0) {
      return alert(`검색 결과가 없습니다. 다시 입력해 주세요.`);
    } else if (title.includes(cardsArray)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  //   const cards = document.querySelectorAll(".movie-card");
  //   const isEveryCardsnotShown = [...cards].every((card) => {
  //     return card.style.display === "none";
  //   });
  //   console.log(isEveryCardsnotShown);
  //   if (isEveryCardsnotShown === true) {
  //     alert(`검색 결과가 없습니다. 다시 입력해 주세요.`);
  //   } else {
  //   }
};
