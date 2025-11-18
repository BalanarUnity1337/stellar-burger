export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TConstructorIngredient = {
  _id: string;
  type: TIngredientType;
  name: string;
  price: number;
  image: string;
  uid: string;
};

export type TApiResponse<T> = {
  data: T;
  success: boolean;
};

export type BurgerConstructorDnDType = 'ingredient' | 'bun';
