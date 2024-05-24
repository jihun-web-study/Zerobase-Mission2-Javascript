// do something!
import { state, subscribe } from "../state/index.js";

class NewsList {
  /**
   * @param {Element} $container
   */
  constructor($container) {
    this.$container = $container;
    this.$newsList = $container.querySelector(".news-list");
    this.$scrollObserver = $container.querySelector(".scroll-observer");

    this.page = 1;
    this.apiKey = prompt("News API Key를 입력해주세요.");

    this.currentCategory = null;
    this.totalNewsCount = 0;
    this.currentNewsCount = 0;

    this.intersectionObserver = this.createIntersectionObserver();

    this.render().then(() => {
      // scrollObserver 요소가 뷰포트와 교차하면 intersectionObserver의 observer가 호출됨
      this.intersectionObserver.observe(this.$scrollObserver);
      // 전역 상태를 구독하여 전역 상태 변경 시 컴포넌트의 render 메서드 호출 => re-rendering
      subscribe(this);
    });

    subscribe(this);
  }

  createIntersectionObserver() {
    return new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting || target !== this.$scrollObserver) return;

        // 더이상 불러들일 뉴스가 없는 경우
        if (this.currentNewsCount !== 0 && this.totalNewsCount === this.currentNewsCount) {
          console.log("no more news");

          // 박스 영역 유지용
          // => display: 'none';으로 하면 렌더링이 안되어 추후에 스크롤 옵저버가 감지 X
          this.$scrollObserver.style.visibility = "hidden";
          return;
        }

        this.$scrollObserver.style.visibility = "visible";
        this.page += 1;
        this.render();
      });
    });
  }

  // 2차 라이브 1:21:02
  async render() {
    // 카테고리 변화 감지 후 업데이트
    const isCategoryChanged = this.currentCategory !== state.category;
    // 카테고리가 바뀌면 page를 1로 초기화
    if (isCategoryChanged) {
      this.page = 1;
      this.currentCategory = state.category;
    }

    // get News Articles
    const { totalResults, articles } = await this.fetchArticles(state.category, this.page);
    console.log(`[fetch-${this.currentCategory}-articles]`, { totalResults, articles });

    this.totalNewsCount = totalResults;
    const $articles = this.createArticleElements(articles);

    if (isCategoryChanged) {
      console.log(1, $articles);
      this.$newsList.replaceChildren($articles);
      this.currentNewsCount = articles.length;
    } else {
      console.log(2, $articles);
      this.$newsList.appendChild($articles);
      this.currentNewsCount += articles.length;
    }

    console.log("[render]", {
      totalNewsCount: this.totalNewsCount,
      currentNewsCount: this.currentNewsCount,
    });
  }

  async fetchArticles(category, page) {
    const pageSize = 5;
    // 개인 API Key 입력 // 보안을 위해
    //const apiKey = prompt("News API Key를 입력해주세요.");
    const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${
      category === "all" ? "" : category
    }&page=${page}&pageSize=${pageSize}&apiKey=${this.apiKey}`;

    try {
      // page를 1 증가시키면 다음 페이지의 뉴스를 취득한다.
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      alert(`에러발생!\n${error.response.data.message}`);
    }
  }

  // 뉴스 아이템 템플릿
  createArticleElements(articles) {
    const isURLToImageNull =
      "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
    const $template = document.createElement("template");

    $template.innerHTML = articles
      .map(
        ({ title, description, url, urlToImage }) => `
      <section class="news-item">
        <div class="thumbnail">
          <a href=${url} target="_blank" rel="noopener noreferrer">
            <img src=${urlToImage || isURLToImageNull} alt="thumbnail" />
          </a>
        </div>
        <div class="contents">
          <h2>
            <a href=${url} target="_blank" rel="noopener noreferrer">${title}</a>
          </h2>
          <p>${description || ""}</p>
        </div>
        </section>`
      )
      .join("");

    return $template.content;
  }
}

export default NewsList;
