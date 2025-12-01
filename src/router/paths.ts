export const RouterPaths = {
  index: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  ingredientPage: '/ingredients/:id',
  notFound: '*',
};

export const createIngredientPageRoute = (id: string): string =>
  RouterPaths.ingredientPage.replace(':id', id);
