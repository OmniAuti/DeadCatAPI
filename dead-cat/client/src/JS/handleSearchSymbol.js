// ---------------------- TECHNICAL INDICATOR FUNCTIONS FOR SEARCH SYMBOL ------------------------------------------------------------------------------------
export const searchedSymbolTA = async (symbol) => {
  // CREATE NEW OBJECT TO STORE SYMBOL INFO
  class SearchObj {
    constructor(name) {
      this.symbol = name;
    }
  }
  let symbolObj = new SearchObj(symbol);

// DATE REFERENCE FOR MARKET DATA PULLS ----------------------------------------
  const today = new Date();
  const year = today.getFullYear();
  let date = today.getUTCDate();
  let month = today.getUTCMonth() + 1;
  let minutes = today.getUTCMinutes();
  let hour = today.getUTCHours();
 // GET TIME FOR CLOSING AND OPENING MARKET -----------------------------------

  //CALC FOR UTC TO EST
  hour = hour - 4;
  // CALC FOR EARLY MORNING HOURS UTC
  if (hour < 0) {
    hour = hour + 24;
  }

  // GET AND ADJUST MINUTES TO ADD 0 BELOW 10
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const time = `${hour}${minutes}`;
  const timeNum = parseInt(time);

  // GET DAY FOR CLOSING AND OPENING MARKET -------------------------------------------
  const marketDay = today.getDay();
  // CHECK FOR MARKET OPEN - ADJUST DATE SO VWAP STILL PULLS DATA FROM LAST DAY
  if (marketDay == 0) {
    date = date - 2;
    // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
    if (date <= 0) {
      if (
        month == 1 ||
        month == 2 ||
        month == 4 ||
        month == 6 ||
        month == 8 ||
        month == 9 ||
        month == 11
      ) {
        // MONTHS AFTER 31 DAYS
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 30;
      } else if (month == 5 || month == 7 || month == 10 || month == 12) {
        // MONTHS AFTER 30 DAYS
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 29;
      } else if (month == 3 && year % 4 == 0) {
        // MONTH AFTER 29 DAYS LEAP YEAR
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 28;
      } // MONTH AFTER 28
      else {
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 27;
      }
    }
  } else if (marketDay == 6) {
    date = date - 1;
    // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
    if (date <= 0) {
      if (
        month == 1 ||
        month == 2 ||
        month == 4 ||
        month == 6 ||
        month == 8 ||
        month == 9 ||
        month == 11
      ) {
        // MONTHS AFTER 31 DAYS
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 31;
      } else if (month == 5 || month == 7 || month == 10 || month == 12) {
        // MONTHS AFTER 30 DAYS
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 30;
      } else if (month == 3 && year % 4 == 0) {
        // MONTH AFTER 29 DAYS LEAP YEAR
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 29;
      } // MONTH AFTER 28
      else {
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 28;
      }
    }
  }
  // THIS IS TO CHECK FOR MARKET DAY OPEN DURING WEEKENDS WHEN MARKET IS CLOSED
  if (marketDay == 1 && timeNum < 930) {
    date = date - 3;
    // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
    if (date <= 0) {
      if (
        month == 1 ||
        month == 2 ||
        month == 4 ||
        month == 6 ||
        month == 8 ||
        month == 9 ||
        month == 11
      ) {
        // MONTHS AFTER 31 DAYS
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 29;
      } else if (month == 5 || month == 7 || month == 10 || month == 12) {
        // MONTHS AFTER 30 DAYS
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 28;
      } else if (month == 3 && year % 4 == 0) {
        // MONTH AFTER 29 DAYS LEAP YEAR
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 27;
      } // MONTH AFTER 28
      else {
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 26;
      }
    }
  } else if (marketDay >= 2 && marketDay < 6 && timeNum < 930) {
    // ADJUSTS DURING WEEK BEFORE OPEN TO GET DAY BEFORE INDICATORS
    date = date - 1;
    // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
    if (date <= 0) {
      if (
        month == 1 ||
        month == 2 ||
        month == 4 ||
        month == 6 ||
        month == 8 ||
        month == 9 ||
        month == 11
      ) {
        // MONTHS AFTER 31 DAYS
        month = month - 1;
        if (month == 0) {
          month = 1;
        }
        date = 31;
      } else if (month == 5 || month == 7 || month == 10 || month == 12) {
        // MONTHS AFTER 30 DAYS
        month = month - 1;
        date = 30;
      } else if (month == 3 && year % 4 == 0) {
        // MONTH AFTER 29 DAYS LEAP YEAR
        month = month - 1;
        date = 29;
      } // MONTH AFTER 28
      else {
        month = month - 1;
        date = 28;
      }
    }
  }

  // THIS IS TO CORRECT MISSING 0 ON SINGLE DIGITS OF MONTHS
  if (date < 10) {
    date = `0${date}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  // DATE CHECK VARIBLE FOR DATA PERIOD PULLS AND TO SLICE FROM
  let todayDate = `${year}-${month}-${date}`;
  //CHECK FOR HOLIDAYS OR CLOSED MARKET HOLIDAYS
  if (todayDate === "2021-11-25") {
    todayDate = "2021-11-24";
  } else if (todayDate === "2021-12-24") {
    todayDate = "2021-12-23";
  } else if (todayDate === "2022-01-17") {
    todayDate = "2022-01-14";
  } else if (todayDate === "2022-02-21") {
    todayDate = "2022-02-18";
  } else if (todayDate === "2022-04-15") {
    todayDate = "2022-04-14";
  } else if (todayDate === "2022-05-30") {
    todayDate = "2022-05-27";
  } else if (todayDate === "2022-06-20") {
    todayDate = "2022-06-17";
  } else if (todayDate === "2022-07-04") {
    todayDate = "2022-07-01";
  } else if (todayDate === "2022-09-05") {
    todayDate = "2022-09-02";
  } else if (todayDate === "2022-11-24") {
    todayDate = "2022-11-23";
  } else if (todayDate === "2022-12-26") {
    todayDate = "2022-12-23";
  }
  // THIS IS AN ADJUSTMENT OF DATE FOR MARKET CLOSES EST VS UTC TIME
  let newDateString = todayDate;

  if (hour + 4 >= 24) {
    const dateNumSlice = parseInt(date);
    const dateSliceStart = todayDate.slice(0, 8);
    let newDateNum = dateNumSlice - 1;
    if (newDateNum < 10) {
      newDateNum = `0${newDateNum}`;
    }
    newDateString = `${dateSliceStart}${newDateNum}`;
    newDateString = newDateString.toString();
    // NEED TO CHECK FOR NEW MONTH CHANGE OVER FROM UTC TIME TO ADJUST FOR EST
    if (date == 1 && hour + 4 >= 24) {
      if (
        month == 1 ||
        month == 2 ||
        month == 4 ||
        month == 6 ||
        month == 8 ||
        month == 9 ||
        month == 11
      ) {
        // MONTHS AFTER 31 DAYS
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 31;
        newDateString = `${year}-${month}-${date}`;
      } else if (month == 5 || month == 7 || month == 10 || month == 12) {
        // MONTHS AFTER 30 DAYS
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 30;
        newDateString = `${year}-${month}-${date}`;
      } else if (month == 3 && year % 4 == 0) {
        // MONTH AFTER 29 DAYS LEAP YEAR
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 29;
        newDateString = `${year}-${month}-${date}`;
      } // MONTH AFTER 28
      else {
        month = month - 1;
        if (month < 10) {
          month = `0${month}`;
        }
        date = 28;
        newDateString = `${year}-${month}-${date}`;
      }
    }
  }

// ---------------------- END OF DATE -------------------------------------

// SMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function smaFunction(searchedTicker, dataPull, newestPull) {
    let culSMA = 0;

    // ------- SMA INDEX IS - 2 FROM TOTAL BECAUSE OF 0 INDEX = 1 AND ADDING RECENT PRICE DATA --------------------
    let fiveTeenSMA = 13;
    let twentySMA = 18;
    let thirtySMA = 28;
    let fiftySMA = 48;
    let hunSMA = 98;
    let twoHunSMA = 198;

    const todayPricePull = newestPull[0].price;

    try {
      // ------------- 15 DAY SMA -------------------------------
      if (dataPull.historical.length <= 13) {
        searchedTicker.smaFiveTeen = "No Data";
      } else {
        while (fiveTeenSMA >= 0) {
          culSMA += dataPull.historical[fiveTeenSMA].close;
          fiveTeenSMA--;
        }
        let smaFiveResult = (culSMA + todayPricePull) / 15;
        searchedTicker.smaFiveTeen = smaFiveResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 20 DAY SMA -------------------------------
      if (dataPull.historical.length <= 19) {
        searchedTicker.smaTwenty = "No Data";
      } else {
        while (twentySMA >= 0) {
          culSMA += dataPull.historical[twentySMA].close;
          twentySMA--;
        }
        let smaTwentyResult = (culSMA + todayPricePull) / 20;
        searchedTicker.smaTwenty = smaTwentyResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 30 DAY SMA -------------------------------
      if (dataPull.historical.length <= 29) {
        searchedTicker.smaThirty = "No Data";
      } else {
        while (thirtySMA >= 0) {
          culSMA += dataPull.historical[thirtySMA].close;
          thirtySMA--;
        }
        let smaThirtyResult = (culSMA + todayPricePull) / 30;
        searchedTicker.smaThirty = smaThirtyResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 50 DAY SMA -------------------------------
      if (dataPull.historical.length <= 49) {
        searchedTicker.smaFifty = "No Data";
      } else {
        while (fiftySMA >= 0) {
          culSMA += dataPull.historical[fiftySMA].close;
          fiftySMA--;
        }
        let smaFiftyResult = (culSMA + todayPricePull) / 50;
        searchedTicker.smaFifty = smaFiftyResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 100 DAY SMA -------------------------------
      if (dataPull.historical.length <= 99) {
        searchedTicker.smaOneHun = "No Data";
      } else {
        while (hunSMA >= 0) {
          culSMA += dataPull.historical[hunSMA].close;
          hunSMA--;
        }
        let smaOneHunResult = (culSMA + todayPricePull) / 100;
        searchedTicker.smaOneHun = smaOneHunResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 200 DAY SMA -------------------------------
      if (dataPull.historical.length <= 199) {
        searchedTicker.smaTwoHun = "No Data";
      } else {
        while (twoHunSMA >= 0) {
          culSMA += dataPull.historical[twoHunSMA].close;
          twoHunSMA--;
        }
        let smaTwoHunResult = (culSMA + todayPricePull) / 200;
        searchedTicker.smaTwoHun = smaTwoHunResult.toFixed(2);
        culSMA = 0;
      }
    } catch (e) {}
  }
  // WMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function wmaFunction(searchedTicker, dataPull, newestPull) {
    // WMA FiveTeen --------------------------------------------------------------------
    let wmaCul = newestPull[0].price * 15;
    let weight = 14;
    let wmaInterval = 0;
    let iWma = 15;

    try {
      if (dataPull.historical.length < 14) {
        searchedTicker.wmaFiveTeen = "No Data";
      } else {
        for (let i = 0; i <= 13; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaFiveTeen = wmaCul / iWma;
        searchedTicker.wmaFiveTeen = wmaFiveTeen.toFixed(2);
      }

      // WMA Twenty --------------------------------------------------------------------
      wmaCul = newestPull[0].price * 20;
      weight = 19;
      wmaInterval = 0;
      iWma = 20;

      if (dataPull.historical.length < 19) {
        searchedTicker.wmaTwenty = "No Data";
      } else {
        for (let i = 0; i <= 18; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaTwenty = wmaCul / iWma;
        searchedTicker.wmaTwenty = wmaTwenty.toFixed(2);
      }

      // WMA THIRTY --------------------------------------------------------------------

      wmaCul = newestPull[0].price * 30;
      weight = 29;
      wmaInterval = 0;
      iWma = 30;

      if (dataPull.historical.length < 30) {
        searchedTicker.wmaThirty = "No Data";
      } else {
        for (let i = 0; i <= 28; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaThirty = wmaCul / iWma;
        searchedTicker.wmaThirty = wmaThirty.toFixed(2);
      }

      // WMA FIFTY --------------------------------------------------------------------

      wmaCul = newestPull[0].price * 50;
      weight = 49;
      wmaInterval = 0;
      iWma = 50;

      if (dataPull.historical.length < 50) {
        searchedTicker.wmaFifty = "No Data";
      } else {
        for (let i = 0; i <= 48; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaFifty = wmaCul / iWma;
        searchedTicker.wmaFifty = wmaFifty.toFixed(2);
      }

      // WMA ONE HUNDRED --------------------------------------------------------------------

      wmaCul = newestPull[0].price * 100;
      weight = 99;
      wmaInterval = 0;
      iWma = 100;

      if (dataPull.historical.length < 100) {
        searchedTicker.wmaOneHun = "No Data";
      } else {
        for (let i = 0; i <= 98; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaOneHun = wmaCul / iWma;
        searchedTicker.wmaOneHun = wmaOneHun.toFixed(2);
      }

      // WMA TWO HUNDRED --------------------------------------------------------------------

      wmaCul = newestPull[0].price * 200;
      weight = 199;
      wmaInterval = 0;
      iWma = 200;

      if (dataPull.historical.length < 200) {
        searchedTicker.wmaTwoHun = "No Data";
      } else {
        for (let i = 0; i <= 198; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaTwoHun = wmaCul / iWma;
        searchedTicker.wmaTwoHun = wmaTwoHun.toFixed(2);
      }
    } catch (e) {}
  }
  // VWMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function vwmaFunction(searchedTicker, dataPull, newestPull) {
    // VWMA FIVETEEN --------------------------------------------------------------------

    const newPrice = newestPull[0].price;
    const newVol = newestPull[0].volume;

    let volCul = newestPull[0].volume;
    let totalCul = newPrice * newVol;
    let price = 0;
    let volume = 0;

    try {
      if (dataPull.historical.length < 14) {
        searchedTicker.vwmaFiveTeen = "No Data";
      } else {
        for (let i = 0; i <= 13; i++) {
          price = dataPull.historical[i].close;
          volume = dataPull.historical[i].volume;
          totalCul += price * volume;
          volCul += dataPull.historical[i].volume;
        }
        const vwmaFiveTeen = totalCul / volCul;
        searchedTicker.vwmaFiveTeen = vwmaFiveTeen.toFixed(2);
      }

      // VWMA TWENTY --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 19) {
        searchedTicker.vwmaTwenty = "No Data";
      } else {
        for (let i = 0; i <= 18; i++) {
          price = dataPull.historical[i].close;
          volume = dataPull.historical[i].volume;
          totalCul += price * volume;
          volCul += dataPull.historical[i].volume;
        }
        const vwmaTwenty = totalCul / volCul;
        searchedTicker.vwmaTwenty = vwmaTwenty.toFixed(2);
      }

      // VWMA THIRTY --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 29) {
        searchedTicker.vwmaThirty = "No Data";
      } else {
        for (let i = 0; i <= 28; i++) {
          price = dataPull.historical[i].close;
          volume = dataPull.historical[i].volume;
          totalCul += price * volume;
          volCul += dataPull.historical[i].volume;
        }
        const vwmaThirty = totalCul / volCul;
        searchedTicker.vwmaThirty = vwmaThirty.toFixed(2);
      }

      // VWMA FIFTY --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 49) {
        searchedTicker.vwmaFifty = "No Data";
      } else {
        for (let i = 0; i <= 48; i++) {
          price = dataPull.historical[i].close;
          volume = dataPull.historical[i].volume;
          totalCul += price * volume;
          volCul += dataPull.historical[i].volume;
        }
        const vwmaFifty = totalCul / volCul;
        searchedTicker.vwmaFifty = vwmaFifty.toFixed(2);
      }

      // VWMA ONEHUN --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 99) {
        searchedTicker.vwmaOneHun = "No Data";
      } else {
        for (let i = 0; i <= 98; i++) {
          price = dataPull.historical[i].close;
          volume = dataPull.historical[i].volume;
          totalCul += price * volume;
          volCul += dataPull.historical[i].volume;
        }
        const vwmaOneHun = totalCul / volCul;
        searchedTicker.vwmaOneHun = vwmaOneHun.toFixed(2);
      }

      // VWMA TWOHUN --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 199) {
        searchedTicker.vwmaTwoHun = "No Data";
      } else {
        for (let i = 0; i <= 198; i++) {
          price = dataPull.historical[i].close;
          volume = dataPull.historical[i].volume;
          totalCul += price * volume;
          volCul += dataPull.historical[i].volume;
        }
        const vwmaTwoHun = totalCul / volCul;
        searchedTicker.vwmaTwoHun = vwmaTwoHun.toFixed(2);
      }
    } catch (e) {}
  }
  // EMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function emaFunction(searchedTicker, dataPull, newestPull, macdCallBack) {
    const newPrice = newestPull[0].price;

    let emaEight = 14;
    let emaTwelve = 22;
    let emaTwenty = 38;
    let emaTwentySix = 50;
    let emaFifty = 98;
    let emaTwoHun = 398;
    let prevDayEmaSub = 0;
    let arrEma = [];

    let macdTwelve = []; // ARRs USED FOR MACD TWELVE HISTORY
    let macdTwentySix = []; // ARRs USED FOR MACD TWENTY SIX HISTORY

    try {
      // EMA EIGHT ----------------------------------------------------------------------
      if (dataPull.historical.length <= 16) {
        searchedTicker.emaEight = "No Data";
      } else {
        while (emaEight >= 15) {
          prevDayEmaSub += dataPull.historical[emaEight].close;
          emaEight--;
        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
        const subEMA = prevDayEmaSub / 8;
        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
        const finalSubEma =
          (2 / 9) * (dataPull.historical[emaEight].close - subEMA) + subEMA;
        arrEma.unshift(finalSubEma);
        emaEight--;
        while (emaEight >= 0) {
          let derp =
            (2 / 9) * (dataPull.historical[emaEight].close - arrEma[0]) +
            arrEma[0];
          arrEma.unshift(derp);
          arrEma.pop();
          emaEight--;
        }

        const finalEma = (2 / 9) * (newPrice - arrEma[0]) + arrEma[0];
        arrEma.unshift(finalEma);
        arrEma.pop();

        searchedTicker.emaEight = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }

      // EMA TWELVE ----------------------------------------------------------------------
      if (dataPull.historical.length <= 24) {
        searchedTicker.emaTwelve = "No Data";
      } else {
        while (emaTwelve >= 11) {
          prevDayEmaSub += dataPull.historical[emaTwelve].close;
          emaTwelve--;
        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA

        const subEMA = prevDayEmaSub / 12;
        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
        const finalSubEma =
          (2 / 13) * (dataPull.historical[emaTwelve].close - subEMA) + subEMA;
        arrEma.unshift(finalSubEma);
        emaTwelve--;

        while (emaTwelve >= 0) {
          let derp =
            (2 / 13) * (dataPull.historical[emaTwelve].close - arrEma[0]) +
            arrEma[0];
          arrEma.unshift(derp);
          arrEma.pop();
          if (emaTwelve < 8 && emaTwelve >= 0) {
            //THIS IF STATEMENT IS TO STORE VARIABLES FOR LATER MACD SIGNAL LINE
            macdTwelve.unshift(derp);
          }
          emaTwelve--;
        }

        const finalEma = (2 / 13) * (newPrice - arrEma[0]) + arrEma[0];
        arrEma.unshift(finalEma);
        arrEma.pop();
        macdTwelve.unshift(finalEma);

        searchedTicker.emaTwelve = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }

      // EMA TWENTY ----------------------------------------------------------------------
      if (dataPull.historical.length <= 40) {
        searchedTicker.emaTwenty = "No Data";
      } else {
        while (emaTwenty >= 19) {
          prevDayEmaSub += dataPull.historical[emaTwenty].close;
          emaTwenty--;
        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
        const subEMA = prevDayEmaSub / 20;
        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
        const finalSubEma =
          (2 / 21) * (dataPull.historical[emaTwenty].close - subEMA) + subEMA;
        arrEma.unshift(finalSubEma);
        emaTwenty--;
        while (emaTwenty >= 0) {
          let derp =
            (2 / 21) * (dataPull.historical[emaTwenty].close - arrEma[0]) +
            arrEma[0];
          arrEma.unshift(derp);
          arrEma.pop();
          emaTwenty--;
        }

        const finalEma = (2 / 21) * (newPrice - arrEma[0]) + arrEma[0];
        arrEma.unshift(finalEma);
        arrEma.pop();

        searchedTicker.emaTwenty = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }

      // EMA TWENTY SIX ----------------------------------------------------------------------

      if (dataPull.historical.length <= 51) {
        searchedTicker.emaTwentySix = "No Data";
      } else {
        while (emaTwentySix >= 25) {
          prevDayEmaSub += dataPull.historical[emaTwentySix].close;
          emaTwentySix--;
        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
        const subEMA = prevDayEmaSub / 26;
        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
        const finalSubEma =
          (2 / 27) * (dataPull.historical[emaTwentySix].close - subEMA) +
          subEMA;
        arrEma.unshift(finalSubEma);
        emaTwentySix--;
        while (emaTwentySix >= 0) {
          let derp =
            (2 / 27) * (dataPull.historical[emaTwentySix].close - arrEma[0]) +
            arrEma[0];
          arrEma.unshift(derp);
          arrEma.pop();
          if (emaTwentySix < 8 && emaTwentySix >= 0) {
            //THIS IF STATEMENT IS TO STORE VARIABLES FOR LATER MACD SIGNAL LINE
            macdTwentySix.unshift(derp);
          }
          emaTwentySix--;
        }

        const finalEma = (2 / 27) * (newPrice - arrEma[0]) + arrEma[0];
        arrEma.unshift(finalEma);
        arrEma.pop();
        macdTwentySix.unshift(finalEma);

        searchedTicker.emaTwentySix = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }

      // EMA FIFTY -----------------------------------------------------------------------------

      if (dataPull.historical.length <= 100) {
        searchedTicker.emaFifty = "No Data";
      } else {
        while (emaFifty >= 49) {
          prevDayEmaSub += dataPull.historical[emaFifty].close;
          emaFifty--;
        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
        const subEMA = prevDayEmaSub / 50;
        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
        const finalSubEma =
          (2 / 51) * (dataPull.historical[emaFifty].close - subEMA) + subEMA;
        arrEma.unshift(finalSubEma);
        emaFifty--;
        while (emaFifty >= 0) {
          let derp =
            (2 / 51) * (dataPull.historical[emaFifty].close - arrEma[0]) +
            arrEma[0];
          arrEma.unshift(derp);
          arrEma.pop();
          emaFifty--;
        }

        const finalEma = (2 / 51) * (newPrice - arrEma[0]) + arrEma[0];
        arrEma.unshift(finalEma);
        arrEma.pop();

        searchedTicker.emaFifty = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }

      // EMA TWO HUNDRED -----------------------------------------------------------------------------

      if (dataPull.historical.length <= 400) {
        searchedTicker.emaTwoHun = "No Data";
      } else {
        while (emaTwoHun >= 199) {
          prevDayEmaSub += dataPull.historical[emaTwoHun].close;
          emaTwoHun--;
        } //CALCULATE EMA HERE TO GET PREVIOUS DAY EMA FOR ACCURATE CURRENT EMA
        const subEMA = prevDayEmaSub / 200;
        //THIS GETS AN EMA USING SMA AS PREV EMA ----------------------------
        const finalSubEma =
          (2 / 201) * (dataPull.historical[emaTwoHun].close - subEMA) + subEMA;
        arrEma.unshift(finalSubEma);
        emaTwoHun--;
        while (emaTwoHun >= 0) {
          let derp =
            (2 / 201) * (dataPull.historical[emaTwoHun].close - arrEma[0]) +
            arrEma[0];
          arrEma.unshift(derp);
          arrEma.pop();
          emaTwoHun--;
        }

        const finalEma = (2 / 201) * (newPrice - arrEma[0]) + arrEma[0];
        arrEma.unshift(finalEma);
        arrEma.pop();

        searchedTicker.emaTwoHun = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }
    } catch (e) {}

    // MACD CALLBACK -----------------------------------------------------------------------------------------------------------------------------------------
    macdCallBack(searchedTicker, macdTwelve, macdTwentySix);
  }
  // MACD FUNCTION -----------------------------------------------------------------------------------------------------------------------------------------
  function macdFunction(searchedTicker, arr1, arr2) {
    const macd = searchedTicker.emaTwelve - searchedTicker.emaTwentySix;
    searchedTicker.macd = macd.toFixed(2);
    // CALCULATE SIGNAL LINE ----------------
    let averageMacd = [];
    let iMacd = 8;

    try {
      while (iMacd >= 0) {
        averageMacd.unshift(arr1[iMacd] - arr2[iMacd]);
        iMacd--;
      }
      let averageSum = averageMacd.reduce((a, b) => a + b);
      let finalAverageMacd = averageSum / 9;
      let macdSignalLine =
        (2 / 9) * (searchedTicker.macd - finalAverageMacd) + finalAverageMacd;
      searchedTicker.macdSignalLine = macdSignalLine.toFixed(2);
      // HISTORGRAM CALC ------------------------------------- IF HISTOGRAM GOES FROM NEGATIVE TO POSITIVE IT IS BULLISH
      let histogram = searchedTicker.macd - searchedTicker.macdSignalLine;
      searchedTicker.macdHistogram = histogram.toFixed(2);
      // FOR NO DATA TO PULL FROM
      if (searchedTicker.macdHistogram === "NaN") {
        searchedTicker.macdHistogram = "No Data";
      }
      if (searchedTicker.macd === "NaN") {
        searchedTicker.macd = "No Data";
      }
      if (searchedTicker.macdSignalLine === "NaN") {
        searchedTicker.macdSignalLine = "No Data";
      }
    } catch (e) {}
  }
  // RSI FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function rsiFunction(searchedTicker, dataPull, newestPull) {
    const newPrice = newestPull[0].price;

    let iRSI = 13;
    let iRSIAdjusted = 14;
    let recentUpper = 0;
    let recentDowner = 0;
    let upMove = 0;
    let downMove = 0;
    let pastDownPeriod = 0;
    let pastUpPeriod = 0;

    try {
      // CHECK TO SEE IF DATA PULL CAN PULL ENOUGH DATA TO BE EFFECTIVE
      if (dataPull.historical.length <= 14) {
        searchedTicker.rsi = "No Data";
      } else {
        // LOOP FOR AVERAGE
        while (iRSI >= 0) {
          if (
            dataPull.historical[iRSI].close >
            dataPull.historical[iRSIAdjusted].close
          ) {
            upMove +=
              dataPull.historical[iRSI].close -
              dataPull.historical[iRSIAdjusted].close;
          } else {
            downMove +=
              dataPull.historical[iRSIAdjusted].close -
              dataPull.historical[iRSI].close;
          }
          iRSI--;
          iRSIAdjusted--;
        }

        let averageUp = upMove / 14;
        let averageDown = downMove / 14;

        // MOST RECENT DIFFERENCE
        if (newPrice > dataPull.historical[0].close) {
          recentUpper = newPrice - dataPull.historical[0].close;
        } else {
          recentDowner = dataPull.historical[0].close - newPrice;
        }

        pastUpPeriod = (averageUp * 13 + recentUpper) / 14;
        pastDownPeriod = (averageDown * 13 + recentDowner) / 14;

        let rsi = 100 - 100 / (1 + pastUpPeriod / pastDownPeriod);
        searchedTicker.rsi = rsi.toFixed(2);
      }
    } catch (e) {}
  }
  // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function stochOsc1433Function(searchedTicker, dataPull, newestPull) {
    let newPrice = newestPull[0].price;

    let iSO = 13;

    let soLowHolder = [];
    let soHighHolder = [];
    let highestHigh = 0;
    let lowestLow = 0;
    // FIRST %D
    let topForm = [];
    let bottomForm = [];
    // SECOND %D
    let topFormTwo = [];
    let bottomFormTwo = [];
    // THIRD %D
    let topFormThree = [];
    let bottomFormThree = [];
    // HOLDING SET OF %D FOR 14 3 3
    let signalLineHolder = [];

    try {
      if (dataPull.historical.length < 18) {
        searchedTicker.stochasticK = "No Data";
      } else {
        // GETTING HIGHS AND LOWS OF PERIOD------------------------------------------------------

        while (iSO >= 0) {
          soLowHolder.push(dataPull.historical[iSO].low);
          soHighHolder.push(dataPull.historical[iSO].high);
          iSO--;
        }

        soHighHolder.push(newPrice);
        soLowHolder.push(newPrice);

        highestHigh = Math.max(...soHighHolder);
        lowestLow = Math.min(...soLowHolder);

        if (lowestLow === newPrice) {
          newPrice = dataPull.historical[0].close;
        }

        if (highestHigh === newPrice) {
          newPrice = dataPull.historical[0].close;
        }

        topForm.push(newPrice - lowestLow);
        bottomForm.push(highestHigh - lowestLow);

        //FOR %K
        searchedTicker.stochasticK = (
          ((newPrice - lowestLow) / (highestHigh - lowestLow)) *
          100
        ).toFixed(2);
        // VERY IMPORT - REWORK THE STOCHASTIC NAMES AND THATS WHY ITS UNDEFINDED. REWRITE TO SHOW IN TECHIN

        // RESET HOLDER AND VARs --------------------------------------------------------

        iSO = 14;
        soLowHolder = [];
        soHighHolder = [];
        highestHigh = 0;
        lowestLow = 0;

        // GETTING HIGHS AND LOWS OF PERIOD-----------------------------------------------

        while (iSO >= 1) {
          soLowHolder.push(dataPull.historical[iSO].low);
          soHighHolder.push(dataPull.historical[iSO].high);
          iSO--;
        }

        highestHigh = Math.max(...soHighHolder);
        lowestLow = Math.min(...soLowHolder);

        topForm.push(dataPull.historical[0].close - lowestLow);
        bottomForm.push(highestHigh - lowestLow);

        topFormTwo.push(dataPull.historical[0].close - lowestLow);
        bottomFormTwo.push(highestHigh - lowestLow);

        // RESET HOLDER AND VARs ------------------------------------------------

        iSO = 15;
        soLowHolder = [];
        soHighHolder = [];
        highestHigh = 0;
        lowestLow = 0;

        // GETTING HIGHS AND LOWS OF PERIOD-----------------------------------

        while (iSO >= 2) {
          soLowHolder.push(dataPull.historical[iSO].low);
          soHighHolder.push(dataPull.historical[iSO].high);
          iSO--;
        }
        highestHigh = Math.max(...soHighHolder);
        lowestLow = Math.min(...soLowHolder);

        topForm.push(dataPull.historical[1].close - lowestLow);
        bottomForm.push(highestHigh - lowestLow);

        topFormTwo.push(dataPull.historical[1].close - lowestLow);
        bottomFormTwo.push(highestHigh - lowestLow);

        topFormThree.push(dataPull.historical[1].close - lowestLow);
        bottomFormThree.push(highestHigh - lowestLow);

        // AFTER 3 WE SUM IT UP --------------- TO GET 1 OF THE 3 SMOOTHS FOR 14 3 3------------------------------------------

        let sumTop = topForm.reduce((a, b) => a + b, 0);
        let sumBottom = bottomForm.reduce((a, b) => a + b, 0);

        let slowD = (sumTop / sumBottom) * 100;

        // FOR %D
        searchedTicker.stochasticD = (slowD / 3).toFixed(2);

        signalLineHolder.push(slowD);

        //RESET VARS ---------------------------------------------------------------------

        iSO = 16;
        soLowHolder = [];
        soHighHolder = [];
        highestHigh = 0;
        lowestLow = 0;
        sumTop = 0;
        sumBottom = 0;
        slowD = 0;

        // GETTING HIGHS AND LOWS OF PERIOD------------------------------------------------

        while (iSO >= 3) {
          soLowHolder.push(dataPull.historical[iSO].low);
          soHighHolder.push(dataPull.historical[iSO].high);
          iSO--;
        }
        highestHigh = Math.max(...soHighHolder);
        lowestLow = Math.min(...soLowHolder);

        topFormTwo.push(dataPull.historical[2].close - lowestLow);
        bottomFormTwo.push(highestHigh - lowestLow);

        topFormThree.push(dataPull.historical[2].close - lowestLow);
        bottomFormThree.push(highestHigh - lowestLow);

        // AFTER 3 WE SUM IT UP --------------- TO GET 2 OF THE 3 SMOOTHS FOR 14 3 3------------------------------------------

        sumTop = topFormTwo.reduce((a, b) => a + b, 0);
        sumBottom = bottomFormTwo.reduce((a, b) => a + b, 0);

        slowD = (sumTop / sumBottom) * 100;

        signalLineHolder.push(slowD);

        //RESET VARS ---------------------------------------------

        iSO = 17;
        soLowHolder = [];
        soHighHolder = [];
        highestHigh = 0;
        lowestLow = 0;
        sumTop = 0;
        sumBottom = 0;
        slowD = 0;

        // GETTING HIGHS AND LOWS OF PERIOD-----------------------------------

        while (iSO >= 4) {
          soLowHolder.push(dataPull.historical[iSO].low);
          soHighHolder.push(dataPull.historical[iSO].high);
          iSO--;
        }
        highestHigh = Math.max(...soHighHolder);
        lowestLow = Math.min(...soLowHolder);

        topFormThree.push(dataPull.historical[3].close - lowestLow);
        bottomFormThree.push(highestHigh - lowestLow);

        // AFTER 3 WE SUM IT UP --------------- TO GET 3 OF THE 3 SMOOTHS FOR 14 3 3------------------------------------------

        sumTop = topFormThree.reduce((a, b) => a + b, 0);
        sumBottom = bottomFormThree.reduce((a, b) => a + b, 0);

        slowD = (sumTop / sumBottom) * 100;

        signalLineHolder.push(slowD);

        // ----------- TALLY UP LAST SMOOTHING -------------------------------
        const sumStochD = signalLineHolder.reduce((a, b) => a + b, 0);
        let smaD = sumStochD / 3;

        if (smaD < 0) {
          smaD *= -1;
          searchedTicker.stochasticSignal = smaD.toFixed(2);
        } else {
          searchedTicker.stochasticSignal = smaD.toFixed(2);
        }
      }
    } catch (e) {}
  }
  // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function williamsRFunction(searchedTicker, dataPull, newestPull) {
    const newPrice = newestPull[0].price;

    let highs = [];
    let lows = [];
    let lowestLow = 0;
    let highestHigh = 0;
    try {
      if (dataPull.historical.length < 14) {
        searchedTicker.williams = "No Data";
      } else {
        for (let i = 0; i <= 13; i++) {
          highs.push(dataPull.historical[i].high);
          lows.push(dataPull.historical[i].low);
        }

        highs.push(newPrice);
        lows.push(newPrice);

        lowestLow = Math.min(...lows);
        highestHigh = Math.max(...highs);

        const williams =
          ((highestHigh - dataPull.historical[0].close) /
            (highestHigh - lowestLow)) *
          -100;

        searchedTicker.williamsR = williams.toFixed(2);
      }
    } catch (e) {}
  }
  // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function cciFunction(searchedTicker, dataPull, newestPull) {
    const newPrice = newestPull[0].price;

    let tpvCul = 0;
    let tpv = [];
    let tpvMa = 0;
    let tpvCurrent = newPrice;
    const recentTpv = newPrice;
    try {
      if (dataPull.historical.length < 19) {
        searchedTicker.cciTwenty = "No Data";
      } else {
        for (let i = 0; i <= 19; i++) {
          const { high, close, low } = dataPull.historical[i];
          tpv.push(tpvCurrent); // PUSH FIRST NUMBER IN
          tpvCurrent = (close + high + low) / 3;
        }
        // ---- TPV SMA ------------------------
        tpvCul = tpv.reduce((a, b) => a + b);
        tpvMa = tpvCul / 20;
        // TOP HALF OF FORMULA - DIVIDE BY PART TWO
        const partOne = recentTpv - tpvMa;

        const meanD = tpv.map((x) => x - tpvMa);
        const meanDMap = meanD.map((x) => Math.abs(x));
        const meanDSum = meanDMap.reduce((a, b) => a + b);
        const meanDiv = meanDSum / 20;
        // PART TWO OF FORMULA --------------
        const partTwo = meanDiv * 0.015;
        // CCI ------------------------------
        const cci = partOne / partTwo;

        searchedTicker.cciTwenty = cci.toFixed(2);
      }
    } catch (e) {}
  }
  // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function bollingerBandsFunction(searchedTicker, dataPull, newestPull) {
    const newPrice = newestPull[0].price;

    let smaCul = 0;
    let closeHolder = [];
    try {
      if (dataPull.historical.length < 19) {
        searchedTicker.bbUpper = "No Data";
        searchedTicker.bbLower = "No Data";
        searchedTicker.bbMiddle = "No Data";
      } else {
        let closeP = newPrice;
        for (let i = 0; i <= 19; i++) {
          closeHolder.push(closeP);
          smaCul += closeP;
          closeP = dataPull.historical[i].close;
        }
        // STANDARD DEVIATION CALC --------------------------------
        const smaTwenty = smaCul / 20;

        const priceAdj = closeHolder.map((x) => x - smaTwenty);

        const priceAdjAbs = priceAdj.map((x) => Math.abs(x));

        const priceAdjSqrt = priceAdjAbs.map((x) => x * x);

        const partOneDev = priceAdjSqrt.reduce((a, b) => a + b);

        const partTwoDev = partOneDev / 20;
        const standardDev = Math.sqrt(partTwoDev);
        // BB BAND CALC --------------------------------------------
        const bbUpper = smaTwenty + standardDev * 2;
        const bbLower = smaTwenty - standardDev * 2;

        const bbPercent = (newPrice - bbLower) / (bbUpper - bbLower);

        searchedTicker.bbUpper = bbUpper.toFixed(2);
        searchedTicker.bbLower = bbLower.toFixed(2);
        searchedTicker.bbMiddle = smaTwenty.toFixed(2);
        searchedTicker.bbPercent = bbPercent.toFixed(2);
      }
    } catch (e) {}
  }
  // VWAP FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function vwapFunction(searchedTicker, dataPull) {
    // ----------- VWAP CALUC -------------------------------------------
    let dayLengthPeriod = 0;
    let tpvCul = 0;
    let volumeCul = 0;
    let tempVWAP = []; // HOLD VWAP PERIOD - TAKES FROM 0 INDEX FOR MOST CURRENT

    try {
      // -------------THIS IS FOR GETTING THE DAY LENGTH FOR VWAP
      while (dataPull[dayLengthPeriod].date.slice(0, 10) == newDateString) {
        dayLengthPeriod++;
      }

      // --------------------THIS IS FOR CALCULATING THE VWAP AND PUSHING TO

      for (let i = 0; i < dayLengthPeriod; i++) {
        const { volume, high, close, low, date } = dataPull[i];
        let tpv = (high + low + close) / 3;
        if (date.slice(0, 10) == newDateString) {
          tpvCul += tpv * volume;
          volumeCul += volume;
        }
        var vwapFinal = tpvCul / volumeCul; // --------- THIS IS VWAP!!!!!!!!
        tempVWAP.unshift(vwapFinal); //ADD VWAP FRONT OF ARR
      }
      let vwap = tempVWAP[0].toFixed(2);
      searchedTicker.vwap = vwap;
    } catch (e) {}
  }
  // VOLUME FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function setVolume(searchedTicker, dataPull, newestPull) {
    // SET RECENT YESTERDAY VOLUME
    if (dataPull.historical.length <= 0) {
      searchedTicker.yesterdayVolume = 0;
    } else {
      searchedTicker.yesterdayVolume = dataPull.historical[0].volume;
      if (marketDay == 0 || marketDay == 6) {
        searchedTicker.yesterdayVolume = dataPull.historical[1].volume;
      }

      if (marketDay >= 1 && marketDay <= 5 && timeNum < 930) {
        searchedTicker.yesterdayVolume = dataPull.historical[1].volume;
      }

      if (timeNum > 1830) {
        searchedTicker.yesterdayVolume = dataPull.historical[1].volume;
      }
    }
    // SET RECENT VOLUME
    if (newestPull.length <= 0) {
      searchedTicker.volume = 0;
    } else {
      searchedTicker.volume = newestPull[0].volume;
    }
  }

  // WHERE THE MAGIC HAPPENS
  // TA FUNCTION ---------------------------------------------------------------------
  async function technicalIndicators(symbol, searchedSymbol, callBack) {

    let j = 0;
    try {
      while (j < 1) {
        // LOOP FOR TECHNICAL SEARCHED TICKER
        try {
          // ------ FETCH NASDAQ
          const resTwo = await fetch(
            "https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218"
          );
          const dataNas = await resTwo.json();

          for (let i = 0; i < dataNas.length; i++) {
            if (dataNas[i].symbol == symbol) {
              searchedSymbol = dataNas[i];
              break;
            }
          }

          // ------ FETCH NYSE
          const res = await fetch(
            "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218"
          );
          const dataNyse = await res.json();

          for (let i = 0; i < dataNyse.length; i++) {
            if (dataNyse[i].symbol == symbol) {
              searchedSymbol = dataNyse[i];
              break;
            }
          }
        } catch (e) {
          alert(
            "Unable to locate stock ticker. Please check your input and try again!"
          );
        }
        // WILL BREAK OUT IF SYMBOL DOESNT EXIST
        if (searchedSymbol.price == undefined) {
          alert(
            "Unable to locate stock ticker. Please check your input and try again!"
          );
          return;
        }
        //THIS PULL IS FOR CLOSE PRICES TO CALC TAs PAST CLOSE DATA //
        const resSMA = await fetch(
          `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
        );
        const dataSMA = await resSMA.json(); // SMA PULL USED FOR OTHER CALCS
        // ERROR CHECK FOR EMPTY PULL
        if (
          Object.keys(dataSMA).length === 0 &&
          dataSMA.constructor === Object
        ) {
          alert(
            "There may be a technical issue with this ticker. Please check your input and try again later!"
          );
          return;
        }

        //THIS PULL IS FOR OSCILLATORS ALL CURRENT CLOSE DATA
        const resOscPulled = await fetch(
          `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
        );
        const dataRecentPulled = await resOscPulled.json();
        // ERROR CHECK FOR EMPTY PULL
        if (
          Object.keys(dataRecentPulled).length === 0 &&
          dataRecentPulled.constructor === Object
        ) {
          alert(
            "There may be a technical issue with this ticker. Please check your input and try again later!"
          );
          return;
        }

        // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------
        const resVWAP = await fetch(
          `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
        );
        const dataVWAP = await resVWAP.json();

        // ERROR CHECK FOR EMPTY PULL
        if (
          Object.keys(dataVWAP).length === 0 &&
          dataVWAP.constructor === Object
        ) {
          alert(
            "There may be a technical issue with this ticker. Please check your input and try again later!"
          );
          return;
        }

        vwapFunction(searchedSymbol, dataVWAP);

        // SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        smaFunction(searchedSymbol, dataSMA, dataRecentPulled);

        // WMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        wmaFunction(searchedSymbol, dataSMA, dataRecentPulled);

        // VWMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        vwmaFunction(searchedSymbol, dataSMA, dataRecentPulled);

        // EMA WITH MACD CALLBACK ------------------------------------------------------------------------------------------------------------------------------------------
        emaFunction(searchedSymbol, dataSMA, dataRecentPulled, macdFunction);

        // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        rsiFunction(searchedSymbol, dataSMA, dataRecentPulled);

        // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        stochOsc1433Function(searchedSymbol, dataSMA, dataRecentPulled);

        // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        williamsRFunction(searchedSymbol, dataSMA, dataRecentPulled);

        // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        cciFunction(searchedSymbol, dataSMA, dataRecentPulled);

        // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        bollingerBandsFunction(searchedSymbol, dataSMA, dataRecentPulled);

        // SET VOLUME PROPERTIES
        setVolume(searchedSymbol, dataSMA, dataRecentPulled);

        j++; // UPDATE WHILE LOOP
      } // THIS IS THE END OF LOOP
    } catch (e) {
      // END OF TRY
    }
    const returnedData = await callBack(searchedSymbol); // BUILD HTML TO DISPLAY
    return returnedData;
  }
  // BUILD OUT HTML ------------------------------------------------------
  async function buildSearchTech(obj) {
    let {
      symbol,
      price,
      change,
      changesPercentage,
      avgVolume,
      volume,
      yesterdayVolume,
      vwap,
      smaFiveTeen,
      smaTwenty,
      smaThirty,
      smaFifty,
      smaOneHun,
      smaTwoHun,
      emaEight,
      emaTwelve,
      emaTwenty,
      emaTwentySix,
      emaFifty,
      emaTwoHun,
      wmaFiveTeen,
      wmaTwenty,
      wmaThirty,
      wmaFifty,
      wmaOneHun,
      wmaTwoHun,
      vwmaFiveTeen,
      vwmaTwenty,
      vwmaThirty,
      vwmaFifty,
      vwmaOneHun,
      vwmaTwoHun,
      macd,
      macdHistogram,
      macdSignalLine,
      rsi,
      stochasticD,
      stochasticK,
      stochasticSignal,
      cciTwenty,
      bbMiddle,
      bbLower,
      bbUpper,
      bbPercent,
      williamsR,
    } = obj;

    let directionArrow = "up";

    // SETS ARROW FOR UP AND DOWN --------------
    if (changesPercentage < 0) {
      obj.directionArrow = "down";
    } else {
      obj.directionArrow = "up";
    }
    // CHANGE TO POSITIVE BUT ARROW POINTS DOWN OR UP ----------
    if (change < 0) {
      obj.change = change * -1;
    }

    // ADJUST TO FIXED --------------------------------------------------------

    price = price.toFixed(2);

    change = change.toFixed(2);

    changesPercentage = changesPercentage.toFixed(2);

    // VOLUME INCREASE TODAY ----------
    let volumeIncrease = 0;

    if (volume > avgVolume) {
      let increase = volume - avgVolume;
      volumeIncrease = (increase / avgVolume) * 100;
    } else {
      let decrease = avgVolume - volume;
      volumeIncrease = (decrease / avgVolume) * -100;
    }

    volumeIncrease = volumeIncrease.toFixed(2);

    // TO GET AVERAGE DAILY VOLUME FOR YESTERDAY ----------------
    let yesterdayVolIncrease = 0;

    if (yesterdayVolume > avgVolume) {
      let increase = yesterdayVolume - avgVolume;
      yesterdayVolIncrease = (increase / avgVolume) * 100;
    } else {
      let decrease = avgVolume - yesterdayVolume;
      yesterdayVolIncrease = (decrease / avgVolume) * -100;
    }

    yesterdayVolIncrease = yesterdayVolIncrease.toFixed(2);

    // NaN CHECK ----------------------------------------
    if (isNaN(yesterdayVolIncrease)) {
      obj.yesterdayVolIncrease = "No Data";
    }

    // ADJUST TO POSITIVE
    if (obj.stochasticD < 0) {
      obj.stochasticD = obj.stochasticD * -1;
    }
    if (obj.stochasticK < 0) {
      obj.stochasticK = obj.stochasticK * -1;
    }
    if (obj.stochasticD < 0) {
      obj.stochasticD = obj.stochasticD * -1;
    }
    if (obj.stochasticK < 0) {
      obj.stochasticK = obj.stochasticK * -1;
    }

    // ADJUST CERTAIN PARTS TO GIVE RIGHT PROMPT IF UNDEFINED

    if (obj.avgVolume == undefined) {
      obj.avgVolume = "No Data";
    }

    if (obj.volume == undefined) {
      obj.volume = "No Data";
    }

    if (obj.volumeIncrease == undefined) {
      obj.volumeIncrease = "No Data";
    }

    if (obj.yesterdayVolume == undefined) {
      obj.yesterdayVolume = "No Data";
    }

    if (obj.smaFiveTeen == undefined) {
      obj.smaFiveTeen = "No Data";
    }

    if (obj.smaTwenty == undefined) {
      obj.smaTwenty = "No Data";
    }

    if (obj.smaThirty == undefined) {
      obj.smaThirty = "No Data";
    }

    if (obj.smaFifty == undefined) {
      obj.smaFifty = "No Data";
    }

    if (obj.smaOneHun == undefined) {
      obj.smaOneHun = "No Data";
    }

    if (obj.smaTwoHun == undefined) {
      obj.smaTwoHun = "No Data";
    }

    if (obj.emaEight == undefined) {
      obj.emaEight = "No Data";
    }

    if (obj.emaTwelve == undefined) {
      obj.emaTwelve = "No Data";
    }

    if (obj.emaTwenty == undefined) {
      obj.emaTwenty = "No Data";
    }

    if (obj.emaTwentySix == undefined) {
      obj.emaTwentySix = "No Data";
    }

    if (obj.emaFifty == undefined) {
      obj.emaFifty = "No Data";
    }

    if (obj.emaTwoHun == undefined) {
      obj.emaTwoHun = "No Data";
    }

    if (obj.wmaFiveTeen == undefined) {
      obj.wmaFiveTeen = "No Data";
    }

    if (obj.wmaTwenty == undefined) {
      obj.wmaTwenty = "No Data";
    }

    if (obj.wmaThirty == undefined) {
      obj.wmaThirty = "No Data";
    }

    if (obj.wmaFifty == undefined) {
      obj.wmaFifty = "No Data";
    }

    if (obj.wmaOneHun == undefined) {
      obj.wmaOneHun = "No Data";
    }

    if (obj.wmaTwoHun == undefined) {
      obj.wmaTwoHun = "No Data";
    }

    if (obj.vwmaFiveTeen == undefined) {
      obj.vwmaFiveTeen = "No Data";
    }
    if (obj.vwmaTwenty == undefined) {
      obj.vwmaTwenty = "No Data";
    }
    if (obj.vwmaThirty == undefined) {
      obj.vwmaThirty = "No Data";
    }
    if (obj.vwmaFifty == undefined) {
      obj.vwmaFifty = "No Data";
    }
    if (obj.vwmaOneHun == undefined) {
      obj.vwmaOneHun = "No Data";
    }
    if (obj.vwmaTwoHun == undefined) {
      obj.vwmaTwoHun = "No Data";
    }

    if (obj.vwap == undefined) {
      obj.vwap = "No Data";
    }

    if (obj.macd == undefined) {
      obj.macd = "No Data";
    }

    if (obj.rsi == undefined) {
      obj.rsi = "No Data";
    }
    if (obj.cciTwenty == undefined) {
      obj.cciTwenty = "No Data";
    }

    if (obj.williamsR == undefined) {
      obj.williamsR = "No Data";
    }

    if (obj.stochasticK == undefined) {
      obj.stochasticK = "No Data";
    }
    if (obj.stochasticD == undefined) {
      obj.stochasticD = "No Data";
    }
    if (obj.stochasticSignal == undefined) {
      obj.stochasticSignal = "No Data";
    }

    if (obj.bbMiddle == undefined) {
      obj.bbMiddle = "No Data";
    }
    if (obj.bbLower == undefined) {
      obj.bbLower = "No Data";
    }
    if (obj.bbUpper == undefined) {
      obj.bbUpper = "No Data";
    }
    if (obj.bbPercent == undefined) {
      obj.bbPercent = "No Data";
    }

    // ADJUST TO POSITIVE
    if (obj.stochasticD < 0) {
      obj.stochasticD = obj.stochasticD * -1;
    }
    if (obj.stochasticK < 0) {
      obj.stochasticK = obj.stochasticK * -1;
    }
    if (obj.stochasticD < 0) {
      obj.stochasticD = obj.stochasticD * -1;
    }
    if (obj.stochasticK < 0) {
      obj.stochasticK = obj.stochasticK * -1;
    }

    obj.volumeIncreaseToday = volumeIncrease
    obj.volumeIncreaseYesterday = yesterdayVolIncrease
    obj.volumeYesterday = yesterdayVolume

    // SET BOX SHADOW OF BULL AND BEAR
    // if (changesPercentage < 0) {
    //   document.querySelector(".search-symbol-box").style.boxShadow =
    //     "inset 0px 2px 3px var(--bear-market-color), inset 0px 2px 2px var(--bear-market-color)";
    // } else if (changesPercentage > 0) {
    //   document.querySelector(".search-symbol-box").style.boxShadow =
    //     "inset 0px 2px 3px var(--bull-market-color), inset 0px 2px 2px var(--bull-market-color)";
    // }

    const returnedData = obj;
    return returnedData;
  }

 const returnedData = await  technicalIndicators(symbol, symbolObj, buildSearchTech);
 return returnedData;
};
