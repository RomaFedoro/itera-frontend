import getHeaders from '@/utils/getHeaders';
import {
  TCompletedSteps,
  TCompletedStepsRequest,
  TTodayHabitResponse,
} from '@/types/history';

const baseUrl = `${process.env.apiPath}/history`;

export const todayHabitFetch = async (): Promise<TTodayHabitResponse> => {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: getHeaders(),
  });

  return response.json();
};

export const updateCompletedStepsFetch = async ({
  id,
  completedSteps,
}: TCompletedStepsRequest): Promise<{
  data: TCompletedSteps;
}> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ completedSteps }),
  });

  return response.json();
};
