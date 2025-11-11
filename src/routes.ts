import { Router } from 'express';
import authRoute from './app/modules/auth/auth.route';
import userRoute from './app/modules/user/user.route';
import productsRoute from './app/modules/products/products.route';
import testRoute from './app/modules/test/test.route';


const appRouter = Router();

const moduleRoutes = [
    { path: "/test", route: testRoute },
    { path: "/products", route: productsRoute },
    { path: '/auth', route: authRoute },
    { path: "/user", route: userRoute }


];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
export default appRouter;