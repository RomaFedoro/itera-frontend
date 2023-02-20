export default defineAuthenticatedEventHandler(async (event, userId) => {
  const id = event?.context?.params?.id;

  if (!id)
    throw BadRequestException();

  await deleteHabit(userId, parseInt(id));

  return null;
});
