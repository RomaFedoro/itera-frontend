import {UpdateHabitRequestType} from '@/validators/habit';

export default defineAuthenticatedEventHandler(async (event, userId) => {
  const id = event?.context?.params?.id;

  if (!id)
    throw BadRequestException();

  const payload = await readBody<UpdateHabitRequestType>(event);

  const validator = await validate(updateHabitRequest, payload);

  if (!validator.valid)
    throw ValidationException();

  await updateHabit(userId, parseInt(id), validator.data);

  return response(validator.data);
});
