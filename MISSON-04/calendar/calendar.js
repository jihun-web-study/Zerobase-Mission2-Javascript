import { monthMap } from "./util/dateMap.js";

const print = console.log;

let date = new Date();

export const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  // 현재 연도와 월 표시
  const [headerMonth, headerYear] = document.querySelector(".nav-yearMonth").children;
  headerYear.textContent = viewYear;
  headerMonth.textContent = monthMap[viewMonth];

  // 지난달 마지막날과 이번달 마지막날
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);
  const nextMonth = new Date(viewYear, viewMonth + 1);

  const pLYear = prevLast.getFullYear(); // 지난달 년도
  const pLDate = prevLast.getDate(); // 지난달 마지막 일
  const pLDay = prevLast.getDay(); // 지난달 마지막 요일
  const tLYear = thisLast.getFullYear(); // 이번달 년도
  const tLDate = thisLast.getDate(); // 이번달 마지막 일
  const tLDay = thisLast.getDay(); // 이번달 마지막 요일
  const nextYear = nextMonth.getFullYear();

  const prevDates = Array.from({ length: pLDay + 1 }, (v, i) => ({
    date: pLDate - pLDay + i,
    class: "prevMonth",
    year: pLYear,
    month: prevLast.getMonth() + 1,
  }));
  const thisDates = Array.from({ length: tLDate }, (v, i) => ({
    date: i + 1,
    class: "thisMonth",
    year: tLYear,
    month: thisLast.getMonth() + 1,
  }));
  const nextDates = Array.from({ length: 6 - tLDay }, (v, i) => ({
    date: i + 1,
    class: "nextMonth",
    year: nextYear,
    month: nextMonth.getMonth() + 1,
  }));

  const dates = prevDates.concat(thisDates, nextDates);

  dates.forEach((date, i) => {
    dates[
      i
    ] = `<button class=${date.class} data-year=${date.year} data-month=${date.month}>${date.date}</button>`;
  });

  document.querySelector(".calendar-days").innerHTML = dates.join("");

  // 오늘 날짜 표시해주기
  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (const date of document.querySelectorAll(".thisMonth")) {
      // innerText는 string, getDate()는 number라 형변환
      if (Number(date.innerText) === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }

  // 기존에 선택된 날짜 표시 //
  const selectedDate = document.querySelector("#datePicker-input").value;
  if (selectedDate) {
    const [selectedYear, selectedMonth, selectedDay] = selectedDate.split("-").map(Number);

    const dayButtons = document.querySelector(".calendar-days").children;
    for (const dayButton of dayButtons) {
      const isSameYear = +dayButton.dataset.year === selectedYear;
      const isSameMonth = +dayButton.dataset.month === selectedMonth;
      const isSameDay = +dayButton.innerText === selectedDay;

      if (isSameYear && isSameMonth && isSameDay) {
        dayButton.classList.add("selected");
        break;
      }
    }
  }
};

export const addEvents = () => {
  // 캘린더 이벤트 등록
  //캘린더 날짜에 이벤트 위임 방식으로 클릭 이벤트 등록 //
  const daysCompo = document.querySelector(".calendar-days");
  daysCompo.addEventListener("click", (event) => {
    const target = event.target;
    const dateInput = document.getElementById("datePicker-input");

    if (target.tagName === "BUTTON") {
      const dataset = target.dataset;

      const year = dataset.year;
      const month = dataset.month < 10 ? `0${dataset.month}` : dataset.month;
      const date = target.innerHTML < 10 ? `0${target.innerHTML}` : target.innerHTML;

      const clickedDate = `${year}-${month}-${date}`;

      dateInput.value = clickedDate;
      print(clickedDate);
      dateInput.blur();
    }
  });
  // 클릭 되면 포커스 아웃되도록 설정
  document.querySelector(".calendar").addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  // input창 포커스/포커스아웃 시 캘린더 표시/숨김 처리 //
  const dateInput = document.getElementById("datePicker-input");
  // input 태그에 값이 있으면 날짜를 읽어와서 해당 날짜로 캘린더 렌더링
  dateInput.addEventListener("focus", (event) => {
    const value = event.target.value;
    if (value) {
      const selectDate = value.split("-");
      const selectedDate = new Date(
        Number(selectDate[0]),
        Number(selectDate[1]) - 1,
        Number(selectDate[2])
      );
      date = selectedDate;
      renderCalendar();
    }

    document.querySelector(".calendar").style.display = "block";
  });
  dateInput.addEventListener("focusout", (event) => {
    const isCalendarOpen = document.querySelector(".calendar").contains(event.relatedTarget);

    if (!isCalendarOpen) document.querySelector(".calendar").style.display = "none";
  });

  // 캘린더 헤더에 이벤트 등록 //
  const calendarNav = document.querySelector(".calendar-nav");
  calendarNav.addEventListener("click", (event) => {
    const prevMonth = () => {
      date.setMonth(date.getMonth() - 1);
      renderCalendar();
    };

    const nextMonth = () => {
      date.setMonth(date.getMonth() + 1);
      renderCalendar();
    };

    const classNames = event.target.className;

    if (classNames.includes("btn-prev")) prevMonth();
    if (classNames.includes("btn-next")) nextMonth();
  });
};
