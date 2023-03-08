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

  module.exports = {smaFunction}