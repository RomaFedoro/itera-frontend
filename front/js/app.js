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
    return time.toISOString().split('T')[0];
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

function divClass(className) {
    let res = document.createElement('div');
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
    clearBlock('#history-container');
    let draw = SVG().addTo('#history-container').size('100%', '100%');
    
    let size = document.querySelector('#history-container').clientHeight;
    let weeks = 53;
    let intervalDayWeek = 0.6;
    let intervalWeek = 0.3;
    let degree = -90;

    let sizeDay = 2 * Math.PI / (weeks * (1 + intervalWeek));
    let widthWeek = sizeDay * (7 + 6*intervalDayWeek);
    let radius = size / (2 * (1 + widthWeek));
    widthWeek *= radius;
    sizeDay *= radius;

    function generateWeeks() {
        for(let i = 0; i < weeks; i++) {
            let group = draw.group();
            let posDay = 0;
            for(let j = 0; j < 7; j++) {
                let circle = group.circle(sizeDay).move(posDay, 0);
                circle.attr({ fill: 'var(--inactive-color)' });
                posDay = posDay + intervalDayWeek * sizeDay + sizeDay;
            }
            let degreeRadian = degree * Math.PI/180;
            let x = radius * Math.cos(degreeRadian) + size/2 - sizeDay/2;
            let y = radius * Math.sin(degreeRadian) + size/2 - sizeDay/2;
            group.attr({ transform: `translate(${x}, ${y}) rotate(${degree} ${sizeDay/2} ${sizeDay/2})` });
            degree -= 360 / weeks;
        }
    }

    generateWeeks()
}


function defaultState() {
    return
}


function templateHabitBlock(data, mode='show') {
    let container = divClass('habit-block');
    if (mode === 'done') container.classList.add('habit-block_done');

    let title = divClass('habit-block_title');
        title.innerHTML = data.name;
    container.append(title);

    let count_container = divClass('habit-block_count-container');
    let count = divClass('habit-block_count');
    let countText;
    if (mode === 'done') {
        countText = 'выполнено';
    } else if (mode === 'perform') {
        countText = data.total_step - data.done_step;
    } else {
        countText = data.step * data.repeat;
    }
    count.innerHTML = countText;
    count_container.append(count);
    if (mode != 'done') {
        let detailed_count = divClass('habit-block_count');
        detailed_count.innerHTML = `${countText} x ${data.repeat}&nbsp;${data.units}`;
        detailed_count.style.display = "none";
        count_container.append(detailed_count);
    }
    container.append(count_container);

    // Место для кнопки

    function changeCount() {
        let blocks = container.getElementsByClassName('habit-block_count');
        for (let i = 0; i < blocks.length; ++i) {
            blocks[i].style.display = (blocks[i].style.display == 'none') ?  'inline-flex' : 'none';
        }
    }

    container.onmouseover = function() {
        changeCount();
        container.style.backgroundColor = getColor(data.color);
    }

    container.onmouseout = function() {
        changeCount();
        container.style.backgroundColor = 'transparent';
    }

    container.onclick = function() {
        habitPage(data.habit_id);
    }

    return container;
}

//Load Today Page

let titleBlock = document.querySelector('.title');
let titleDescriptBlock = document.querySelector('.title-description');
let today_habits_keys = '["habit_id", "done_step", "total_step"]';
let info_today_habits_keys = '["name", "repeat", "units", "color"]';
let listContainer = document.querySelector('#list-container');

async function todayPage() {
    defaultState();
    document.querySelector('#menu-btn_today').classList.add('menu-btn_active');
    body.setAttribute("style", "--main-color: #111111;");

    today = new Date();
    let month = today.getMonth() + 1;
    month = (month < 10) ? `0${month}`: month; 
    titleBlock.innerHTML = `${today.getDate()}.${month}`;
    titleDescriptBlock.innerHTML = DAYSWEEK[today.getDay()];

    let today_habits = await eel.get_notes('date_habits', today_habits_keys, `date="${formatDate(today)}"`)();
    today_habits = JSON.parse(today_habits);

    let done_today_habits = [];
    clearBlock('#list-container');
    let list_habits = divClass("list");

    for (i in today_habits) {
        let habit = today_habits[i];
        if (habit.done_step == habit.total_step) {
            done_today_habits.push(habit.id);
            continue;
        }
        let habit_info = await eel.get_notes('habits', info_today_habits_keys, `id=${habit.habit_id}`)();
        habit_info = JSON.parse(habit_info);
        if (Object.keys(habit_info).length == 0) continue;
        habit_info = Object.assign({}, habit_info[0], habit);
        list_habits.append(templateHabitBlock(habit_info, mode='perform'));
    }
    listContainer.append(list_habits);
}

async function habitPage(id) {
    console.log(id);
}


todayPage();