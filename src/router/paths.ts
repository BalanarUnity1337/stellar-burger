export const RouterPaths = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  orders: '/profile/orders',
  ingredientPage: '/ingredients/:id',
  feed: '/feed',
  feedOrderPage: '/feed/:id',
  notFound: '*',
};

export const createIngredientPageRoute = (id: string): string =>
  RouterPaths.ingredientPage.replace(':id', id);

export const createFeedOrderPageRoute = (id: string | number): string =>
  RouterPaths.feedOrderPage.replace(':id', String(id));
