import { userController } from './controller';
require('dotenv').config();
import { app } from './app';
import { router } from './router';
const PORT = process.env.PORT || 3000;

const server = app._createServer();

const HOST = '127.0.0.1';

server.listen(PORT, () => console.log(`Server is started on PORT: ${PORT}`));

router.get('/api/users', userController.getUsers);

router.post('/api/users', userController.postUser);

router.put('/api/users', userController.putUser);

router.delete('/api/users', userController.deleteUser);



