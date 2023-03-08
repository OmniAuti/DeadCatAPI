export const technicalPortfolioAnalysis = async (arr) => {
  // CHECKING ON PORTFOLIO TO MAKE SURE IT HAS SOMETHING ----------------------------------
  if (arr === null) {
    alert("Sorry, your portfolio seems to be malfunctioning.");
    return [];
  } else if (arr.length <= 0) {
    alert("Sorry, your portfolio seems to be malfunctioning.");
    return [];
  }

  /// DATE REFERENCE FOR MARKET DATA PULLS ----------------------------------------==============
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

  // ---------------------- FILTERS TRADABLE SYMBOLS THAT HAVE DROPPED BELOW THE THRESHOLD -------------------------------------
  async function filterTradableSymbols(portArr, callback) {
    try {
      // ------ FETCH NYSE
      const res = await fetch(
        "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218"
      );
      const dataNyse = await res.json();

      // ------ FETCH NASDAQ
      const resTwo = await fetch(
        "https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218"
      );
      const dataNas = await resTwo.json();

      // FILTER THESE STOCKS DOWN TO JUST WHAT IS IN PORTFOLIO
      const combinedStock = await dataNyse.concat(dataNas);
      // IN ANOTHER FUNCTION MAKE THE FILTER TO MATCH PORTFOLIO ARR

      // GETTING INFO FOR PORTFOLIO STOCK ===========================

      var holderArr = [];
      for (let i = 0; i < portArr.length; i++) {
        for (let j = 0; j < combinedStock.length; j++) {
          if (portArr[i].symbol === combinedStock[j].symbol) {
            holderArr.push(combinedStock[j]);
          }
        }
      }

      //--------- CATCH
    } catch (e) {}
    const returnedData = await callback(holderArr, technicalIndicators);
    return returnedData;
  }

  // ---------------------- TECHNICAL INDICATOR FUNCTIONS ------------------------------------------------------------------------------------

  // SMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function smaFunction(chartArr, dataPull, newestPull, num) {
    let culSMA = 0;

    // ------- SMA INDEX IS - 2 FROM TOTAL BECAUSE OF 0 INDEX = 1 AND ADDING RECENT PRICE DATA --------------------
    let fiveTeenSMA = 13;
    let twentySMA = 18;
    let thirtySMA = 28;
    let fiftySMA = 48;
    let hunSMA = 98;
    let twoHunSMA = 198;

    try {
      const todayPricePull = newestPull[0].price;
      // ------------- 15 DAY SMA -------------------------------
      if (dataPull.historical.length <= 13) {
        chartArr[num].smaFiveTeen = "No Data";
      } else {
        while (fiveTeenSMA >= 0) {
          culSMA += dataPull.historical[fiveTeenSMA].close;
          fiveTeenSMA--;
        }
        let smaFiveResult = (culSMA + todayPricePull) / 15;
        chartArr[num].smaFiveTeen = smaFiveResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 20 DAY SMA -------------------------------
      if (dataPull.historical.length <= 19) {
        chartArr[num].smaTwenty = "No Data";
      } else {
        while (twentySMA >= 0) {
          culSMA += dataPull.historical[twentySMA].close;
          twentySMA--;
        }
        let smaTwentyResult = (culSMA + todayPricePull) / 20;
        chartArr[num].smaTwenty = smaTwentyResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 30 DAY SMA -------------------------------
      if (dataPull.historical.length <= 29) {
        chartArr[num].smaThirty = "No Data";
      } else {
        while (thirtySMA >= 0) {
          culSMA += dataPull.historical[thirtySMA].close;
          thirtySMA--;
        }
        let smaThirtyResult = (culSMA + todayPricePull) / 30;
        chartArr[num].smaThirty = smaThirtyResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 50 DAY SMA -------------------------------
      if (dataPull.historical.length <= 49) {
        chartArr[num].smaFifty = "No Data";
      } else {
        while (fiftySMA >= 0) {
          culSMA += dataPull.historical[fiftySMA].close;
          fiftySMA--;
        }
        let smaFiftyResult = (culSMA + todayPricePull) / 50;
        chartArr[num].smaFifty = smaFiftyResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 100 DAY SMA -------------------------------
      if (dataPull.historical.length <= 99) {
        chartArr[num].smaOneHun = "No Data";
      } else {
        while (hunSMA >= 0) {
          culSMA += dataPull.historical[hunSMA].close;
          hunSMA--;
        }
        let smaOneHunResult = (culSMA + todayPricePull) / 100;
        chartArr[num].smaOneHun = smaOneHunResult.toFixed(2);
        culSMA = 0;
      }
      // ------------- 200 DAY SMA -------------------------------
      if (dataPull.historical.length <= 199) {
        chartArr[num].smaTwoHun = "No Data";
      } else {
        while (twoHunSMA >= 0) {
          culSMA += dataPull.historical[twoHunSMA].close;
          twoHunSMA--;
        }
        let smaTwoHunResult = (culSMA + todayPricePull) / 200;
        chartArr[num].smaTwoHun = smaTwoHunResult.toFixed(2);
        culSMA = 0;
      }
    } catch (e) {}
  }
  // WMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function wmaFunction(chartArr, dataPull, newestPull, num) {
    // WMA FiveTeen --------------------------------------------------------------------
    let weight = 14;
    let wmaInterval = 0;
    let iWma = 15;
    try {
      let wmaCul = newestPull[0].price * 15;

      if (dataPull.historical.length < 14) {
        chartArr[num].wmaFiveTeen = "No Data";
      } else {
        for (let i = 0; i <= 13; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaFiveTeen = wmaCul / iWma;
        chartArr[num].wmaFiveTeen = wmaFiveTeen.toFixed(2);
      }

      // WMA Twenty --------------------------------------------------------------------
      wmaCul = newestPull[0].price * 20;
      weight = 19;
      wmaInterval = 0;
      iWma = 20;

      if (dataPull.historical.length < 19) {
        chartArr[num].wmaTwenty = "No Data";
      } else {
        for (let i = 0; i <= 18; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaTwenty = wmaCul / iWma;
        chartArr[num].wmaTwenty = wmaTwenty.toFixed(2);
      }

      // WMA THIRTY --------------------------------------------------------------------

      wmaCul = newestPull[0].price * 30;
      weight = 29;
      wmaInterval = 0;
      iWma = 30;

      if (dataPull.historical.length < 30) {
        chartArr[num].wmaThirty = "No Data";
      } else {
        for (let i = 0; i <= 28; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaThirty = wmaCul / iWma;
        chartArr[num].wmaThirty = wmaThirty.toFixed(2);
      }

      // WMA FIFTY --------------------------------------------------------------------

      wmaCul = newestPull[0].price * 50;
      weight = 49;
      wmaInterval = 0;
      iWma = 50;

      if (dataPull.historical.length < 50) {
        chartArr[num].wmaFifty = "No Data";
      } else {
        for (let i = 0; i <= 48; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaFifty = wmaCul / iWma;
        chartArr[num].wmaFifty = wmaFifty.toFixed(2);
      }

      // WMA ONE HUNDRED --------------------------------------------------------------------

      wmaCul = newestPull[0].price * 100;
      weight = 99;
      wmaInterval = 0;
      iWma = 100;

      if (dataPull.historical.length < 100) {
        chartArr[num].wmaOneHun = "No Data";
      } else {
        for (let i = 0; i <= 98; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaOneHun = wmaCul / iWma;
        chartArr[num].wmaOneHun = wmaOneHun.toFixed(2);
      }

      // WMA TWO HUNDRED --------------------------------------------------------------------

      wmaCul = newestPull[0].price * 200;
      weight = 199;
      wmaInterval = 0;
      iWma = 200;

      if (dataPull.historical.length < 200) {
        chartArr[num].wmaTwoHun = "No Data";
      } else {
        for (let i = 0; i <= 198; i++) {
          wmaInterval = dataPull.historical[i].close * weight;
          wmaCul += wmaInterval;
          iWma += weight;
          weight--;
        }
        const wmaTwoHun = wmaCul / iWma;
        chartArr[num].wmaTwoHun = wmaTwoHun.toFixed(2);
      }
    } catch (e) {}
  }
  // VWMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function vwmaFunction(chartArr, dataPull, newestPull, num) {
    // VWMA FIVETEEN --------------------------------------------------------------------

    try {
      let price = 0;
      let volume = 0;
      const newPrice = newestPull[0].price;
      const newVol = newestPull[0].volume;

      let volCul = newestPull[0].volume;
      let totalCul = newPrice * newVol;

      if (dataPull.historical.length < 14) {
        chartArr[num].vwmaFiveTeen = "No Data";
      } else {
        for (let i = 0; i <= 13; i++) {
          price = dataPull.historical[i].close;
          if (price == undefined) {
            price = 0;
          }
          volume = dataPull.historical[i].volume;
          if (volume == undefined) {
            volume = 0;
          }
          totalCul += price * volume;
          if (isNaN(totalCul)) {
            return;
          }
          volCul += dataPull.historical[i].volume;
          if (isNaN(volCul)) {
            return;
          }
        }

        const vwmaFiveTeen = totalCul / volCul;

        chartArr[num].vwmaFiveTeen = vwmaFiveTeen.toFixed(2);
      }

      // VWMA TWENTY --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 19) {
        chartArr[num].vwmaTwenty = "No Data";
      } else {
        for (let i = 0; i <= 18; i++) {
          price = dataPull.historical[i].close;
          if (price == undefined) {
            price = 0;
          }
          volume = dataPull.historical[i].volume;
          if (volume == undefined) {
            volume = 0;
          }
          totalCul += price * volume;
          if (isNaN(totalCul)) {
            return;
          }
          volCul += dataPull.historical[i].volume;
          if (isNaN(volCul)) {
            return;
          }
        }
        const vwmaTwenty = totalCul / volCul;

        chartArr[num].vwmaTwenty = vwmaTwenty.toFixed(2);
      }

      // VWMA THIRTY --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 29) {
        chartArr[num].vwmaThirty = "No Data";
      } else {
        for (let i = 0; i <= 28; i++) {
          price = dataPull.historical[i].close;
          if (price == undefined) {
            price = 0;
          }
          volume = dataPull.historical[i].volume;
          if (volume == undefined) {
            volume = 0;
          }
          totalCul += price * volume;
          if (isNaN(totalCul)) {
            return;
          }
          volCul += dataPull.historical[i].volume;
          if (isNaN(volCul)) {
            return;
          }
        }
        const vwmaThirty = totalCul / volCul;
        chartArr[num].vwmaThirty = vwmaThirty.toFixed(2);
      }

      // VWMA FIFTY --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 49) {
        chartArr[num].vwmaFifty = "No Data";
      } else {
        for (let i = 0; i <= 48; i++) {
          price = dataPull.historical[i].close;
          if (price == undefined) {
            price = 0;
          }
          volume = dataPull.historical[i].volume;
          if (volume == undefined) {
            volume = 0;
          }
          totalCul += price * volume;
          if (isNaN(totalCul)) {
            return;
          }
          volCul += dataPull.historical[i].volume;
          if (isNaN(volCul)) {
            return;
          }
        }
        const vwmaFifty = totalCul / volCul;
        chartArr[num].vwmaFifty = vwmaFifty.toFixed(2);
      }

      // VWMA ONEHUN --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 99) {
        chartArr[num].vwmaOneHun = "No Data";
      } else {
        for (let i = 0; i <= 98; i++) {
          price = dataPull.historical[i].close;
          if (price == undefined) {
            price = 0;
          }
          volume = dataPull.historical[i].volume;
          if (volume == undefined) {
            volume = 0;
          }
          totalCul += price * volume;
          if (isNaN(totalCul)) {
            return;
          }
          volCul += dataPull.historical[i].volume;
          if (isNaN(volCul)) {
            return;
          }
        }
        const vwmaOneHun = totalCul / volCul;
        chartArr[num].vwmaOneHun = vwmaOneHun.toFixed(2);
      }

      // VWMA TWOHUN --------------------------------------------------------------------

      volCul = newestPull[0].volume;
      totalCul = newPrice * newVol;
      price = 0;
      volume = 0;

      if (dataPull.historical.length < 199) {
        chartArr[num].vwmaTwoHun = "No Data";
      } else {
        for (let i = 0; i <= 198; i++) {
          price = dataPull.historical[i].close;
          if (price == undefined) {
            price = 0;
          }
          volume = dataPull.historical[i].volume;
          if (volume == undefined) {
            volume = 0;
          }
          totalCul += price * volume;
          if (isNaN(totalCul)) {
            return;
          }
          volCul += dataPull.historical[i].volume;
          if (isNaN(volCul)) {
            return;
          }
        }
        const vwmaTwoHun = totalCul / volCul;
        chartArr[num].vwmaTwoHun = vwmaTwoHun.toFixed(2);
      }
    } catch (e) {}
  }
  // EMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function emaFunction(chartArr, dataPull, newestPull, num, macdCallBack) {
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
      const newPrice = newestPull[0].price;

      // EMA EIGHT ----------------------------------------------------------------------
      if (dataPull.historical.length <= 16) {
        chartArr[num].emaEight = "No Data";
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

        chartArr[num].emaEight = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }
      // EMA TWELVE ----------------------------------------------------------------------
      if (dataPull.historical.length <= 24) {
        chartArr[num].emaTwelve = "No Data";
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

        chartArr[num].emaTwelve = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }

      // EMA TWENTY ----------------------------------------------------------------------
      if (dataPull.historical.length <= 40) {
        chartArr[num].emaTwenty = "No Data";
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

        chartArr[num].emaTwenty = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }

      // EMA TWENTY SIX ----------------------------------------------------------------------

      if (dataPull.historical.length <= 51) {
        chartArr[num].emaTwentySix = "No Data";
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

        chartArr[num].emaTwentySix = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }

      // EMA FIFTY -----------------------------------------------------------------------------

      if (dataPull.historical.length <= 100) {
        chartArr[num].emaFifty = "No Data";
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

        chartArr[num].emaFifty = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }

      // EMA TWO HUNDRED -----------------------------------------------------------------------------

      if (dataPull.historical.length <= 400) {
        chartArr[num].emaTwoHun = "No Data";
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

        chartArr[num].emaTwoHun = arrEma[0].toFixed(2);
        arrEma.pop();
        prevDayEmaSub = 0;
      }
    } catch (e) {}

    // MACD CALLBACK -----------------------------------------------------------------------------------------------------------------------------------------
    macdCallBack(chartArr, num, macdTwelve, macdTwentySix);
  }
  // MACD FUNCTION -----------------------------------------------------------------------------------------------------------------------------------------
  function macdFunction(chartArr, num, arr1, arr2) {
    const macd = chartArr[num].emaTwelve - chartArr[num].emaTwentySix;
    chartArr[num].macd = macd.toFixed(2);
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
        (2 / 9) * (chartArr[num].macd - finalAverageMacd) + finalAverageMacd;
      chartArr[num].macdSignalLine = macdSignalLine.toFixed(2);
      // HISTORGRAM CALC ------------------------------------- IF HISTOGRAM GOES FROM NEGATIVE TO POSITIVE IT IS BULLISH
      let histogram = chartArr[num].macd - chartArr[num].macdSignalLine;
      chartArr[num].macdHistogram = histogram.toFixed(2);
      // FOR NO DATA TO PULL FROM
      if (chartArr[num].macdHistogram === "NaN") {
        chartArr[num].macdHistogram = "No Data";
      }
      if (chartArr[num].macd === "NaN") {
        chartArr[num].macd = "No Data";
      }
      if (chartArr[num].macdSignalLine === "NaN") {
        chartArr[num].macdSignalLine = "No Data";
      }
    } catch (e) {}
  }
  // RSI FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function rsiFunction(chartArr, dataPull, newestPull, num) {
    let iRSI = 13;
    let iRSIAdjusted = 14;
    let recentUpper = 0;
    let recentDowner = 0;
    let upMove = 0;
    let downMove = 0;
    let pastDownPeriod = 0;
    let pastUpPeriod = 0;

    try {
      const newPrice = newestPull[0].price;
      // CHECK TO SEE IF DATA PULL CAN PULL ENOUGH DATA TO BE EFFECTIVE
      if (dataPull.historical.length <= 14) {
        chartArr[num].rsi = "No Data";
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
        chartArr[num].rsi = rsi.toFixed(2);
      }
    } catch (e) {}
  }
  // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function stochOsc1433Function(chartArr, dataPull, newestPull, num) {
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
      let newPrice = newestPull[0].price;

      if (dataPull.historical.length < 18) {
        chartArr[num].stochasticK = "No Data";
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
        chartArr[num].stochasticK = (
          ((newPrice - lowestLow) / (highestHigh - lowestLow)) *
          100
        ).toFixed(2);

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
        chartArr[num].stochasticD = (slowD / 3).toFixed(2);

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
          chartArr[num].stochasticSignal = smaD.toFixed(2);
        } else {
          chartArr[num].stochasticSignal = smaD.toFixed(2);
        }
      }
    } catch (e) {}
  }
  // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function williamsRFunction(chartArr, dataPull, newestPull, num) {
    let highs = [];
    let lows = [];
    let lowestLow = 0;
    let highestHigh = 0;
    try {
      const newPrice = newestPull[0].price;

      if (dataPull.historical.length < 14) {
        chartArr[num].williams = "No Data";
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

        chartArr[num].williamsR = williams.toFixed(2);
      }
    } catch (e) {}
  }
  // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function cciFunction(chartArr, dataPull, newestPull, num) {
    let tpvCul = 0;
    let tpv = [];
    let tpvMa = 0;

    try {
      const newPrice = newestPull[0].price;
      let tpvCurrent = newPrice;
      const recentTpv = newPrice;

      if (dataPull.historical.length < 19) {
        chartArr[num].cciTwenty = "No Data";
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

        chartArr[num].cciTwenty = cci.toFixed(2);
      }
    } catch (e) {}
  }
  // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function bollingerBandsFunction(chartArr, dataPull, newestPull, num) {
    let smaCul = 0;
    let closeHolder = [];
    try {
      const newPrice = newestPull[0].price;

      if (dataPull.historical.length < 19) {
        chartArr[num].bbUpper = "No Data";
        chartArr[num].bbLower = "No Data";
        chartArr[num].bbMiddle = "No Data";
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

        chartArr[num].bbUpper = bbUpper.toFixed(2);
        chartArr[num].bbLower = bbLower.toFixed(2);
        chartArr[num].bbMiddle = smaTwenty.toFixed(2);
        chartArr[num].bbPercent = bbPercent.toFixed(2);
      }
    } catch (e) {}
  }
  // VWAP FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  function vwapFunction(chartArr, dataPull, num) {
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
      chartArr[num].vwap = vwap;
    } catch (e) {}
  }
  // SET VOLUME FOR LATER
  function setVolume(chartArr, dataPull, newestPull, num) {
    // SET RECENT YESTERDAY VOLUME
    try {
      if (dataPull.historical.length <= 0) {
        chartArr[num].yesterdayVolume = 0;
      } else {
        chartArr[num].yesterdayVolume = dataPull.historical[0].volume;
        if (marketDay == 0 || marketDay == 6) {
          chartArr[num].yesterdayVolume = dataPull.historical[1].volume;
        }

        if (marketDay >= 1 && marketDay <= 5 && timeNum < 930) {
          chartArr[num].yesterdayVolume = dataPull.historical[1].volume;
        }

        if (timeNum > 1830) {
          chartArr[num].yesterdayVolume = dataPull.historical[1].volume;
        }
      }
      if (newestPull.length < 0) {
        chartArr[num].volume = 0;
      } else {
        // SET RECENT VOLUME
        chartArr[num].volume = newestPull[0].volume;
      }
    } catch (e) {}
  }

  // TA INTO OBJECTS FUNCTIONS ---------------------------------------------------------------------
  async function technicalIndicators(portfolioArr, callback) {
    let j = 0;

    while (j < portfolioArr.length) {
      // LOOP FOR TECHNICAL SYMBOL

      // THIS IS THE ALL MIGHTY SYMBOL USED FOR PULLS
      const { symbol } = portfolioArr[j];

      //THIS PULL IS FOR CLOSE PRICES TO CALC TAs PAST CLOSE DATA //
      const resSMA = await fetch(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
      );
      const dataSMA = await resSMA.json(); // SMA PULL USED FOR OTHER CALCS
      // ERROR CHECK FOR EMPTY PULL
      try {
        if (!Object.keys(dataSMA).length) {
          console.log("no SMA Pull data found");
        }
      } catch (e) {}

      //THIS PULL IS FOR OSCILLATORS ALL CURRENT CLOSE DATA
      const resOscPulled = await fetch(
        `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
      );
      const dataRecentPulled = await resOscPulled.json();
      // ERROR CHECK FOR EMPTY PULL
      try {
        if (!Object.keys(dataRecentPulled).length) {
          console.log("no Recent Pull data found");
        }
      } catch (e) {}

      // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------
      const resVWAP = await fetch(
        `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
      );
      const dataVWAP = await resVWAP.json();
      // ERROR CHECK FOR EMPTY PULL
      try {
        if (!Object.keys(dataVWAP).length) {
          console.log("no VWAP Pull data found");
        }
      } catch (e) {}

      // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------
      vwapFunction(portfolioArr, dataVWAP, j);

      // SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
      smaFunction(portfolioArr, dataSMA, dataRecentPulled, j);

      // WMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
      wmaFunction(portfolioArr, dataSMA, dataRecentPulled, j);

      // VWMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
      vwmaFunction(portfolioArr, dataSMA, dataRecentPulled, j);

      // EMA WITH MACD CALLBACK ------------------------------------------------------------------------------------------------------------------------------------------
      emaFunction(portfolioArr, dataSMA, dataRecentPulled, j, macdFunction);

      // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------
      rsiFunction(portfolioArr, dataSMA, dataRecentPulled, j);

      // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
      stochOsc1433Function(portfolioArr, dataSMA, dataRecentPulled, j); //DATA VWAP USED FOR RECETN CLOSE DATA

      // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
      williamsRFunction(portfolioArr, dataSMA, dataRecentPulled, j);

      // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
      cciFunction(portfolioArr, dataSMA, dataRecentPulled, j);

      // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
      bollingerBandsFunction(portfolioArr, dataSMA, dataRecentPulled, j);

      // SET VOLUME PROPERTIES
      setVolume(portfolioArr, dataSMA, dataRecentPulled, j);

      j++; // UPDATE WHILE LOOP
    } // THIS IS THE END OF LOOP

    const returnedData = await callback(portfolioArr, buildSearchTech);

    return returnedData;
  }

  async function buildSearchTech(arr) {
    for (let i = 0; i < arr.length; i++) {
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
      } = arr[i];

      let directionArrow = "up";
      // SETS ARROW FOR UP AND DOWN --------------
      if (changesPercentage < 0) {
        arr[i].directionArrow = "down";
      } else {
        arr[i].directionArrow = "up";
      }

      // CHANGE TO POSITIVE BUT ARROW POINTS DOWN OR UP ----------
      if (change < 0) {
        arr[i].change = change * -1;
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
        arr[i].yesterdayVolIncrease = "No Data";
      }

      // ADJUST TO POSITIVE
      if (arr[i].stochasticD < 0) {
        arr[i].stochasticD = arr[i].stochasticD * -1;
      }
      if (arr[i].stochasticK < 0) {
        arr[i].stochasticK = arr[i].stochasticK * -1;
      }
      if (arr[i].stochasticD < 0) {
        arr[i].stochasticD = arr[i].stochasticD * -1;
      }
      if (arr[i].stochasticK < 0) {
        arr[i].stochasticK = arr[i].stochasticK * -1;
      }

      // ADJUST CERTAIN PARTS TO GIVE RIGHT PROMPT IF UNDEFINED

      if (arr[i].avgVolume == undefined) {
        arr[i].avgVolume = "No Data";
      }

      if (arr[i].volume == undefined) {
        arr[i].volume = "No Data";
      }

      if (arr[i].volumeIncrease == undefined) {
        arr[i].volumeIncrease = "No Data";
      }

      if (arr[i].yesterdayVolume == undefined) {
        arr[i].yesterdayVolume = "No Data";
      }

      if (arr[i].smaFiveTeen == undefined) {
        arr[i].smaFiveTeen = "No Data";
      }

      if (arr[i].smaTwenty == undefined) {
        arr[i].smaTwenty = "No Data";
      }

      if (arr[i].smaThirty == undefined) {
        arr[i].smaThirty = "No Data";
      }

      if (arr[i].smaFifty == undefined) {
        arr[i].smaFifty = "No Data";
      }

      if (arr[i].smaOneHun == undefined) {
        arr[i].smaOneHun = "No Data";
      }

      if (arr[i].smaTwoHun == undefined) {
        arr[i].smaTwoHun = "No Data";
      }

      if (arr[i].emaEight == undefined) {
        arr[i].emaEight = "No Data";
      }

      if (arr[i].emaTwelve == undefined) {
        arr[i].emaTwelve = "No Data";
      }

      if (arr[i].emaTwenty == undefined) {
        arr[i].emaTwenty = "No Data";
      }

      if (arr[i].emaTwentySix == undefined) {
        arr[i].emaTwentySix = "No Data";
      }

      if (arr[i].emaFifty == undefined) {
        arr[i].emaFifty = "No Data";
      }

      if (arr[i].emaTwoHun == undefined) {
        arr[i].emaTwoHun = "No Data";
      }

      if (arr[i].wmaFiveTeen == undefined) {
        arr[i].wmaFiveTeen = "No Data";
      }

      if (arr[i].wmaTwenty == undefined) {
        arr[i].wmaTwenty = "No Data";
      }

      if (arr[i].wmaThirty == undefined) {
        arr[i].wmaThirty = "No Data";
      }

      if (arr[i].wmaFifty == undefined) {
        arr[i].wmaFifty = "No Data";
      }

      if (arr[i].wmaOneHun == undefined) {
        arr[i].wmaOneHun = "No Data";
      }

      if (arr[i].wmaTwoHun == undefined) {
        arr[i].wmaTwoHun = "No Data";
      }

      if (arr[i].vwmaFiveTeen == undefined) {
        arr[i].vwmaFiveTeen = "No Data";
      }
      if (arr[i].vwmaTwenty == undefined) {
        arr[i].vwmaTwenty = "No Data";
      }
      if (arr[i].vwmaThirty == undefined) {
        arr[i].vwmaThirty = "No Data";
      }
      if (arr[i].vwmaFifty == undefined) {
        arr[i].vwmaFifty = "No Data";
      }
      if (arr[i].vwmaOneHun == undefined) {
        arr[i].vwmaOneHun = "No Data";
      }
      if (arr[i].vwmaTwoHun == undefined) {
        arr[i].vwmaTwoHun = "No Data";
      }

      if (arr[i].vwap == undefined) {
        arr[i].vwap = "No Data";
      }

      if (arr[i].macd == undefined) {
        arr[i].macd = "No Data";
      }

      if (arr[i].rsi == undefined) {
        arr[i].rsi = "No Data";
      }
      if (arr[i].cciTwenty == undefined) {
        arr[i].cciTwenty = "No Data";
      }

      if (arr[i].williamsR == undefined) {
        arr[i].williamsR = "No Data";
      }

      if (arr[i].stochasticK == undefined) {
        arr[i].stochasticK = "No Data";
      }
      if (arr[i].stochasticD == undefined) {
        arr[i].stochasticD = "No Data";
      }
      if (arr[i].stochasticSignal == undefined) {
        arr[i].stochasticSignal = "No Data";
      }

      if (arr[i].bbMiddle == undefined) {
        arr[i].bbMiddle = "No Data";
      }
      if (arr[i].bbLower == undefined) {
        arr[i].bbLower = "No Data";
      }
      if (arr[i].bbUpper == undefined) {
        arr[i].bbUpper = "No Data";
      }
      if (arr[i].bbPercent == undefined) {
        arr[i].bbPercent = "No Data";
      }

      // ADJUST TO POSITIVE
      if (arr[i].stochasticD < 0) {
        arr[i].stochasticD = arr[i].stochasticD * -1;
      }
      if (arr[i].stochasticK < 0) {
        arr[i].stochasticK = arr[i].stochasticK * -1;
      }
      if (arr[i].stochasticD < 0) {
        arr[i].stochasticD = arr[i].stochasticD * -1;
      }
      if (arr[i].stochasticK < 0) {
        arr[i].stochasticK = arr[i].stochasticK * -1;
      }

      arr[i].volumeIncreaseToday = volumeIncrease;
      arr[i].volumeIncreaseYesterday = yesterdayVolIncrease;
      arr[i].volumeYesterday = yesterdayVolume;
    }
    const returnedData = await arr;
    return returnedData;
  }

  const returnedData = await filterTradableSymbols(arr, technicalIndicators);


  let emptyPortObj = {
    avgVolume: 0,
    bbLower: 0,
    bbMiddle: 0,
    bbPercent: 0,
    bbUpper: 0,
    cciTwenty: 0,
    change: 0,
    changesPercentage: 0,
    dayHigh: 0,
    dayLow: 0,
    earningsAnnouncement: 0,
    emaEight: 0,
    emaFifty: 0,
    emaTwelve: 0,
    emaTwenty: 0,
    emaTwentySix: 0,
    emaTwoHun: 0,
    eps: 0,
    exchange: 0,
    macd: 0,
    macdHistogram: 0,
    macdSignalLine: 0,
    marketCap: 0,
    name: "Placeholder for lack of Symbols",
    open: 0,
    pe: 0,
    previousClose: 0,
    price: 0,
    priceAvg50: 0,
    priceAvg200: 0,
    rsi: 0,
    sharesOutstanding: 0,
    smaFifty: 0,
    smaFiveTeen: 0,
    smaOneHun: 0,
    smaThirty: 0,
    smaTwenty: 0,
    smaTwoHun: 0,
    stochasticD: 0,
    stochasticK: 0,
    stochasticSignal: 0,
    symbol: "Empty",
    timestamp: 0,
    volume: 0,
    vwap: 0,
    vwmaFifty: 0,
    vwmaFiveTeen: 0,
    vwmaOneHun: 0,
    vwmaThirty: 0,
    vwmaTwenty: 0,
    vwmaTwoHun: 0,
    williamsR: 0,
    wmaFifty: 0,
    wmaFiveTeen: 0,
    wmaOneHun: 0,
    wmaThirty: 0,
    wmaTwenty: 0,
    wmaTwoHun: 0,
    yearHigh: 0,
    yearLow: 0,
    yesterdayVolume: 0,
  };

  if (returnedData.length < 10) {
    while (returnedData.length < 10) {
      returnedData.push(emptyPortObj)
    }
  } 
  
  return returnedData;
};
