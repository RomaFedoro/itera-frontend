import {UpdateHistoryRequestType} from '@/validators/history';

export default defineAuthenticatedEventHandler(async (event, userId) => {
  const id = event?.context?.params?.id;

  if (!id)
    throw BadRequestException();

  const payload = await readBody<UpdateHistoryRequestType>(event);

  const validator = await validate(updateHistoryRequest, payload);

  if (!validator.valid)
    throw ValidationException();

  await updateHistory(userId, parseInt(id), validator.data);

  return response(validator.data);
});
