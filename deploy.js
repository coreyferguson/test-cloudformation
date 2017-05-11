
const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2'
});

const cloudFormationTemplate =
  fs.readFileSync('./cloudformation-template.yml').toString();

const cloudformation = new AWS.CloudFormation();

cloudformation.createStack({
  StackName: 'test-cloudformation',
  TemplateBody: cloudFormationTemplate,
  Capabilities: [ 'CAPABILITY_NAMED_IAM' ]
}, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});
