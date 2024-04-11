// function middleWareForDate(req, res, next) {
//     const year = req.query.year;
  
//     // cehck the year are valid or not
//     function isValidYear(year) {
//       year = parseInt(year);
  
//       if (isNaN(year)) {
//         return false;
//       }
//       if (!Number.isInteger(year)) {
//         return false;
//       }
//       const minYear = 1000;
//       const maxYear = 9999;
//       if (year < minYear || year > maxYear) {
//         return false;
//       }
//       return true; // Return true if the year is valid
//     }
  
//     if (!isValidYear(year)) {
//       return res
//         .status(400)
//         .json({ error: "Invalid year. Please provide a valid year." });
//     }
  
//     const month = req.query.month;
  
//     // Check if the month is valid
//     function isValidMonth(month) {
//       const months = [
//         "January", "February", "March", "April",
//         "May", "June", "July", "August",
//         "September", "October", "November", "December"
//       ];
//       const lowercaseMonth = month.toLowerCase();
//       return months.some(validMonth => validMonth.toLowerCase() === lowercaseMonth);
//     }
    
//     if (!isValidMonth(month)) {
//       return res.status(400).json({ error: "Invalid month. Please enter a valid month" });
//     }  
  
//     const day = req.query.day;
//     function isValidDay(day) {
//       return day >= 1 && day <=31;
//     }
//     if(!isValidDay(day)) {
//       return res.status(400).json({ error: "Invalid day. Please enter a day between 1 and 31" });
//     }
  
//     next();
//   }