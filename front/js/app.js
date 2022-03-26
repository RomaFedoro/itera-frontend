const DAYSWEEK = {
  0: "вс",
  1: "пн",
  2: "вт",
  3: "ср",
  4: "чт",
  5: "пт",
  6: "сб",
};

let body = document.body;
let today = new Date();

function formatDate(time) {
  const offset = time.getTimezoneOffset();
  time = new Date(time.getTime() - offset * 60 * 1000);
  return time.toISOString().split("T")[0];
}

function clearBlock(selector) {
  let element = document.queryCommandValue(selector);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function getColor(value) {
  return `hsl(${value}deg 70% 56%)`;
}

function elClass(className, tag = "div") {
  let res = document.createElement(tag);
  res.className = className;
  return res;
}

// Generate Habit History
function clearBlock(selector) {
  let element = document.querySelector(selector);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function generateHistoryBlock() {
  clearBlock("#history-container");
  let draw = SVG().addTo("#history-container").size("100%", "100%");

  let size = document.querySelector("#history-container").clientHeight;
  let weeks = 53;
  let intervalDayWeek = 0.6;
  let intervalWeek = 0.3;
  let degree = -90;

  let sizeDay = (2 * Math.PI) / (weeks * (1 + intervalWeek));
  let widthWeek = sizeDay * (7 + 6 * intervalDayWeek);
  let radius = size / (2 * (1 + widthWeek));
  widthWeek *= radius;
  sizeDay *= radius;

  function generateWeeks() {
    for (let i = 0; i < weeks; i++) {
      let group = draw.group();
      let posDay = 0;
      for (let j = 0; j < 7; j++) {
        let circle = group.circle(sizeDay).move(posDay, 0);
        circle.attr({ fill: "var(--inactive-color)" });
        posDay = posDay + intervalDayWeek * sizeDay + sizeDay;
      }
      let degreeRadian = (degree * Math.PI) / 180;
      let x = radius * Math.cos(degreeRadian) + size / 2 - sizeDay / 2;
      let y = radius * Math.sin(degreeRadian) + size / 2 - sizeDay / 2;
      group.attr({
        transform: `translate(${x}, ${y}) rotate(${degree} ${sizeDay / 2} ${
          sizeDay / 2
        })`,
      });
      degree -= 360 / weeks;
    }
  }

  generateWeeks();
}

function defaultState() {
  return;
}

function templateHabitBlock(data, mode = "show") {
  let container = elClass("habit-block");
  if (mode === "done") container.classList.add("habit-block_done");

  let title = elClass("habit-block_title");
  title.innerHTML = data.name;
  container.append(title);

  let count_container = elClass("habit-block_count-container");

  let count = elClass("habit-block_count");
  let countText;
  let isLastStep = false;
  if (mode === "done") {
    countText = "ВЫПОЛНЕНО";
    count.innerHTML = countText;
  } else if (mode === "perform") {
    countText = data.total_step - data.done_step;
    count.innerHTML = countText * data.repeat;
    isLastStep = countText <= 1;
  } else {
    countText = data.step * data.repeat;
    count.innerHTML = countText;
  }
  if (!isLastStep) count_container.append(count);

  let detailed_count;
  if (mode != "done" && !isLastStep) {
    detailed_count = elClass("habit-block_count");
    detailed_count.innerHTML = `${countText} x ${data.repeat}&nbsp;${data.units}`;
    detailed_count.style.display = "none";
    count_container.append(detailed_count);
  }

  if (mode === "perform") {
    function changeBtn() {
        if (isLastStep) {
          button.innerHTML = "выполнить";
          button.classList.add("count-brn_active");
        } else {
          button.innerHTML = "выполнить подход";
        }
    }

    let button = elClass("habit-block_count-brn", "button");
    changeBtn();
    count_container.append(button);

    button.onclick = async function () {
        let info_step = await eel.get_notes(
          "date_habits",
          '["done_step", "total_step"]',
          `habit_id=${data.habit_id} AND date="${formatDate(today)}"`
        )();
        info_step = JSON.parse(info_step)[0];
        info_step.done_step += 1;
        if (info_step.done_step > info_step.total_step) info_step.done_step = info_step.total_step;
        
        await eel.update_notes(
          "date_habits",
          `{"done_step": ${info_step.done_step}}`,
          `habit_id=${data.habit_id} AND date="${formatDate(today)}"`
        )();
        let left_steps = info_step.total_step - info_step.done_step;

        isLastStep = left_steps <= 1;
        changeBtn();
        if (info_step.total_step == info_step.done_step) return todayPage();
        if (isLastStep) {
            count.remove();
            detailed_count.remove();
        } else {
            count.innerHTML = left_steps * data.repeat;
            detailed_count.innerHTML = `${left_steps} x ${data.repeat}&nbsp;${data.units}`;
        }
    };
  }

  container.append(count_container);


  function changeCount() {
    if (mode == 'done') return;
    let blocks = container.getElementsByClassName("habit-block_count");
    for (let i = 0; i < blocks.length; ++i) {
        blocks[i].style.display =
            blocks[i].style.display == "none" ? "inline-flex" : "none";
    }
  }

  container.onmouseover = function () {
    changeCount();
    if (mode != "done") container.style.backgroundColor = getColor(data.color);
  };

  container.onmouseout = function () {
    changeCount();
    if (mode != "done") container.style.backgroundColor = "transparent";
  };

  container.onclick = function () {
    if (event.target.tagName == 'BUTTON') return;
    habitPage(data.habit_id);
  };

  return container;
}

//Load Today Page

let titleBlock = document.querySelector(".title");
let titleDescriptBlock = document.querySelector(".title-description");
let today_habits_keys = '["habit_id", "done_step", "total_step"]';
let info_today_habits_keys = '["name", "repeat", "units", "color"]';
let listContainer = document.querySelector("#list-container");

async function todayPage() {
  defaultState();
  document.querySelector("#menu-btn_today").classList.add("menu-btn_active");
  body.setAttribute("style", "--main-color: #111111;");

  today = new Date();
  let month = today.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  titleBlock.innerHTML = `${today.getDate()}.${month}`;
  titleDescriptBlock.innerHTML = DAYSWEEK[today.getDay()];
  let today_habits = await eel.get_notes(
    "date_habits",
    today_habits_keys,
    `date="${formatDate(today)}"`
  )();
  today_habits = JSON.parse(today_habits);

  let done_today_habits = [];
  clearBlock("#list-container");
  let list_habits = elClass("list");

  for (i in today_habits) {
    let habit = today_habits[i];
    if (habit.done_step == habit.total_step) {
      done_today_habits.push(habit.habit_id);
      continue;
    }
    let habit_info = await eel.get_notes(
      "habits",
      info_today_habits_keys,
      `id=${habit.habit_id}`
    )();
    habit_info = JSON.parse(habit_info);
    if (Object.keys(habit_info).length == 0) continue;
    habit_info = Object.assign({}, habit_info[0], habit);
    list_habits.append(templateHabitBlock(habit_info, (mode = "perform")));
  }
  if (list_habits.firstChild) listContainer.append(list_habits);

  list_habits = elClass("list");
  for (let i = 0; i < done_today_habits.length; ++i) {
    let habit_id = done_today_habits[i];
    let habit_info = await eel.get_notes(
      "habits",
      '["name"]',
      `id=${habit_id}`
    )();
    habit_info = JSON.parse(habit_info)[0];
    if (habit_info === undefined) continue;
    habit_info["habit_id"] = habit_id;
    list_habits.append(templateHabitBlock(habit_info, (mode = "done")));
  }
  if (list_habits.firstChild) listContainer.append(list_habits);
}

async function habitPage(id) {
  console.log(id);
}

todayPage();
