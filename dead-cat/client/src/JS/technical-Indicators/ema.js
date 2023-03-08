  // EMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  export function emaFunction(chartArr, dataPull, newestPull, num, macdCallBack) {
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
          (2 / 27) * (dataPull.historical[emaTwentySix].close - subEMA) + subEMA;
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