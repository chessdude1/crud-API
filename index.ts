require('dotenv').config();
import http from 'http'
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.end('Сервер выключен')
})

server.listen(PORT, () => console.log(`Server is started on PORT: ${PORT}`))
