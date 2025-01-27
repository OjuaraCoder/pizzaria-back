import { Router, Request, Response } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddOrderItemController } from './controllers/order/AddOrderItemController';
import { RemoveOrdemItemController } from './controllers/order/RemoveOrdemItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();
// rotas user
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// rotas category
router.post('/category',isAuthenticated, new CreateCategoryController().handle);
router.get('/category',isAuthenticated, new ListCategoryController().handle);

//rotas product
//router.post('/product',isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.post('/product',isAuthenticated, new CreateProductController().handle);
router.get('/category/product',isAuthenticated, new ListByCategoryController().handle);

//rotas order
router.post('/order',isAuthenticated, new CreateOrderController().handle);
router.delete('/order',isAuthenticated, new RemoveOrderController().handle);

//rotas order item
router.post('/order/add',isAuthenticated, new AddOrderItemController().handle);
router.put('/order/send',isAuthenticated, new SendOrderController().handle);
router.delete('/order/remove',isAuthenticated, new RemoveOrdemItemController().handle);

router.get('/orders', isAuthenticated, new ListOrderController().handle );
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle );
router.put('/order/finish',isAuthenticated, new FinishOrderController().handle);

export {router};