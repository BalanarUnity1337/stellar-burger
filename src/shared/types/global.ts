export type TAccessToken = string;
export type TRefreshToken = string;

export type TMoveElementPayload = {
  dragIndex: number;
  hoverIndex: number;
};

export type TEndMoveElementPayload = {
  dragItemId: string;
  targetIndex: number;
};

export type BurgerConstructorDnDType = 'ingredient' | 'bun';
