var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));


// Middleware to handle date requests
// app.get('/api/:date', (req, res) => {
//   // Extract date from request parameter
//   const dateString = req.params.date;

//   // Parse the date string
//   const date = new Date(dateString);

//   // Check if the date is valid
//   if (!isNaN(date.getTime())) {
//     // Convert the date to Unix timestamp in milliseconds
//     const unixTimestamp = date.getTime();

//     // Return JSON response with Unix timestamp
//     return res.json({ unix: unixTimestamp });
//   } else {
//     // If the date is invalid, return an error response
//     return res.status(400).json({ error: 'Invalid date. Please provide a valid date.' });
//   }
// });
function validateDate(req, res, next) {
  const { date } = req.params;

  // Parse the date
  const parsedDate = new Date(date);

  // Validate if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format. Please provide a valid date." });
  }

  // Attach the parsed date to the request object
  req.parsedDate = parsedDate;

  // Move to the next middleware
  next();
}

// Route handler for Unix timestamp
app.get("/api/:date", validateDate, function (req, res) {
  const { parsedDate } = req;

  // Get the Unix timestamp in milliseconds
  const unixTimestamp = parsedDate.getTime();

  // Send the Unix timestamp as a response
  res.json({ unix: unixTimestamp });
});

// Route handler for UTC format
app.get("/api", function (req, res) {
  const { date } = req.query;

  // Parse the date
  const parsedDate = new Date(date);

  // Validate if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format. Please provide a valid date." });
  }

  // Format the date as UTC string
  const utcString = parsedDate.toUTCString();

  // Send the UTC string as a response
  res.json({ utc: utcString });
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
