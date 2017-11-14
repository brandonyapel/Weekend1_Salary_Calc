var express = require('express');

var app = express();//app is what is returned when we call express as a function

console.log(express);

app.use(express.static('server/public'));

app.listen( 5000,function(){
    console.log('listening on port 5000')
});
