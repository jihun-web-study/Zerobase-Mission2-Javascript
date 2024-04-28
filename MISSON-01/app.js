// do something!

// HTML 문서 로드가 완료되면 실행되는 코드
// 코드의 진행을 순서대로 하기 위한 의도적 함수 호이스팅
document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log("로드 완료!");
  // 초기 렌더링 이후, body태그를 보이게 하고 transition 활성화
  const body = document.body;
  body.style.visibility = "visible";
  body.classList.remove("preload");

  // nav의 open 상태 초기화
  const isNavOpen = localStorage.getItem("isNavOpen");
  if (isNavOpen === "true") document.querySelector("nav").classList.add("active");
  else localStorage.setItem("isNavOpen", false);

  /*  이후 진행 부 */
  // 토글버튼과 nav 요소 가져오기
  const toggleButton = document.querySelector("i.toggle");
  const nav = document.querySelector("nav");

  const clickToggleButton = () => {
    // nav 클래스 토글
    nav.classList.toggle("active");

    // 로컬스토리지 값 가져오기
    // 클릭할때마다 가져와야 최신 상태를 유지함
    const isNavOpen = localStorage.getItem("isNavOpen");
    if (isNavOpen === "false") localStorage.setItem("isNavOpen", true);
    else localStorage.setItem("isNavOpen", false);
  };

  toggleButton.addEventListener("click", clickToggleButton);
}
