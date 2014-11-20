// pattern tester
var fs = require('fs');
var patterns = JSON.parse(fs.readFileSync('patterns.json', 'utf8'));
console.dir(patterns);
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
var prompt = 'Enter a URI to match: ';
rl.setPrompt(prompt);
rl.prompt();

rl.on('line', function(uri) {
  console.log('Checking: "'+uri + '" against patterns');
  var numFound = 0;
  for (var ii = 0; ii < patterns.length; ii++) {
    var pat = patterns[ii];
    if (uri.match(pat.pattern)) {
      numFound++;
      console.log('Matched pattern "'  + pat.name + '" type: '+pat.type);
    }
  }
  if (numFound == 0) {
    console.log('No matches');
  } else {
    if (numFound == 1) {
      console.log('Found ' + numFound + ' match');      
    } else {
      console.log('Found ' + numFound + ' matches');
    }
  }
  rl.prompt();
  
});

