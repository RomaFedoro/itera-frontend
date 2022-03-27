const DAYSWEEK = {
  0: "вс", 1: "пн", 2: "вт", 3: "ср", 4: "чт", 5: "пт", 6: "сб",
};

let body = document.body;
let today = new Date();

function formatDate(time) {
  const offset = time.getTimezoneOffset();
  time = new Date(time.getTime() - offset * 60 * 1000);
  return time.toISOString().split("T")[0];
}

function isDateChanged() {
    let last_date = formatDate(today);
    today = new Date();
    let this_date = formatDate(today);
    if (last_date === this_date) return false;
    return true;
}

function clearBlock(selector) {
  let element = document.queryCommandValue(selector);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function getColor(value) {
  return `hsl(${value}deg 60% 50%)`;
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


let workspaces = document.getElementsByClassName('workspace');
let menu = document.getElementsByClassName('menu')[0];

function defaultState(id_menu_btn, id_workspace, color_body = '#111111', isHabitPages = false) {
    let workspace = document.getElementById(id_workspace);
    (isHabitPages) ? menu.classList.add("habit-menu") : menu.classList.remove("habit-menu");
    if (workspace.style.display == 'none') {
        for (let i = 0; i < workspaces.length; ++i ) {
            workspaces[i].style.display = 'none';
            
        }
        workspace.style.display = '';
    }
    document.getElementsByClassName('menu-btn_active')[0].classList.remove('menu-btn_active');
    document.getElementById(id_menu_btn).classList.add('menu-btn_active');
    body.setAttribute("style", `--main-color: ${color_body};`);
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
    countText = data.step;
    count.innerHTML = data.step * data.repeat;
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
        if (isDateChanged()) return todayPage();
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
            blocks[i].style.display == "none" ? "" : "none";
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


//Load Today Habit

let titleBlock = document.querySelector(".title");
let titleDescriptBlock = document.querySelector(".title-description");
let today_habits_keys = '["habit_id", "done_step", "total_step"]';
let info_today_habits_keys = '["name", "repeat", "units", "color"]';
let info_all_habits_keys = '["habit_id", "name", "step", "repeat", "units", "color"]';
let listContainer = document.querySelector("#list-container");

async function todayPage() {
    defaultState("menu-btn_today","dashboard-workspace");

    today = new Date();
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    titleBlock.innerHTML = `${today.getDate()}.${month}`;
    titleDescriptBlock.innerHTML = DAYSWEEK[today.getDay()];
    if (isDateChanged()) return todayPage();
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
          `habit_id=${habit.habit_id}`
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
          '["habit_id", "name"]',
          `habit_id=${habit_id}`
        )();
        habit_info = JSON.parse(habit_info)[0];
        if (habit_info === undefined) continue;
        list_habits.append(templateHabitBlock(habit_info, (mode = "done")));
    }
    if (list_habits.firstChild) listContainer.append(list_habits);
}


//Load All Habits

async function allHabitsPage() {
    defaultState("menu-btn_all","dashboard-workspace");
    let all_habits = await eel.get_notes(
        "habits", 
        info_all_habits_keys
    )();
    all_habits = JSON.parse(all_habits);
    titleBlock.innerHTML = Object.keys(all_habits).length;
    titleDescriptBlock.innerHTML = '';

    clearBlock("#list-container");
    let list_habits = elClass("list");

    for (i in all_habits) {
      let habit = all_habits[i];
      list_habits.append(templateHabitBlock(habit));
    }
    if (list_habits.firstChild) listContainer.append(list_habits);
}


//Add Habit

let daysweekInput = document.getElementById('daysweek-input');
let daysweekArr = [];

function generateDaysweekInput(maskChecked='all') {
    clearBlock('#daysweek-input');
    daysweekArr = [];
    for (let i=1; i <= 7; ++i) {
        if (i == 7) i = 0;

        let block = elClass('checkbox-block', 'label');
        let input = document.createElement('input');
            input.type = 'checkbox';
            input.value = i;
            input.checked = (maskChecked === 'all') ? true : maskChecked.indexOf(i) != -1;
            
        inputState();

        function inputState() {
            pos = daysweekArr.indexOf(i);
            if (input.checked) {
                if (pos != -1) return;
                daysweekArr.push(i);
            } else {
                if (pos == -1) return;
                daysweekArr.splice(pos, 1); 
            }
        }

        input.oninput = () => inputState();
        let input_name = elClass('checkbox_name');
            input_name.innerHTML = DAYSWEEK[i];

        block.append(input);
        block.append(input_name);
        daysweekInput.append(block);

        if (i == 0) break;
    }
}

generateDaysweekInput();


let nameInput = document.getElementById('name-habit-input');
let descriptInput = document.getElementById('description-input');
let colorInput = document.getElementById('color-input');
let stepInput = document.getElementById('step-input');
let repeatInput = document.getElementById('repeat-input');
let unitsInput = document.getElementById('units-input');
let remindInput = document.getElementById('remind-input');
let buttonHabitInput = document.getElementById('load-button');

function getDataHabit() {
    today = new Date();
    let habit_data = {};
    habit_data['name'] = nameInput.value;
    habit_data['description'] = descriptInput.value;
    habit_data['color'] = colorInput.value;
    habit_data['days_week'] = daysweekArr;
    if (stepInput.value) habit_data['step'] = stepInput.value;
    if (repeatInput.value) habit_data['repeat'] = repeatInput.value;
    if (unitsInput.value) habit_data['units'] = unitsInput.value;
    if (!remindInput.checked) habit_data['remind'] = 0;
    habit_data['date_creation'] = formatDate(today);
    habit_data['date_check'] = formatDate(today);
    return habit_data;
}

async function addHabitsPage() {
    function clear() {
        nameInput.value = '';
        descriptInput.value = '';
        colorInput.value = 240;
        stepInput.value = 1;
        repeatInput.value = 1;
        unitsInput.value = '';
        remindInput.checked = true;
        generateDaysweekInput();
    }
    defaultState("menu-btn_add", "setting-workspace", getColor(colorInput.value));
    buttonHabitInput.value = 'Создать привычку';
    buttonHabitInput.onclick = () => {
        addHabits();
        clear();
    }
    colorInput.oninput = () => {
        body.setAttribute("style", `--main-color: ${getColor(colorInput.value)};`);
    }
}

async function addHabits() {
    if (!nameInput.value) return;
    let habit_data = getDataHabit();
    let habit_id = await eel.add_note(
        "habits",
        JSON.stringify(habit_data)
    )();
    if (daysweekArr.indexOf(today.getDay()) != -1) {
        let date = {
            'habit_id': habit_id,
            'date': formatDate(today),
            'total_step': habit_data['step']
        }
        await eel.add_note(
            "date_habits",
            JSON.stringify(date)
        )();
    }
}


//Page Habit

let habit_keys = '["name", "description", "step", "color"]';
let date_habit_keys = '["date", "done_step", "total_step"]';
let menuHabit = document.getElementById('menu-btn_habit');
let menuHabitEdit = document.getElementById('menu-btn_edit-habit');
let menuHabitDelete = document.getElementById('menu-btn_delete-habit');

async function habitPage(habit_id) {
    let habit_data = await eel.get_notes(
        "habits",
        habit_keys,
        `habit_id=${habit_id}`
    )();
    habit_data = JSON.parse(habit_data)[0];
    menuHabit.innerHTML = habit_data.name;
    menuHabitEdit.onclick = () => editHabitPage(habit_id);
    menuHabitDelete.onclick = () => deleteHabitPage(habit_id);
    defaultState("menu-btn_habit", "habit-workspace", getColor(habit_data.color), true);
    document.getElementById('habit-title').innerHTML = habit_data.name;
    document.getElementById('habit-title_description').innerHTML = habit_data.description;

    // Здесь будет дневная привычка

    let date_habit_data = await eel.get_notes(
        "date_habits",
        date_habit_keys,
        `habit_id=${habit_id}`
    )();
    date_habit_data = JSON.parse(date_habit_data);

    // Generate Statistic
    let total = date_habit_data.length;
    let start_perform = 0;
    let end_perform = 0;
    for(let i = 0; i < total; ++i) {
        let date = date_habit_data[i];
        if (date.done_step > 0) start_perform += 1;
        if (date.done_step == date.total_step) end_perform += 1; 
    }
    let statistic_data = {
        'всего дней': total,
        'начато выполнение': start_perform,
        'полностью выполнено': end_perform
    }

    let statisticList = document.getElementById("statistic-list");
    clearBlock('#statistic-list');
    function generateStatistic(key) {
        let block = elClass("statistic-block");
        let num = elClass("statistic-block_title");
            num.innerHTML = statistic_data[key];
        let text = elClass("statistic-block_description");
            text.innerHTML = key;
        block.append(num);
        block.append(text);
        return block;
    }

    for (key in statistic_data){
        statisticList.append(generateStatistic(key));
    }
}

async function editHabitPage(id) {
    console.log(id);
}

async function deleteHabitPage(id) {
    console.log(id);
}

todayPage();
