var express = require('express');

var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
//for html file

//app.use('/static', express.static('public'))
//add the file "/static/filenametoopenß"
// Place the static resources under 'public' sub-directory from this directory
 

var server = app.listen(5000);

console.log('HTTP Server running at http://localhost:5000/');