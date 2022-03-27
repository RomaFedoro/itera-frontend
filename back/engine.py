import sqlite3
from json import loads, dumps
from os import path
import eel

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


def launch_preparation():
    execute_query(create_habits_table)
    execute_query(create_date_table)
    execute_query(create_setting_table)