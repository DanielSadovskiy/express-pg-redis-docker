import searchRoutes from './search/routes';
import authRoutes from './auth/routes';
import homeRoutes from './home/routes';

export default [...searchRoutes, ...authRoutes, ...homeRoutes];
