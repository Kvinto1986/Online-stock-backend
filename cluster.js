const cluster = require('cluster');
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
    const cpusCnt = os.cpus().length;
    console.log(`CPUs: ${cpusCnt}`);
    console.log(`master started. Pid: ${pid}`);
    for (let i = 0; i < cpusCnt - 1; i++) {
        const worker = cluster.fork();
        cluster.on(`exit`, (worker) => {
            console.log(`worker died: ${worker.process.pid}`);
            cluster.fork();
        })
    }
}

if (cluster.isWorker) {
    require(`./index.js`);
}
