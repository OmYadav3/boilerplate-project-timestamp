var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

//Middleware for date validations
function validateDate(req, res, next) {
  const { date } = req.params;

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format. Please provide a valid date." });
  }

  req.parsedDate = parsedDate;
  next();
}

// Route handler for Unix timestamp and UTC 
app.get("/api/:date", validateDate, function (req, res) {
  const { parsedDate } = req;

  // Calculate Unix timestamp
  const unixTimestamp = parsedDate.getTime();

  // Format the date as UTC string
  const utcString = parsedDate.toUTCString();

  // Send both the Unix timestamp and the UTC string as a response
  res.json({ unix: unixTimestamp, utc: utcString });
});


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
