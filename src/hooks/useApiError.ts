import { normalizeApiError } from '@shared/utils/';

export const useApiError = (error: unknown): ReturnType<typeof normalizeApiError> =>
  normalizeApiError(error);
