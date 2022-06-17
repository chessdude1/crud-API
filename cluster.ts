import {cpus} from 'os';
let cluster = require('cluster');

if (cluster.isWorker) {
  console.log(
    `Worker ${cluster.worker.id} handle request`
  );
}


if (cluster.isMaster) {
  const cpusCount = cpus().length;

  for (let i = 0; i < cpusCount; i++) cluster.fork();
}

if (cluster.isWorker) {
  require('./index')
}
  