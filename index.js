var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Middleware function to validate timestamp parameter
function validateTimestamp(req, res, next) {
  const { timestamp } = req.params;

  // Parse the timestamp
  const parsedTimestamp = parseInt(timestamp);

  // Check if the parsed timestamp is a valid number
  if (isNaN(parsedTimestamp)) {
    return res.status(400).json({ error: "Invalid timestamp format. Please provide a valid timestamp." });
  }

  // Attach the parsed timestamp to the request object
  req.parsedValue = parsedTimestamp;

  // Move to the next middleware
  next();
}

// Middleware function to validate date parameter
function validateDate(req, res, next) {
  const { date } = req.params;

  if (!date) {
    // If date parameter is empty, use current time
    req.parsedValue = new Date();
    return next();
  }

  // Parse the date string
  const parsedDate = new Date(date);

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "Invalid date" });
  }

  // Attach the parsed date to the request object
  req.parsedValue = parsedDate;

  // Move to the next middleware
  next();
}

// app.use(validateTimestamp);
// app.use(validateDate);


// Route handler for /api:date
app.get("/api/:date", validateDate, function (req, res) {
  const { parsedValue } = req;

  // Calculate Unix timestamp
  const unixTimestamp = parsedValue.getTime();

  // Format the date as UTC string
  const utcString = parsedValue.toUTCString();

  // Send both the Unix timestamp and the UTC string as a response
  res.json({ unix: unixTimestamp, utc: utcString });
});

// Route handler for /api:timestamp
app.get("/api/:date",validateTimestamp, (req, res)  => {
  const { parsedValue } = req;

  // Calculate Unix timestamp
  const unixTimestamp = parsedValue;

  // Format the timestamp as a UTC string
  const utcString = new Date(parsedValue).toUTCString();

  // Send both the Unix timestamp and the UTC string as a response
  res.json({ unix: unixTimestamp, utc: utcString });
});

// Error handling middleware for invalid date or timestamp
app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Invalid date or timestamp format. Please provide a valid date or timestamp." });
  }
  next();
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
