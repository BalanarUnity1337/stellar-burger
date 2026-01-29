import { createChunks } from '@shared/utils/createChunks.ts';
import { describe, expect, test } from 'vitest';

describe('Test createChunks utility', () => {
  test('Все чанки заполнены', () => {
    const elements = new Array<number>(20).fill(0);
    const result = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    expect(createChunks(elements, 5)).toEqual(result);
  });

  test('Последний чанк может быть неполным', () => {
    const elements = new Array<number>(13).fill(0);
    const result = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0]];

    expect(createChunks(elements, 3)).toEqual(result);
  });

  test('Размер чанка может превышать размер начального массива', () => {
    const elements = new Array<number>(5).fill(0);
    const result = [[0, 0, 0, 0, 0]];

    expect(createChunks(elements, 8)).toEqual(result);
  });

  test('Пустой массив возвращает пустой одномерный массив', () => {
    const elements: number[] = [];
    const result: number[] = [];

    expect(createChunks(elements, 10)).toEqual(result);
  });

  test('Передача size <= 0 выбрасывает исключение', () => {
    const elements = new Array<number>(8).fill(0);

    expect(() => createChunks(elements, 0)).toThrowError(
      new Error('Chunk size must be greater than 0')
    );
  });
});
