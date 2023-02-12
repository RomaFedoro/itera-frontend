import {StoreHabitRequestType} from '@/validators/habit';

export default defineAuthenticatedEventHandler(async (event, userId) => {
  const payload = await readBody<StoreHabitRequestType>(event);

  const validator = await validate(storeHabitRequest, payload);

  if (!validator.valid)
    throw ValidationException();

  const habit = await storeHabit(userId, validator.data);

  return response(habit);
});
