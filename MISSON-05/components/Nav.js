// do something!

import state from "../state/index.js";
class Nav {
  /**
   * @param {Element} $container
   */
  constructor($container) {
    this.$container = $container;

    this.categories = [
      { id: "all", text: "전체보기" },
      { id: "business", text: "비즈니스" },
      { id: "entertainment", text: "엔터테인먼트" },
      { id: "health", text: "건강" },
      { id: "science", text: "과학" },
      { id: "sports", text: "스포츠" },
      { id: "technology", text: "기술" },
    ];

    this.render();
    this.addEvents();
  }

  render() {
    const liEls = this.categories
      .map(
        ({ id, text }) =>
          // 임시로 idx로 active 클래스 추가 => 추후에 전역 변수로 active 클래스 추가
          `<li id="${id}" class="category-item ${
            state.category === id ? "active" : ""
          }">${text}</li>`
      )
      .join("");
    this.$container.innerHTML = `<ul>${liEls}</ul>`;
  }

  addEvents() {
    // addEventListener vs onclick
    // 여러개의 이벤트 등록 vs 하나의 이벤트만 등록 + 오래된 브라우저 호환성
    this.$container.onclick = ({ target }) => {
      // {event} = e.target // 구조 분해 할당
      if (!target.matches(".category-item:not(.active)")) return;

      this.$container.querySelector(".active").classList.remove("active");
      target.classList.add("active");

      // 전역상태 갱신 코드
      state.category = target.id;
    };
  }
}

export default Nav;
