import { THabit } from '@/types/habit';
import getHeaders from '@/utils/getHeaders';

const baseUrl = `${process.env.apiPath}/habits`;

export const getHabitsFetch = async (
  id: number | string = ''
): Promise<{ data: THabit[] }> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  return response.json();
};

export const createHabitsFetch = async (
  body: Omit<THabit, 'id'>
): Promise<{ data: THabit }> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  return response.json();
};

export const updateHabitsFetch = async (
  id: string | number,
  body: Partial<THabit>
): Promise<{ data: Partial<THabit> }> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  return response.json();
};

export const deleteHabitFetch = async (
  id: number | string
): Promise<{ data: THabit[] }> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  return response.json();
};
