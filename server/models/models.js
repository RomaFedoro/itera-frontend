const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Habit = sequelize.define("habit", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  color: { type: DataTypes.INTEGER },
  step: { type: DataTypes.INTEGER },
  repear: { type: DataTypes.INTEGER },
  units: { type: DataTypes.STRING },
  daysweek: { type: DataTypes.JSON },
  is_reminding: { type: DataTypes.BOOLEAN },
});

const UsersHabits = sequelize.define("users_habits", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER },
  habit_id: { type: DataTypes.INTEGER },
});

const History = sequelize.define("history", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  habit_id: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATEONLY },
  done: { type: DataTypes.INTEGER },
  total: { type: DataTypes.INTEGER },
});

User.hasMany(UsersHabits);
UsersHabits.belongsTo(User);

Habit.hasMany(UsersHabits);
UsersHabits.belongsTo(Habit);

Habit.hasMany(History);
History.belongsTo(Habit);

module.exports = {
  User,
  Habit,
  UsersHabits,
  History,
};
