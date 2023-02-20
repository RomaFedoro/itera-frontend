export default defineAuthenticatedEventHandler(async (event, userId) => {
  const id = event?.context?.params?.id;

  if (!id)
    throw BadRequestException();

  const query = getQuery(event);

  const validator = await validate(historyRequestQuery, query);

  if (!validator.valid)
    throw BadRequestException();

  const interval = [
    validator.data.startDate ?? today(),
    validator.data.endDate ?? today(),
  ];

  return response(await getAllHistoryByHabit(userId, parseInt(id), interval));
});
