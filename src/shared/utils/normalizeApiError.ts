import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type TNormalizedApiError = {
  isError: boolean;
  status: number | null;
  message: string | null;
};

const isFBQError = (error: unknown): error is FetchBaseQueryError =>
  error !== null && typeof error === 'object' && 'status' in error;

const isSerializedError = (error: unknown): error is SerializedError =>
  error !== null && typeof error === 'object' && 'message' in error;

export const normalizeApiError = (error: unknown): TNormalizedApiError => {
  if (error == null) {
    return {
      isError: false,
      status: null,
      message: null,
    };
  }

  if (isFBQError(error)) {
    return {
      isError: true,
      status: typeof error.status === 'number' ? error.status : null,
      message: (error.data as { message?: string }).message ?? 'Ошибка сервера',
    };
  }

  if (isSerializedError(error)) {
    return {
      isError: true,
      status: null,
      message: error.message ?? 'Неизвестная ошибка',
    };
  }

  return {
    isError: true,
    status: null,
    message: 'Неизвестная ошибка',
  };
};
