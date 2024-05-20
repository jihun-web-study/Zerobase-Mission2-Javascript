/**
 * @param {Element} $container
 */
const AnalogClock = ($container) => {
  /* 시계 바늘 요소 동적 생성 */
  // 시계 바늘 요소 생성
  const hourHand = document.createElement("div");
  hourHand.classList.add("hand", "hour");
  const minuteHand = document.createElement("div");
  minuteHand.classList.add("hand", "minute");
  const secondHand = document.createElement("div");
  secondHand.classList.add("hand", "second");

  // 시간 요소 생성
  for (let i = 0; i < 12; i++) {
    const timeElement = document.createElement("div");
    timeElement.classList.add("time", `time${i + 1}`);
    timeElement.textContent = "|";
  }

  $container.append(hourHand, minuteHand, secondHand);

  // 시간 요소 추가
  for (let i = 0; i < 12; i++) {
    const timeElement = document.createElement("div");
    timeElement.classList.add("time", `time${i + 1}`);
    timeElement.textContent = "|";
    $container.appendChild(timeElement);
  }

  /* 바늘 위치 세팅 */
  // 바늘마다의 주기(ms)와 각도(deg)
  /* const hourSetting = { interval: 60 * 60 * 1000, deg: 30 };
  const minuteSetting = { interval: 60 * 1000, deg: 6 };
  const secondSetting = { interval: 1000, deg: 6 }; */
  console.log($container.querySelectorAll(".hand"));
  const handHour = $container.querySelector(".hand.hour");
  const handMinute = $container.querySelector(".hand.minute");
  const handSecond = $container.querySelector(".hand.second");

  // 1초 간격을 보장하며 0.5초마다 시간을 가져와 바늘 위치 조정
  /* let interval = setInterval(() => {
  const date = new Date();
  const hour = date.getHours() % 12;
  const min = date.getMinutes();
  const sec = date.getSeconds();

  handHour.style.setProperty("--deg", hour * 30 + 0.5 * min);
  handMinute.style.setProperty("--deg", min * 6);
  handSecond.style.setProperty("--deg", sec * 6);

  console.log($container, handHour);
}, 1000); */

  // setInterval보다 나은 점: 지연 간격 보장
  let timerId = setTimeout(function tick() {
    const date = new Date();
    const hour = date.getHours() % 12;
    const min = date.getMinutes();
    const sec = date.getSeconds();

    handHour.style.setProperty("--deg", hour * 30 + 0.5 * min);
    handMinute.style.setProperty("--deg", min * 6);
    handSecond.style.setProperty("--deg", sec * 6);

    timerId = setTimeout(tick, 500); // (*)
  }, 1000);
};

export default AnalogClock;
