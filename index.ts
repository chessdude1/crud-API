import { userController } from './controller';
require('dotenv').config();
import { app } from "./app";
import { router } from "./router";
const PORT = process.env.PORT || 3000;

const server = app._createServer()

server.listen(PORT, () => console.log(`Server is started on PORT: ${PORT}`))

router.get('/api/users', userController.getUsers)
