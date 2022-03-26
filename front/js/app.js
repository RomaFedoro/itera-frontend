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


let titleBlock = document.querySelector('.title');
let titleDescriptBlock = document.querySelector('.title-description');

function todayPage() {
    defaultState();
    document.querySelector('#menu-btn_today').classList.add('menu-btn_active');
    body.setAttribute("style", "--main-color: #111111;");
    let month = today.getMonth() + 1;
    month = (month < 10) ? `0${month}`: month; 
    titleBlock.innerHTML = `${today.getDate()}.${month}`;
    titleDescriptBlock.innerHTML = DAYSWEEK[today.getDay()];
}


todayPage();