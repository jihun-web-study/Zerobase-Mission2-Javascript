// 한번만 실행하기 위해 index.js 상단에서 css 파일 추가
const linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = "./star-rating/theme.css";
document.head.appendChild(linkElement);

/**
 * @param {Element} $container
 */
const StarRating = ($container) => {
  const container = $container;

  /* attribute값만큼 Star 생성 */
  const starCount = JSON.parse($container.getAttribute("data-max-rating"));
  // dataset으로 가져오는 방법 // const starCount = JSON.parse($container.dataset.maxRating);
  const starBox = `<i class='bx bxs-star'></i>`;
  let stars = "";
  for (let count = 0; count < starCount; count++) {
    stars += starBox;
  }
  const appendStars = `<div class="star-rating-container">${stars}</div>`;
  container.innerHTML = appendStars;

  /* 각 Star에 hover와 click 이벤트 추가 */
  const starContainer = container.querySelector(".star-rating-container");
  // 호버시 호버 클래스 추가
  const mouseOverStarHandler = (e) => {
    if (e.target.tagName === "I") {
      const hoveredIndex = Array.from(starContainer.children).indexOf(e.target);
      for (let i = 0; i <= hoveredIndex; i++) {
        const starClassList = starContainer.children[i].classList;
        if (!starClassList.contains("selected")) starClassList.add("hovered");
      }
    }
  };
  // 호버 해제시 호버 클래스 제거
  const mouseOutStarHandler = (e) => {
    if (e.target.tagName === "I") {
      const hoveredIndex = Array.from(starContainer.children).indexOf(e.target);
      for (let i = 0; i <= hoveredIndex; i++) {
        starContainer.children[i].classList.remove("hovered");
      }
    }
  };
  // 클릭 이벤트: 클릭된 별까지는 selected 클래스 추가 + hovered 클래스 제거
  //             기존 높은 rating에서 낮은 rating 클릭 시 그 차이만큼 selected 클래스 제거
  const clickStarHandler = (e) => {
    if (e.target.tagName === "I") {
      const clickedtIndex = Array.from(starContainer.children).indexOf(e.target);

      for (let i = 0; i < starCount; i++) {
        const classList = starContainer.children[i].classList;
        if (i <= clickedtIndex) {
          classList.add("selected");
          classList.remove("hovered");
        } else classList.remove("selected");
      }
      const customEvent = new CustomEvent("rating-change", {
        bubbles: true,
        detail: clickedtIndex + 1,
      });
      $container.dispatchEvent(customEvent);
    }
  };
  starContainer.addEventListener("mouseover", mouseOverStarHandler);
  starContainer.addEventListener("mouseout", mouseOutStarHandler);
  starContainer.addEventListener("click", clickStarHandler);
};

export default StarRating;
