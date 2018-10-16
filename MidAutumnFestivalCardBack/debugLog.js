const debug = false;
const opts = {
  errorEventName:'error',
      logDirectory:'./mylogfiles', // NOTE: folder must exist and be writable...
      fileNamePattern:'roll-<DATE>.log',
      dateFormat:'YYYY.MM.DD'
};
const logger = require('simple-node-logger').createRollingFileLogger(opts);
logger.setLevel('debug');

module.exports ={
  debug,
  d: function(fileName, method, message){
    if(debug){
      logger.debug(fileName,' ', method,' ', message,' ', new Date().toJSON());
    }
  },
  i: function(fileName, method, message){
    logger.info(fileName,' ', method,' ', message,' ', new Date().toJSON());
  },
  w: function(fileName, method, message){
    logger.warn(fileName,' ', method,' ', message,' ', new Date().toJSON());
  },
};