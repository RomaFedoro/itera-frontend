from datetime import date, timedelta
from random import randint
from engine import *

first_date = date(2022, 3, 24)
duration = timedelta(days=300)

for d in range(duration.days + 1):
    res = {
        'habit_id': 2,
        'date': str(first_date - timedelta(days=d)),
        'done_step': randint(0, 10),
        'total_step': 10
    }
    add_note('date_habits', dumps(res))
