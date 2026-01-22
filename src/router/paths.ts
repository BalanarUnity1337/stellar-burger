export const RouterPaths = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  profileOrders: '/profile/orders',
  profileOrderPage: '/profile/orders/:id',
  ingredientPage: '/ingredients/:id',
  feed: '/feed',
  feedOrderPage: '/feed/:id',
  notFound: '*',
};

export const createIngredientPageRoute = (id: string): string =>
  RouterPaths.ingredientPage.replace(':id', id);

export const createFeedOrderPageRoute = (orderNumber: string | number): string =>
  RouterPaths.feedOrderPage.replace(':id', String(orderNumber));

export const createProfileOrderPageRoute = (orderNumber: string | number): string =>
  RouterPaths.profileOrderPage.replace(':id', String(orderNumber));
