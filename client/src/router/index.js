import Today from "../pages/Today";
import AllHabits from "../pages/AllHabits";
import Habit from "../pages/Habit";
import EditHabit from "../pages/EditHabit";
import CreateHabit from "../pages/CreateHabit";
import {
  ALL_HABITS_PATH,
  HABIT_PATH,
  TODAY_PATH,
  EDIT_HABIT_PATH,
  CREATE_HABIT_PATH,
} from "../utils/const";

export const routes = [
  { path: TODAY_PATH, component: <Today /> },
  { path: ALL_HABITS_PATH, component: <AllHabits /> },
  { path: HABIT_PATH, component: <Habit /> },
  { path: EDIT_HABIT_PATH, component: <EditHabit /> },
  { path: CREATE_HABIT_PATH, component: <CreateHabit /> },
];
