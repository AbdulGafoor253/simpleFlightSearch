var express = require('express');
var app = express();
var fs = require("fs");


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/list', function (req, res) {
   fs.readFile( __dirname + "/" + "flight-sample.json", 'utf8', function (err, data) {
       var response = [];
      
       data = JSON.parse( data );
       data.forEach(element => {
         var jsonDate = element.departure;
         var array = jsonDate.split("T"); 
       
           if(req.query.flightNumber != "" && req.query.flightNumber == element.flightNumber && req.query.departure == array[0]){
               response.push(element);
           } 
           else if(req.query.origin != "" && req.query.destination != "" 
                    && req.query.origin == element.origin && req.query.destination == element.destination
                    && req.query.departure == array[0]){
                        response.push(element);        
           } 
       });
      console.log( response );
      res.end( JSON.stringify(response) );
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})