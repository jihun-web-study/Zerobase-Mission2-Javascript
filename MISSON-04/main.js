// do something!
import { renderCalendar, addEvents } from "./calendar/calendar.js";

function setCalendarSize(size) {
  const calendar = document.querySelector(".calendar");
  return calendar.style.setProperty("--calender-size", `${size}px`);
}

// HTML문서 로드가 완료되면 Date Picker 렌더링
const main = () => {
  const datePicker = document.querySelector("#datePicker");
  const datePickerInner = `<input type="text" id="datePicker-input" placeholder="Select date" readonly />
<div class="calendar">
  <nav class="calendar-nav">
    <button class="nav-btn btn-prev"></button>
    <div class="nav-yearMonth">
      <div class="nav-month">month</div>
      <div class="nav-year">0000</div>
    </div>
    <button class="nav-btn btn-next"></button>
  </nav>
  <div class="calendar-grid">
    <div class="calendar-week">
      <div class="week-day">SUN</div>
      <div class="week-day">MON</div>
      <div class="week-day">TUE</div>
      <div class="week-day">WED</div>
      <div class="week-day">THU</div>
      <div class="week-day">FRI</div>
      <div class="week-day">SAT</div>
    </div>
    <div class="calendar-days"></div>
  </div>
</div>`;

  datePicker.innerHTML = datePickerInner;

  renderCalendar();
  addEvents();
  setCalendarSize(200);
};

document.addEventListener("DOMContentLoaded", main);
