import sqlite3, datetime

connection = sqlite3.connect("habits.db")

create_habits_table = """
CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    description TEXT, 
    color INTEGER,
    days_week TEXT,
    step INTEGER,
    repeat INTEGER,
    units TEXT,
    remind INTEGER,
    date_creation TEXT,
    date_check TEXT
);
"""

add_habit = """
INSERT INTO
  habits (name, description, color, days_week, step, repeat, units, remind, date_creation, date_check)
VALUES
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
"""

create_date_table = """
CREATE TABLE IF NOT EXISTS date_habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    habit_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    done_step INTEGER,
    total_step INTEGER
);
"""

add_date = """
INSERT INTO
  date_habits (habit_id, date, done_step, total_step)
VALUES
  (?, ?, ?, ?);
"""

create_setting_table = """
CREATE TABLE IF NOT EXISTS setting (
    last_call TEXT
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
    return cursor.fetchall()


def create_habit(values):
    execute_query(add_habit, values)


def create_date_habit(values):
    execute_query(add_date, values)


def get_all_notes(name_table):
    select_all = "SELECT * from {}".format(name_table)
    return execute_read_query(select_all)


execute_query(create_habits_table)
execute_query(create_date_table)
execute_query(create_setting_table)

