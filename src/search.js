export const handleSearch = (searchKeyword) => {
  const movieCards = document.querySelectorAll(".movie-card");
  const noResult = document.getElementById("noResult");

  let resultFound = false;

  movieCards.forEach((card) => {
    const title = card.querySelector(".movieTitle").textContent.toLowerCase();
    const searchedValue = searchKeyword.toLowerCase();

    if (title.includes(searchedValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  if (noResult) {
    noResult.style.display = resultFound ? "none" : "block";
  } else if (!noResult) {
    const newMessage = document.createElement("p");
    newMessage.id = "noResult";
    newMessage.textContent = "검색결과가 없음";
    document.body.appendChild(newMessage);
  }
};
