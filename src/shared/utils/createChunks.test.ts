import { createChunks } from '@shared/utils/createChunks.ts';
import { describe, expect, test } from 'vitest';

describe('Test createChunks utility', () => {
  test('Все чанки заполнены', () => {
    const elements = new Array<number>(20).fill(0);
    const expected = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    expect(createChunks(elements, 5)).toEqual(expected);
  });

  test('Последний чанк может быть неполным', () => {
    const elements = new Array<number>(13).fill(0);
    const expected = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0]];

    expect(createChunks(elements, 3)).toEqual(expected);
  });

  test('Размер чанка может превышать размер начального массива', () => {
    const elements = new Array<number>(5).fill(0);
    const expected = [[0, 0, 0, 0, 0]];

    expect(createChunks(elements, 8)).toEqual(expected);
  });

  test('Пустой массив возвращает пустой одномерный массив', () => {
    const elements: number[] = [];
    const expected: number[] = [];

    expect(createChunks(elements, 10)).toEqual(expected);
  });

  test('Передача size <= 0 выбрасывает исключение', () => {
    const elements = new Array<number>(8).fill(0);

    expect(() => createChunks(elements, 0)).toThrowError(
      new Error('Chunk size must be greater than 0')
    );
  });
});
