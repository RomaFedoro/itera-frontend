import sqlite3
from json import loads, dumps
from os import path
import eel
from datetime import datetime, date, timedelta

url_db = path.dirname(path.abspath(__file__)) + r'\habits.db'
connection = sqlite3.connect(url_db)

create_habits_table = """
CREATE TABLE IF NOT EXISTS habits (
    habit_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    description TEXT DEFAULT '', 
    color INTEGER DEFAULT 180,
    days_week TEXT DEFAULT '',
    step INTEGER DEFAULT 1,
    repeat INTEGER DEFAULT 1,
    units TEXT DEFAULT 'once',
    remind INTEGER DEFAULT 1,
    date_creation TEXT,
    date_check TEXT
);
"""

create_date_table = """
CREATE TABLE IF NOT EXISTS date_habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    habit_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    done_step INTEGER DEFAULT 0,
    total_step INTEGER
);
"""

create_setting_table = """
CREATE TABLE IF NOT EXISTS setting (
    param TEXT,
    value TEXT
);
"""


def execute_query(query, values=None):
    cursor = connection.cursor()
    if values is None:
        cursor.execute(query)
    else:
        cursor.execute(query, values)
    connection.commit()


def execute_read_query(query):
    cursor = connection.cursor()
    cursor.execute(query)
    names = [description[0] for description in cursor.description]
    result_query = cursor.fetchall()
    format_res = []
    for el in result_query:
        new_el = {}
        for i in range(len(el)):
            new_el[names[i]] = el[i]
        format_res.append(new_el)
    return dumps(format_res, ensure_ascii=False)


@eel.expose
def add_note(name_table, params):
    def format_to_str(array):
        res = ""
        for el in array:
            if str(el).isdecimal():
                res = '{}, {}'.format(res, el)
            else:
                res = '{}, \"{}\"'.format(res, el)
        return res[2:]

    params = loads(params)
    keys = list(params)
    values = [str(params[el]) for el in keys]
    query = """ INSERT INTO {} ({}) VALUES ({}); """.format(name_table, ', '.join(keys), format_to_str(values))
    execute_query(query)
    if name_table == 'setting':
        return
    id_query = "max(habit_id)"
    id = execute_read_query("""SELECT {} FROM {};""".format(id_query, name_table))
    id = loads(id)[0][id_query]
    return id


@eel.expose
def get_notes(name_table, params="*", condition=""):
    if params != "*":
        params = loads(params)
    query = """SELECT {} FROM {}""".format(', '.join(params), name_table)
    if condition != "":
        query += " WHERE {}".format(condition)
    query += ";"
    return execute_read_query(query)


@eel.expose
def update_notes(name_table, params, condition):
    def format_to_str(el):
        if str(el).isdecimal():
            return el
        return '\"{}\"'.format(el)

    temp = loads(params)
    params = ['{} = {}'.format(el, format_to_str(temp[el])) for el in temp]
    query = """UPDATE {} SET {} WHERE {};""".format(name_table, ', '.join(params), condition)
    return execute_query(query)


@eel.expose
def delete_notes(name_table, condition):
    query = """DELETE FROM {} WHERE {};""".format(name_table, condition)
    return execute_query(query)


def update_dateHabits(date):
    daysweek_date = {}
    habits_date = loads(get_notes('habits', '["habit_id", "days_week", "step", "date_check"]', condition=""))
    update_notes('habits', dumps({'date_check': date}), 'date_check <> {}'.format(date))
    habits_step = {}
    date = datetime.strptime(date, "%Y-%m-%d")
    min_date_change = date
    for habit in habits_date:
        daysweek_habit = loads(habit['days_week'])
        for day in daysweek_habit:
            if day not in daysweek_date:
                daysweek_date[day] = []
            daysweek_date[day].append(habit['habit_id'])
        if min_date_change > datetime.strptime(habit['date_check'], "%Y-%m-%d"):
            min_date_change = datetime.strptime(habit['date_check'], "%Y-%m-%d")
        habits_step[habit['habit_id']] = {
            "step": habit['step'],
            "date_check": datetime.strptime(habit['date_check'], "%Y-%m-%d")
        }
    delta = (date - min_date_change).days
    for i in range(1, delta+1):
        day_i = min_date_change + timedelta(days=i)
        dayweek_i = day_i.isoweekday() % 7
        for id in daysweek_date[dayweek_i]:
            if habits_step[id]['date_check'] >= day_i:
                continue
            query = {
                'habit_id': id,
                'date': str(day_i.date()),
                'done_step': 0,
                'total_step': habits_step[id]['step']
            }
            add_note('date_habits', dumps(query))


@eel.expose
def check_tomorrow():
    print('Start')
    date_launce = date.today()
    last_date_launce = loads(get_notes('setting', '["value"]', '"param"="last_launch"'))
    if not last_date_launce:
        query = {
            'param': 'last_launch',
            'value': str(date_launce)
        }
        add_note('setting', dumps(query))
        return update_dateHabits(str(date_launce))
    last_date_launce = last_date_launce[0]['value']
    if str(date_launce) != last_date_launce:
        update_notes('setting', dumps({'value': str(date_launce)}), '"param"="last_launch"')
        return update_dateHabits(str(date_launce))


def launch_preparation():
    execute_query(create_habits_table)
    execute_query(create_date_table)
    execute_query(create_setting_table)
    check_tomorrow()


if __name__ == "__main__":
    launch_preparation()
