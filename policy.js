
const fs = require('fs');
const AWS = require('aws-sdk');
const yaml = require('js-yaml');

AWS.config.update({
  region: 'us-west-2'
});

var iam = new AWS.IAM({apiVersion: '2010-05-08'});

let policy;
try {
  policy = yaml.safeLoad(fs.readFileSync('policy.yml', 'utf8'));
} catch (error) {
  console.error('error:', error);
}

iam.createPolicy({
  PolicyDocument: JSON.stringify(policy),
  PolicyName: 'test-policy',
}, function(err, data) {
  if (err) {
    throw err;
  } else {
    console.log("New Policy: ", data);
  }
});

