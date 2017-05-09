
const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2'
});

const cloudFormationTemplate = fs.readFileSync('./cloudformation-template.yml').toString();
console.log('cloudFormationTemplate:', cloudFormationTemplate);

const cloudformation = new AWS.CloudFormation();

cloudformation.createStack({
  StackName: 'test-cloudformation',
  TemplateBody: cloudFormationTemplate
}, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});
