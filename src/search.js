export const handleSearch = (searchKeyword) => {
  const movieCards = document.querySelectorAll(".movie-card");

  const noResult = document.getElementById("noResult"); /** result관련한거지우셔도됩니다 */
  let resultFound = false; /** result관련한거지우셔도됩니다 */

  movieCards.forEach((card) => {
    const title = card.querySelector(".movieTitle").textContent.toLowerCase();
    const searchedValue = searchKeyword.toLowerCase();

    if (title.includes(searchedValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  /** result관련한거지우셔도됩니다 */
  if (noResult) {
    noResult.style.display = resultFound ? "none" : "block";
  } else if (!noResult) {
    const newMessage = document.createElement("p");
    newMessage.id = "noResult";
    newMessage.textContent = "검색결과가 없음";
    document.body.appendChild(newMessage);
  }
};
