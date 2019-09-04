import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import MeetapController from './app/controllers/MeetapController';
import SubscriptionController from './app/controllers/SubscriptionController';
import OrganizingController from './app/controllers/OrganizingController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.get('/meetap', MeetapController.index);
routes.post('/meetap', MeetapController.store);
routes.put('/meetap/:id', MeetapController.update);
routes.delete('/meetap/:id/destroy', MeetapController.delete);

routes.get('/organizing', OrganizingController.index);
routes.get('/subscriptions', SubscriptionController.index);

routes.post('/subscriptions/:idMeetup/meetups', SubscriptionController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
