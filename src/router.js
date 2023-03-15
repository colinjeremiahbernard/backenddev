import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import SessionController from
 './controllers/SessionController'
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardControllers';

 const routes = new Router();
 const upload = multer(uploadConfig);

 routes.post('/sessions', SessionController.store);
 routes.post('/houses', upload.single('thumbnail'),
 HouseController.store);
 routes.get('/houses', HouseController.index);
 routes.put('/houses/:house_id', upload.single
 ('thumbnail'), HouseController.update);
 routes.delete('/houses/:house_id', HouseController.destroy);
 routes.get('/dashboard', DashboardController.show );

 export default routes;