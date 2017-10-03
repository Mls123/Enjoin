import {
  createRouter,
} from '@exponent/ex-navigation';

import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';
import Authentication from './screens/Authentication';

const AppRouter = createRouter(() => ({
  productList: () => ProductList,
  productDetails: () => ProductDetails,
  authentication: () => Authentication,
}));

export default AppRouter;