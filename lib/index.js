import Unsplash from 'unsplash-js';

var {applicationId, secret} = require('../config.json');

const unsplash = new Unsplash({
  applicationId: applicationId,
  secret: secret,
});

console.log(applicationId, secret)