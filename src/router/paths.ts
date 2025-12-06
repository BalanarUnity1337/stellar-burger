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
  notFound: '*',
};

export const createIngredientPageRoute = (id: string): string =>
  RouterPaths.ingredientPage.replace(':id', id);
