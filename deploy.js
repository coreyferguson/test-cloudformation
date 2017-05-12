
const fs = require('fs');
const AWS = require('aws-sdk');
const yaml = require('js-yaml');

AWS.config.update({
  region: 'us-west-2'
});

// stack policy
let policy;
try {
  policy = yaml.safeLoad(fs.readFileSync('policy.yml', 'utf8'));
} catch (error) {
  console.error('error:', error);
}

// create stack
const cloudFormationTemplate =
  fs.readFileSync('./cloudformation-template.yml').toString();
const cloudformation = new AWS.CloudFormation();
cloudformation.createStack({
  StackName: 'test-cloudformation',
  TemplateBody: cloudFormationTemplate,
  Capabilities: [ 'CAPABILITY_NAMED_IAM' ],
  StackPolicyBody: JSON.stringify(policy)
}, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});
