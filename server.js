//server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//timestamp api endpoint wihout param
app.get("/api/timestamp", (req,res)=>{
  let now = new Date();
  res.json({
      "unix": now.getTime(),
      "utc": now.toUTCString()
  })
})
//timestamp api endpoint with date_string param
app.get("/api/timestamp/:date_string", (req,res)=>{
  let urldate= req.params.date_string;

//for unix date format
  if(urldate>10000){
    let unixTime=new Date(parseInt(urldate));
      res.json({
      "unix": unixTime.getTime(),
      "utc": unixTime.toUTCString()
    })
  }
  let datestring = new Date(urldate);
  if (datestring=="Invalid Date"){
    res.json({"error":"invalid date"}) 
  }else{
    res.json({
      "unix": datestring.getTime(),
      "utc": datestring.toUTCString()
    })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
