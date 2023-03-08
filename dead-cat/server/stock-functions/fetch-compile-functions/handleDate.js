async function handleDate(obj) {
    /// obj.DATE REFERENCE FOR MARKET DATA PULLS ----------------------------------------
    obj.today = new Date();
    obj.year = obj.today.getFullYear();
    obj.date = obj.today.getUTCDate();
    obj.month = obj.today.getUTCMonth() + 1;
    obj.minutes = obj.today.getUTCMinutes();
    obj.hour = obj.today.getUTCHours();
    // GET TIME FOR CLOSING AND OPENING MARKET -----------------------------------
    
    //CALC FOR UTC TO EST
    obj.hour = obj.hour - 4;
    // CALC FOR EARLY MORNING obj.HOURS UTC
    if (obj.hour < 0) {
      obj.hour = obj.hour + 24;
    }
    
    // GET AND ADJUST obj.MINUTES TO ADD 0 BELOW 10
    if (obj.minutes < 10) {
      obj.minutes = `0${obj.minutes}`;
    }
    obj.time = `${obj.hour}${obj.minutes}`;
    obj.timeNum = parseInt(obj.time);
    
    // GET DAY FOR CLOSING AND OPENING MARKET -------------------------------------------
    obj.marketDay = obj.today.getDay();
    // CHECK FOR MARKET OPEN - ADJUST obj.DATE SO VWAP STILL PULLS DATA FROM LAST DAY
    if (obj.marketDay == 0) {
      obj.date = obj.date - 2;
      // NEED TO CHECK FOR NEW obj.MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
      if (obj.date <= 0) {
        if (
          obj.month == 1 ||
          obj.month == 2 ||
          obj.month == 4 ||
          obj.month == 6 ||
          obj.month == 8 ||
          obj.month == 9 ||
          obj.month == 11
        ) {
          // obj.MONTHS AFTER 31 DAYS
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 30;
        } else if (obj.month == 5 || obj.month == 7 || obj.month == 10 || obj.month == 12) {
          // obj.MONTHS AFTER 30 DAYS
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 29;
        } else if (obj.month == 3 && obj.year % 4 == 0) {
          // obj.MONTH AFTER 29 DAYS LEAP obj.YEAR
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 28;
        } // obj.MONTH AFTER 28
        else {
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 27;
        }
      }
    } else if (obj.marketDay == 6) {
      obj.date = obj.date - 1;
      // NEED TO CHECK FOR NEW obj.MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
      if (obj.date <= 0) {
        if (
          obj.month == 1 ||
          obj.month == 2 ||
          obj.month == 4 ||
          obj.month == 6 ||
          obj.month == 8 ||
          obj.month == 9 ||
          obj.month == 11
        ) {
          // obj.MONTHS AFTER 31 DAYS
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 31;
        } else if (obj.month == 5 || obj.month == 7 || obj.month == 10 || obj.month == 12) {
          // obj.MONTHS AFTER 30 DAYS
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 30;
        } else if (obj.month == 3 && obj.year % 4 == 0) {
          // obj.MONTH AFTER 29 DAYS LEAP obj.YEAR
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 29;
        } // obj.MONTH AFTER 28
        else {
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 28;
        }
      }
    }
    // THIS IS TO CHECK FOR MARKET DAY OPEN DURING WEEKENDS WHEN MARKET IS CLOSED
    if (obj.marketDay == 1 && obj.timeNum < 930) {
      obj.date = obj.date - 3;
      // NEED TO CHECK FOR NEW obj.MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
      if (obj.date <= 0) {
        if (
          obj.month == 1 ||
          obj.month == 2 ||
          obj.month == 4 ||
          obj.month == 6 ||
          obj.month == 8 ||
          obj.month == 9 ||
          obj.month == 11
        ) {
          // obj.MONTHS AFTER 31 DAYS
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 29;
        } else if (obj.month == 5 || obj.month == 7 || obj.month == 10 || obj.month == 12) {
          // obj.MONTHS AFTER 30 DAYS
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 28;
        } else if (obj.month == 3 && obj.year % 4 == 0) {
          // obj.MONTH AFTER 29 DAYS LEAP obj.YEAR
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 27;
        } // obj.MONTH AFTER 28
        else {
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 26;
        }
      }
    } else if (obj.marketDay >= 2 && obj.marketDay < 6 && obj.timeNum < 930) {
      // ADJUSTS DURING WEEK BEFORE OPEN TO GET DAY BEFORE INDICATORS
      obj.date = obj.date - 1;
      // NEED TO CHECK FOR NEW obj.MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
      if (obj.date <= 0) {
        if (
          obj.month == 1 ||
          obj.month == 2 ||
          obj.month == 4 ||
          obj.month == 6 ||
          obj.month == 8 ||
          obj.month == 9 ||
          obj.month == 11
        ) {
          // obj.MONTHS AFTER 31 DAYS
          obj.month = obj.month - 1;
          if (obj.month == 0) {
            obj.month = 1;
          }
          obj.date = 31;
        } else if (obj.month == 5 || obj.month == 7 || obj.month == 10 || obj.month == 12) {
          // obj.MONTHS AFTER 30 DAYS
          obj.month = obj.month - 1;
          obj.date = 30;
        } else if (obj.month == 3 && obj.year % 4 == 0) {
          // obj.MONTH AFTER 29 DAYS LEAP obj.YEAR
          obj.month = obj.month - 1;
          obj.date = 29;
        } // obj.MONTH AFTER 28
        else {
          obj.month = obj.month - 1;
          obj.date = 28;
        }
      }
    }
    
    // THIS IS TO CORRECT MISSING 0 ON SINGLE DIGITS OF obj.MONTHS
    if (obj.date < 10) {
      obj.date = `0${obj.date}`;
    }
    if (obj.month < 10) {
      obj.month = `0${obj.month}`;
    }
    
    // obj.DATE CHECK VARIBLE FOR DATA PERIOD PULLS AND TO SLICE FROM
    obj.todayDate = `${obj.year}-${obj.month}-${obj.date}`;
    //CHECK FOR HOLIDAYS OR CLOSED MARKET HOLIDAYS
    if (obj.today.Date === "2021-11-25") {
      obj.today.Date = "2021-11-24";
    } else if (obj.today.Date === "2023-02-20") {
      obj.today.Date = "2022-02-17";
    }
    // THIS IS AN ADJUSTMENT OF obj.DATE FOR MARKET CLOSES EST VS UTC TIME
    var newDateString = obj.today.Date;
    
    if (obj.hour + 4 >= 24) {
      const dateNumSlice = parseInt(obj.date);
      const dateSliceStart = obj.todayDate.slice(0, 8);
      obj.newDateNum = obj.dateNumSlice - 1;
      if (obj.newDateNum < 10) {
        obj.newDateNum = `0${obj.newDateNum}`;
      }
      newDateString = `${obj.dateSliceStart}${obj.newDateNum}`;
      newDateString = newDateString.toString();
      // NEED TO CHECK FOR NEW obj.MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
      if (obj.date == 1 && obj.hour + 4 >= 24) {
        if (
          obj.month == 1 ||
          obj.month == 2 ||
          obj.month == 4 ||
          obj.month == 6 ||
          obj.month == 8 ||
          obj.month == 9 ||
          obj.month == 11
        ) {
          // obj.MONTHS AFTER 31 DAYS
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 31;
          newDateString = `${obj.year}-${obj.month}-${obj.date}`;
        } else if (obj.month == 5 || obj.month == 7 || obj.month == 10 || obj.month == 12) {
          // obj.MONTHS AFTER 30 DAYS
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 30;
          newDateString = `${obj.year}-${obj.month}-${obj.date}`;
        } else if (obj.month == 3 && obj.year % 4 == 0) {
          // obj.MONTH AFTER 29 DAYS LEAP obj.YEAR
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 29;
          newDateString = `${obj.year}-${obj.month}-${obj.date}`;
        } // obj.MONTH AFTER 28
        else {
          obj.month = obj.month - 1;
          if (obj.month < 10) {
            obj.month = `0${obj.month}`;
          }
          obj.date = 28;
          newDateString = `${obj.year}-${obj.month}-${obj.date}`;
        }
      }
    }
    // ---------------------- END OF obj.DATE -------------------------------------
return obj;
}    

module.exports = {handleDate}