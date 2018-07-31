const app     = require('../app'),
      numCpus = require('os').cpus().length,
      cluster = require('cluster'),
      porta   = 3000;

if(cluster.isMaster){
    for(let i = 0; i < numCpus; i++){
        let worker = cluster.fork();
    }
}
else{
    app.listen(porta, () => console.log(`Server UP ${new Date} na porta ${porta}`));
}
