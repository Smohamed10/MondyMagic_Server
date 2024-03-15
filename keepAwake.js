// keepAwake.js
const cron = require('cron');
const https = require('https');
const backend_url='https://mondy-magic-server.onrender.com';
const job= new cron.CronJob('*/14 * * * *',function(){
console.log('restarting server...')
https.get(backend_url,(res)=>{
  if(res.statusCode===200){
    console.log('server restarted');
  }else{
    console.error(`failed to restatrt the server with code: ${res.statusCode}`
    );
  }
})
.on('error',(err)=>{
console.error(`error during restart server with status code : ${res.statusCode}`);
});
});

module.exports={
  job,
};