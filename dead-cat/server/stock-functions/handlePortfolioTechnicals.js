import { handleDate } from "./functions/handleDate";
import { nyseFetch } from "./functions/nyseFetch";
import { nasdaqFetch } from "./functions/nasdaqFetch";

export const technicalAnalysis = async () => {

  // SET DATE
  await handleDate()
           
    // ---------------------- FILTERS TRADABLE SYMBOLS THAT HAVE DROPPED BELOW THE THRESHOLD -------------------------------------
    async function filterTradableSymbols(arr1, arr2, compileCallback) {
      let nyseHolderDown = []; //THESE ARRS NEED TO BE ACCESSIBLE TO COMPILE CALLBACK
      let nyseHolderUp = []; //THESE ARRS NEED TO BE ACCESSIBLE TO COMPILE CALLBACK
      let nasdaqHolderDown = [];
      let nasdaqHolderUp = [];

          try {
        // PULL NYSE DATA
        await nyseFetch(nyseHolderUp, nyseHolderDown)
        console.log(nyseHolderUp, nyseHolderDown)
      //PULL NASDAQ DATA
        await nasdaqFetch()
            //--------- CATCH
          } catch (e) {}
        
    
      const returnedData = await compileCallback(
        nasdaqHolderDown,
        nyseHolderDown,
        nyseHolderUp,
        nasdaqHolderUp,
        technicalIndicators
      ); // CALLBACK FOR STOCK FILTER
      return returnedData;
    }



    async function compileStocks(arr1, arr2, arr3, arr4, callback) {
      //---------------------- COMBINE AND SORT LARGEST DROP -------------------------
      let finalChartFatDown = []; // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT
      let finalChartFatUp = []; // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT
      let finalChart = []; // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT
      // ------- THIS IS A FILTER FOR WEIRD STOCK SYMBOLS THAT SLIP IN ----------
    
      let combinedStockDrop = [];
      combinedStockDrop = combinedStockDrop.concat(arr1, arr2);
    
      let combinedStockUp = [];
      combinedStockUp = combinedStockUp.concat(arr3, arr4);
    
      const keys = /^[A-Z]{1,4}$/g;
      finalChartFatDown = combinedStockDrop.filter((stock) => {
        return stock.symbol.match(keys);
      });
    
      finalChartFatUp = combinedStockUp.filter((stock) => {
        return stock.symbol.match(keys);
      });
    
      for (let i = 0; i < finalChartFatDown.length; i++) {
        finalChartFatDown.sort((a, b) => {
          return a.changesPercentage - b.changesPercentage;
        });
      }
    
      for (let i = 0; i < finalChartFatUp.length; i++) {
        finalChartFatUp.sort((a, b) => {
          return b.changesPercentage - a.changesPercentage;
        });
      }
      // MAKE SURE ARR HAS RIGHT LENGTH TO LOAD ------------
      const holderObjDown = {
        avgVolume: -1,
        bbLower: "-1",
        bbMiddle: "-1",
        bbPercent: "-1",
        bbUpper: "-1",
        cciTwenty: "-1",
        change: -1,
        changesPercentage: -1,
        dayHigh: -1,
        dayLow: -1,
        earningsAnnouncement: "-1",
        emaEight: "-1",
        emaFifty: "-1",
        emaTwelve: "-1",
        emaTwenty: "-1",
        emaTwentySix: "-1",
        emaTwoHun: "-1",
        eps: -1,
        exchange: "No Data",
        macd: "-1",
        macdHistogram: "-1",
        macdSignalLine: "-1",
        marketCap: -1,
        name: "Placeholder for lack of Symbols",
        open: -1,
        pe: -1,
        previousClose: -1,
        price: 1,
        priceAvg50: -1,
        priceAvg200: -1,
        rsi: "-1",
        sharesOutstanding: -1,
        smaFifty: "-1",
        smaFiveTeen: "-1",
        smaOneHun: "-1",
        smaThirty: "-1",
        smaTwenty: "-1",
        smaTwoHun: "-1",
        stochasticD: "-1",
        stochasticK: "-1",
        stochasticSignal: "-1",
        symbol: "No Data",
        timestamp: -1,
        volume: -1,
        vwap: "-1",
        vwmaFifty: "-1",
        vwmaFiveTeen: "-1",
        vwmaOneHun: "-1",
        vwmaThirty: "-1",
        vwmaTwenty: "-1",
        vwmaTwoHun: "-1",
        williamsR: "-1",
        wmaFifty: "-1",
        wmaFiveTeen: "-1",
        wmaOneHun: "-1",
        wmaThirty: "-1",
        wmaTwenty: "-1",
        wmaTwoHun: "-1",
        yearHigh: -1,
        yearLow: -1,
        yesterdayVolume: -1,
      };
      const holderObjUp = {
        avgVolume: 1,
        bbLower: "1",
        bbMiddle: "1",
        bbPercent: "1",
        bbUpper: "1",
        cciTwenty: "1",
        change: 1,
        changesPercentage: 1,
        dayHigh: 1,
        dayLow: 1,
        earningsAnnouncement: "1",
        emaEight: "1",
        emaFifty: "1",
        emaTwelve: "1",
        emaTwenty: "1",
        emaTwentySix: "1",
        emaTwoHun: "1",
        eps: 1,
        exchange: "No Data",
        macd: "1",
        macdHistogram: "1",
        macdSignalLine: "1",
        marketCap: 1,
        name: "Placeholder for lack of Symbols",
        open: 1,
        pe: 1,
        previousClose: 1,
        price: 1,
        priceAvg50: 1,
        priceAvg200: 1,
        rsi: "1",
        sharesOutstanding: 1,
        smaFifty: "1",
        smaFiveTeen: "1",
        smaOneHun: "1",
        smaThirty: "1",
        smaTwenty: "1",
        smaTwoHun: "1",
        stochasticD: "1",
        stochasticK: "1",
        stochasticSignal: "1",
        symbol: "No Data",
        timestamp: 1,
        volume: 1,
        vwap: "1",
        vwmaFifty: "1",
        vwmaFiveTeen: "1",
        vwmaOneHun: "1",
        vwmaThirty: "1",
        vwmaTwenty: "1",
        vwmaTwoHun: "1",
        williamsR: "1",
        wmaFifty: "1",
        wmaFiveTeen: "1",
        wmaOneHun: "1",
        wmaThirty: "1",
        wmaTwenty: "1",
        wmaTwoHun: "1",
        yearHigh: 1,
        yearLow: 1,
        yesterdayVolume: 1,
      };
    
      if (finalChartFatUp.length < 5) {
        while (finalChartFatUp.length < 5) {
          finalChartFatUp.push(holderObjUp);
        }
      }
      if (finalChartFatDown.length < 5) {
        while (finalChartFatDown.length < 5) {
          finalChartFatDown.push(holderObjDown);
        }
      }
      // SLIM CHAT DOWN SO IT'S NOT BLOATED
      let slimChartDown = 4;
      while (slimChartDown >= 0) {
        finalChart.unshift(finalChartFatDown[slimChartDown]);
        slimChartDown--;
      }
    
      let slimChartUp = 4;
      while (slimChartUp >= 0) {
        finalChart.unshift(finalChartFatUp[slimChartUp]);
        slimChartUp--;
      }
    
      const returnedData = await callback(finalChart, filterUpDownStocks);
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
              price = 0
            }
            volume = dataPull.historical[i].volume;
            if (volume == undefined) {
              volume = 0
            }
            totalCul += price * volume;
            if (isNaN(totalCul)) {
              return
            }
            volCul += dataPull.historical[i].volume;
            if (isNaN(volCul)) {
              return
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
              price = 0
            }
            volume = dataPull.historical[i].volume;
            if (volume == undefined) {
              volume = 0
            }
            totalCul += price * volume;
            if (isNaN(totalCul)) {
              return
            }
            volCul += dataPull.historical[i].volume;
            if (isNaN(volCul)) {
              return
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
              price = 0
            }
            volume = dataPull.historical[i].volume;
            if (volume == undefined) {
              volume = 0
            }
            totalCul += price * volume;
            if (isNaN(totalCul)) {
              return
            }
            volCul += dataPull.historical[i].volume;
            if (isNaN(volCul)) {
              return
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
              price = 0
            }
            volume = dataPull.historical[i].volume;
            if (volume == undefined) {
              volume = 0
            }
            totalCul += price * volume;
            if (isNaN(totalCul)) {
              return
            }
            volCul += dataPull.historical[i].volume;
            if (isNaN(volCul)) {
              return
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
              price = 0
            }
            volume = dataPull.historical[i].volume;
            if (volume == undefined) {
              volume = 0
            }
            totalCul += price * volume;
            if (isNaN(totalCul)) {
              return
            }
            volCul += dataPull.historical[i].volume;
            if (isNaN(volCul)) {
              return
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
              price = 0
            }
            volume = dataPull.historical[i].volume;
            if (volume == undefined) {
              volume = 0
            }
            totalCul += price * volume;
            if (isNaN(totalCul)) {
              return
            }
            volCul += dataPull.historical[i].volume;
            if (isNaN(volCul)) {
              return
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
      } catch (e) {
      }
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
    async function technicalIndicators(finalArr, callback) {
      let j = 0;
    
      while (j < finalArr.length) {
        // LOOP FOR TECHNICAL SYMBOL
    
        // THIS IS THE ALL MIGHTY SYMBOL USED FOR PULLS
        const { symbol } = finalArr[j];
    
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
        vwapFunction(finalArr, dataVWAP, j);
    
        // SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        smaFunction(finalArr, dataSMA, dataRecentPulled, j);
    
        // WMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        wmaFunction(finalArr, dataSMA, dataRecentPulled, j);
    
        // VWMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        vwmaFunction(finalArr, dataSMA, dataRecentPulled, j);
    
        // EMA WITH MACD CALLBACK ------------------------------------------------------------------------------------------------------------------------------------------
        emaFunction(finalArr, dataSMA, dataRecentPulled, j, macdFunction);
    
        // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        rsiFunction(finalArr, dataSMA, dataRecentPulled, j);
    
        // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        stochOsc1433Function(finalArr, dataSMA, dataRecentPulled, j); //DATA VWAP USED FOR RECETN CLOSE DATA
    
        // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        williamsRFunction(finalArr, dataSMA, dataRecentPulled, j);
    
        // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        cciFunction(finalArr, dataSMA, dataRecentPulled, j);
    
        // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        bollingerBandsFunction(finalArr, dataSMA, dataRecentPulled, j);
    
        // SET VOLUME PROPERTIES
        setVolume(finalArr, dataSMA, dataRecentPulled, j);
    
        j++; // UPDATE WHILE LOOP
      } // THIS IS THE END OF LOOP
      const returnedData = await callback(finalArr, buildIt);
      return returnedData;
      
    }
    async function filterUpDownStocks(finalArr, callback) {
      let stocksUp = [];
      let stocksDown = [];
    
      let j = 0;
    
      while (j < finalArr.length) {
        const { changesPercentage } = finalArr[j];
    
        if (changesPercentage > 0) {
          stocksUp.push(finalArr[j]);
        } else {
          stocksDown.push(finalArr[j]);
        }
    
        j++;
      } // END OF FILTER LOOP TO NEW UP/DOWN ARR
    
      // REASSIGN OBJECT NAMES FOR UP AND DOWN STOCKS
      for (let i = 0; i < stocksUp.length; i++) {
        // UPPER ------------------------------------------------------------------------------
        stocksUp[i].symbolUp = stocksUp[i].symbol;
        delete stocksUp[i].symbol;
        stocksUp[i].changeUp = stocksUp[i].change;
        delete stocksUp[i].change;
        stocksUp[i].avgVolumeUp = stocksUp[i].avgVolume;
        delete stocksUp[i].avgVolume;
        stocksUp[i].changesPercentageUp = stocksUp[i].changesPercentage;
        delete stocksUp[i].changesPercentage;
        stocksUp[i].emaEightUp = stocksUp[i].emaEight;
        delete stocksUp[i].emaEight;
        stocksUp[i].emaTwelveUp = stocksUp[i].emaTwelve;
        delete stocksUp[i].emaTwelve;
        stocksUp[i].emaTwentyUp = stocksUp[i].emaTwenty;
        delete stocksUp[i].emaTwenty;
        stocksUp[i].emaTwentySixUp = stocksUp[i].emaTwentySix;
        delete stocksUp[i].emaTwentySix;
        stocksUp[i].emaFiftyUp = stocksUp[i].emaFifty;
        delete stocksUp[i].emaFifty;
        stocksUp[i].emaTwoHunUp = stocksUp[i].emaTwoHun;
        delete stocksUp[i].emaTwoHun;
        stocksUp[i].macdUp = stocksUp[i].macd;
        delete stocksUp[i].macd;
        stocksUp[i].macdHistogramUp = stocksUp[i].macdHistogram;
        delete stocksUp[i].macdHistogram;
        stocksUp[i].macdSignalLineUp = stocksUp[i].macdSignalLine;
        delete stocksUp[i].macdSignalLine;
        stocksUp[i].priceUp = stocksUp[i].price;
        delete stocksUp[i].price;
        stocksUp[i].rsiUp = stocksUp[i].rsi;
        delete stocksUp[i].rsi;
        stocksUp[i].smaFiveTeenUp = stocksUp[i].smaFiveTeen;
        delete stocksUp[i].smaFiveTeen;
        stocksUp[i].smaTwentyUp = stocksUp[i].smaTwenty;
        delete stocksUp[i].smaTwenty;
        stocksUp[i].smaThirtyUp = stocksUp[i].smaThirty;
        delete stocksUp[i].smaThirty;
        stocksUp[i].smaFiftyUp = stocksUp[i].smaFifty;
        delete stocksUp[i].smaFifty;
        stocksUp[i].smaOneHunUp = stocksUp[i].smaOneHun;
        delete stocksUp[i].smaOneHun;
        stocksUp[i].smaTwoHunUp = stocksUp[i].smaTwoHun;
        delete stocksUp[i].smaTwoHun;
        stocksUp[i].volumeUp = stocksUp[i].volume;
        delete stocksUp[i].volume;
        stocksUp[i].volumeYesterdayUp = stocksUp[i].yesterdayVolume;
        delete stocksUp[i].yesterdayVolume;
        stocksUp[i].vwapUp = stocksUp[i].vwap;
        delete stocksUp[i].vwap;
        stocksUp[i].stochasticDUp = stocksUp[i].stochasticD;
        delete stocksUp[i].stochasticD;
        stocksUp[i].stochasticKUp = stocksUp[i].stochasticK;
        delete stocksUp[i].stochasticK;
        stocksUp[i].stochasticSignalUp = stocksUp[i].stochasticSignal;
        delete stocksUp[i].stochasticSignal;
        stocksUp[i].wmaFiveTeenUp = stocksUp[i].wmaFiveTeen;
        delete stocksUp[i].wmaFiveTeen;
        stocksUp[i].wmaTwentyUp = stocksUp[i].wmaTwenty;
        delete stocksUp[i].wmaTwenty;
        stocksUp[i].wmaThirtyUp = stocksUp[i].wmaThirty;
        delete stocksUp[i].wmaThirty;
        stocksUp[i].wmaFiftyUp = stocksUp[i].wmaFifty;
        delete stocksUp[i].wmaFifty;
        stocksUp[i].wmaOneHunUp = stocksUp[i].wmaOneHun;
        delete stocksUp[i].wmaOneHun;
        stocksUp[i].wmaTwoHunUp = stocksUp[i].wmaTwoHun;
        delete stocksUp[i].wmaTwoHun;
        stocksUp[i].vwmaFiveTeenUp = stocksUp[i].vwmaFiveTeen;
        delete stocksUp[i].vwmaFiveTeen;
        stocksUp[i].vwmaTwentyUp = stocksUp[i].vwmaTwenty;
        delete stocksUp[i].vwmaTwenty;
        stocksUp[i].vwmaThirtyUp = stocksUp[i].vwmaThirty;
        delete stocksUp[i].vwmaThirty;
        stocksUp[i].vwmaFiftyUp = stocksUp[i].vwmaFifty;
        delete stocksUp[i].vwmaFifty;
        stocksUp[i].vwmaOneHunUp = stocksUp[i].vwmaOneHun;
        delete stocksUp[i].vwmaOneHun;
        stocksUp[i].vwmaTwoHunUp = stocksUp[i].vwmaTwoHun;
        delete stocksUp[i].vwmaTwoHun;
        stocksUp[i].williamsRUp = stocksUp[i].williamsR;
        delete stocksUp[i].williamsR;
        stocksUp[i].cciUp = stocksUp[i].cciTwenty;
        delete stocksUp[i].cciTwenty;
        stocksUp[i].bbUpperUp = stocksUp[i].bbUpper;
        delete stocksUp[i].bbUpper;
        stocksUp[i].bbLowerUp = stocksUp[i].bbLower;
        delete stocksUp[i].bbLower;
        stocksUp[i].bbMiddleUp = stocksUp[i].bbMiddle;
        delete stocksUp[i].bbMiddle;
        stocksUp[i].bbPercentUp = stocksUp[i].bbPercent;
        delete stocksUp[i].bbPercent;
        // DOWNERS ------------------------------------------------------------------------------
        stocksDown[i].symbolDown = stocksDown[i].symbol;
        delete stocksDown[i].symbol;
        stocksDown[i].changeDown = stocksDown[i].change;
        delete stocksDown[i].change;
        stocksDown[i].avgVolumeDown = stocksDown[i].avgVolume;
        delete stocksDown[i].avgVolume;
        stocksDown[i].changesPercentageDown = stocksDown[i].changesPercentage;
        delete stocksDown[i].changesPercentage;
        stocksDown[i].emaEightDown = stocksDown[i].emaEight;
        delete stocksDown[i].emaEight;
        stocksDown[i].emaTwelveDown = stocksDown[i].emaTwelve;
        delete stocksDown[i].emaTwelve;
        stocksDown[i].emaTwentyDown = stocksDown[i].emaTwenty;
        delete stocksDown[i].emaTwenty;
        stocksDown[i].emaTwentySixDown = stocksDown[i].emaTwentySix;
        delete stocksDown[i].emaTwentySix;
        stocksDown[i].emaFiftyDown = stocksDown[i].emaFifty;
        delete stocksDown[i].emaFifty;
        stocksDown[i].emaTwoHunDown = stocksDown[i].emaTwoHun;
        delete stocksDown[i].emaTwoHun;
        stocksDown[i].macdDown = stocksDown[i].macd;
        delete stocksDown[i].macd;
        stocksDown[i].macdHistogramDown = stocksDown[i].macdHistogram;
        delete stocksDown[i].macdHistogram;
        stocksDown[i].macdSignalLineDown = stocksDown[i].macdSignalLine;
        delete stocksDown[i].macdSignalLine;
        stocksDown[i].priceDown = stocksDown[i].price;
        delete stocksDown[i].price;
        stocksDown[i].rsiDown = stocksDown[i].rsi;
        delete stocksDown[i].rsi;
        stocksDown[i].smaFiveTeenDown = stocksDown[i].smaFiveTeen;
        delete stocksDown[i].smaFiveTeen;
        stocksDown[i].smaTwentyDown = stocksDown[i].smaTwenty;
        delete stocksDown[i].smaTwenty;
        stocksDown[i].smaThirtyDown = stocksDown[i].smaThirty;
        delete stocksDown[i].smaThirty;
        stocksDown[i].smaFiftyDown = stocksDown[i].smaFifty;
        delete stocksDown[i].smaFifty;
        stocksDown[i].smaOneHunDown = stocksDown[i].smaOneHun;
        delete stocksDown[i].smaOneHun;
        stocksDown[i].smaTwoHunDown = stocksDown[i].smaTwoHun;
        delete stocksDown[i].smaTwoHun;
        stocksDown[i].volumeDown = stocksDown[i].volume;
        delete stocksDown[i].volume;
        stocksDown[i].volumeYesterdayDown = stocksDown[i].yesterdayVolume;
        delete stocksDown[i].yesterdayVolume;
        stocksDown[i].vwapDown = stocksDown[i].vwap;
        delete stocksDown[i].vwap;
        stocksDown[i].stochasticDDown = stocksDown[i].stochasticD;
        delete stocksDown[i].stochasticD;
        stocksDown[i].stochasticKDown = stocksDown[i].stochasticK;
        delete stocksDown[i].stochasticK;
        stocksDown[i].stochasticSignalDown = stocksDown[i].stochasticSignal;
        delete stocksDown[i].stochasticSignal;
        stocksDown[i].wmaFiveTeenDown = stocksDown[i].wmaFiveTeen;
        delete stocksDown[i].wmaFiveTeen;
        stocksDown[i].wmaTwentyDown = stocksDown[i].wmaTwenty;
        delete stocksDown[i].wmaTwenty;
        stocksDown[i].wmaThirtyDown = stocksDown[i].wmaThirty;
        delete stocksDown[i].wmaThirty;
        stocksDown[i].wmaFiftyDown = stocksDown[i].wmaFifty;
        delete stocksDown[i].wmaFifty;
        stocksDown[i].wmaOneHunDown = stocksDown[i].wmaOneHun;
        delete stocksDown[i].wmaOneHun;
        stocksDown[i].wmaTwoHunDown = stocksDown[i].wmaTwoHun;
        delete stocksDown[i].wmaTwoHun;
        stocksDown[i].vwmaFiveTeenDown = stocksDown[i].vwmaFiveTeen;
        delete stocksDown[i].vwmaFiveTeen;
        stocksDown[i].vwmaTwentyDown = stocksDown[i].vwmaTwenty;
        delete stocksDown[i].vwmaTwenty;
        stocksDown[i].vwmaThirtyDown = stocksDown[i].vwmaThirty;
        delete stocksDown[i].vwmaThirty;
        stocksDown[i].vwmaFiftyDown = stocksDown[i].vwmaFifty;
        delete stocksDown[i].vwmaFifty;
        stocksDown[i].vwmaOneHunDown = stocksDown[i].vwmaOneHun;
        delete stocksDown[i].vwmaOneHun;
        stocksDown[i].vwmaTwoHunDown = stocksDown[i].vwmaTwoHun;
        delete stocksDown[i].vwmaTwoHun;
        stocksDown[i].williamsRDown = stocksDown[i].williamsR;
        delete stocksDown[i].williamsR;
        stocksDown[i].cciDown = stocksDown[i].cciTwenty;
        delete stocksDown[i].cciTwenty;
        stocksDown[i].bbUpperDown = stocksDown[i].bbUpper;
        delete stocksDown[i].bbUpper;
        stocksDown[i].bbLowerDown = stocksDown[i].bbLower;
        delete stocksDown[i].bbLower;
        stocksDown[i].bbMiddleDown = stocksDown[i].bbMiddle;
        delete stocksDown[i].bbMiddle;
        stocksDown[i].bbPercentDown = stocksDown[i].bbPercent;
        delete stocksDown[i].bbPercent;
      }
      const returnedData = await callback(stocksUp, stocksDown);
      return returnedData;
    }
    function buildIt(arrUp, arrDown) {
      for (let i = 0; i < arrUp.length; i++) {
        // DECONSTRUCTING UP AND DOWN VAR
       var {
          avgVolumeUp,
          volumeYesterdayUp,
          changeUp,
          changesPercentageUp,
          priceUp,
          symbolUp,
          volumeUp,
          vwapUp,
          smaFiveTeenUp,
          smaTwentyUp,
          smaThirtyUp,
          smaFiftyUp,
          smaOneHunUp,
          smaTwoHunUp,
          emaEightUp,
          emaTwelveUp,
          emaTwentyUp,
          emaTwentySixUp,
          emaFiftyUp,
          emaTwoHunUp,
          wmaFiveTeenUp,
          wmaTwentyUp,
          wmaThirtyUp,
          wmaFiftyUp,
          wmaOneHunUp,
          wmaTwoHunUp,
          vwmaFiveTeenUp,
          vwmaTwentyUp,
          vwmaThirtyUp,
          vwmaFiftyUp,
          vwmaOneHunUp,
          vwmaTwoHunUp,
          macdUp,
          macdHistogramUp,
          macdSignalLineUp,
          rsiUp,
          stochasticDUp,
          stochasticKUp,
          stochasticSignalUp,
          cciUp,
          bbMiddleUp,
          bbLowerUp,
          bbUpperUp,
          bbPercentUp,
          williamsRUp,
        } = arrUp[i];
        var {
          avgVolumeDown,
          volumeYesterdayDown,
          changeDown,
          changesPercentageDown,
          priceDown,
          symbolDown,
          volumeDown,
          vwapDown,
          smaFiveTeenDown,
          smaTwentyDown,
          smaThirtyDown,
          smaFiftyDown,
          smaOneHunDown,
          smaTwoHunDown,
          emaEightDown,
          emaTwelveDown,
          emaTwentyDown,
          emaTwentySixDown,
          emaFiftyDown,
          emaTwoHunDown,
          wmaFiveTeenDown,
          wmaTwentyDown,
          wmaThirtyDown,
          wmaFiftyDown,
          wmaOneHunDown,
          wmaTwoHunDown,
          vwmaFiveTeenDown,
          vwmaTwentyDown,
          vwmaThirtyDown,
          vwmaFiftyDown,
          vwmaOneHunDown,
          vwmaTwoHunDown,
          macdDown,
          macdHistogramDown,
          macdSignalLineDown,
          rsiDown,
          stochasticDDown,
          stochasticKDown,
          stochasticSignalDown,
          cciDown,
          bbMiddleDown,
          bbLowerDown,
          bbUpperDown,
          bbPercentDown,
          williamsRDown,
        } = arrDown[i];
    
        // ADJUST TO FIXED --------------------------------------------------------
        if (arrUp[i].priceUp == undefined) {
          arrUp[i].priceUp = 0;
        }
        if (arrDown[i].priceDown == undefined) {
          arrDown[i].priceDown = 0;
        }
    
        priceUp = priceUp.toFixed(2);
        priceDown = priceDown.toFixed(2);
        if (arrUp[i].changesPercentageUp == undefined) {
          arrUp[i].changesPercentageUp = 0;
        }
        if (arrDown[i].changesPercentageDown == undefined) {
          arrDown[i].changesPercentageDown = 0;
        }
        changesPercentageUp = changesPercentageUp.toFixed(2);
        changesPercentageDown = changesPercentageDown.toFixed(2);
    
        if (arrUp[i].changeUp == undefined) {
          arrUp[i].changeUp = 0;
        }
        if (arrDown[i].changeDown == undefined) {
          arrDown[i].changeDown = 0;
        }
        changeUp = changeUp.toFixed(2);
        changeDown = changeDown.toFixed(2);
        // UP VOLUME INCREASE ----------------------------
        if (arrUp[i].volumeUp == undefined) {
          arrUp[i].volumeUp = 0;
        }
        if (arrDown[i].volumeDown == undefined) {
          arrDown[i].volumeDown = 0;
        }
    
        var volumeIncreaseUp = 0;
    
        if (volumeUp > avgVolumeUp) {
          let increase = volumeUp - avgVolumeUp;
          volumeIncreaseUp = (increase / avgVolumeUp) * 100;
        } else {
          let decrease = avgVolumeUp - volumeUp;
          volumeIncreaseUp = (decrease / avgVolumeUp) * -100;
        }
        // DOWN VOLUME INCREASE ----------------------------
        var volumeIncreaseDown = 0;
    
        if (volumeDown > avgVolumeDown) {
          let increase = volumeDown - avgVolumeDown;
          volumeIncreaseDown = (increase / avgVolumeDown) * 100;
        } else {
          let decrease = avgVolumeDown - volumeDown;
          volumeIncreaseDown = (decrease / avgVolumeDown) * -100;
        }
    
        volumeIncreaseDown = volumeIncreaseDown.toFixed(2);
        volumeIncreaseUp = volumeIncreaseUp.toFixed(2);
    
        // TO GET AVERAGE DAILY VOLUME FOR YESTERDAY ----------------
    
        // YESTERDAY UP VOLUME INCREASE ----------------------------
        if (arrUp[i].volumeYesterdayUp == undefined) {
          arrUp[i].volumeYesterdayUp = 0;
        }
        if (volumeYesterdayDown == undefined) {
          volumeYesterdayDown = 0;
        }
        if (arrUp[i].avgVolumeUp == undefined) {
          arrUp[i].avgVolumeUp = 0;
        }
        if (arrDown[i].avgVolumeDown == undefined) {
          arrDown[i].avgVolumeDown = 0;
        }
        var yesterdayVolIncreaseUp = 0;
    
        if (volumeYesterdayUp > avgVolumeUp) {
          let increase = volumeYesterdayUp - avgVolumeUp;
          yesterdayVolIncreaseUp = (increase / avgVolumeUp) * 100;
        } else {
          let decrease = avgVolumeUp - volumeYesterdayUp;
          yesterdayVolIncreaseUp = (decrease / avgVolumeUp) * -100;
        }
    
        yesterdayVolIncreaseUp = yesterdayVolIncreaseUp.toFixed(2);
    
        // YESTERDAY DOWN VOLUME INCREASE ----------------------------
    
        var yesterdayVolIncreaseDown = 0;
    
        if (volumeYesterdayDown > avgVolumeDown) {
          let increase = volumeYesterdayDown - avgVolumeDown;
          yesterdayVolIncreaseDown = (increase / avgVolumeDown) * 100;
        } else {
          let decrease = avgVolumeDown - volumeYesterdayDown;
          yesterdayVolIncreaseDown = (decrease / avgVolumeDown) * -100;
        }
    
        yesterdayVolIncreaseDown = yesterdayVolIncreaseDown.toFixed(2);
    
        // ADJUST PERCENTAGE TO POSITIVE - ARROW WILL SIGNAL UP OR DOWN
    
        var changeDownAdjusted = changeDown;
    
        if (changeDownAdjusted < 0) {
          changeDownAdjusted = changeDownAdjusted * -1;
          changeDownAdjusted = changeDownAdjusted.toFixed(2);
        }
        // NaN CHECK ----------------------------------------
        if (isNaN(yesterdayVolIncreaseDown)) {
          yesterdayVolIncreaseDown = "No Data";
        }
        if (isNaN(yesterdayVolIncreaseUp)) {
          yesterdayVolIncreaseUp = "No Data";
        }
        // ADJUST TO POSITIVE
        if (stochasticDUp < 0) {
          stochasticDUp = stochasticDUp * -1;
        }
        if (stochasticKUp < 0) {
          stochasticKUp = stochasticKUp * -1;
        }
        if (stochasticDDown < 0) {
          stochasticDDown = stochasticDDown * -1;
        }
        if (stochasticKDown < 0) {
          stochasticKDown = stochasticKDown * -1;
        }
        // ADJUST CERTAIN PARTS TO GIVE RIGHT PROMPT IF UNDEFINED
        if (arrUp[i].avgVolumeUp == undefined) {
          arrUp[i].avgVolumeUp = "No Data";
        }
        if (arrDown[i].avgVolumeDown == undefined) {
          arrDown[i].avgVolumeDown = "No Data";
        }
        if (arrUp[i].volumeUp == undefined) {
          arrUp[i].volumeUp = "No Data";
        }
        if (arrDown[i].volumeDown == undefined) {
          arrDown[i].volumeDown = "No Data";
        }
        if (arrUp[i].volumeIncreaseUp == undefined) {
          arrUp[i].volumeIncreaseUp = "No Data";
        }
        if (arrDown[i].volumeIncreaseDown == undefined) {
          arrDown[i].volumeIncreaseDown = "No Data";
        }
        if (arrUp[i].volumeYesterdayUp == undefined) {
          arrUp[i].volumeYesterdayUp = "No Data";
        }
        if (arrDown[i].volumeYesterdayDown == undefined) {
          arrDown[i].volumeYesterdayDown = "No Data";
        }
    
        if (arrUp[i].smaFiveTeenUp == undefined) {
          arrUp[i].smaFiveTeenUp = "No Data";
        }
        if (arrDown[i].smaFiveTeenDown == undefined) {
          arrDown[i].smaFiveTeenDown = "No Data";
        }
        if (arrUp[i].smaTwentyUp == undefined) {
          arrUp[i].smaTwentyUp = "No Data";
        }
        if (arrDown[i].smaTwentyDown == undefined) {
          arrDown[i].smaTwentyDown = "No Data";
        }
        if (arrUp[i].smaThirtyUp == undefined) {
          arrUp[i].smaThirtyUp = "No Data";
        }
        if (arrDown[i].smaThirtyDown == undefined) {
          arrDown[i].smaThirtyDown = "No Data";
        }
        if (arrUp[i].smaFiftyUp == undefined) {
          arrUp[i].smaFiftyUp = "No Data";
        }
        if (arrDown[i].smaFiftyDown == undefined) {
          arrDown[i].smaFiftyDown = "No Data";
        }
        if (arrUp[i].smaOneHunUp == undefined) {
          arrUp[i].smaOneHunUp = "No Data";
        }
        if (arrDown[i].smaOneHunDown == undefined) {
          arrDown[i].smaOneHunDown = "No Data";
        }
        if (arrUp[i].smaTwoHunUp == undefined) {
          arrUp[i].smaTwoHunUp = "No Data";
        }
        if (arrDown[i].smaTwoHunDown == undefined) {
          arrDown[i].smaTwoHunDown = "No Data";
        }
    
        if (arrUp[i].emaEightUp == undefined) {
          arrUp[i].emaEightUp = "No Data";
        }
        if (arrDown[i].emaEightDown == undefined) {
          arrDown[i].emaEightDown = "No Data";
        }
        if (arrUp[i].emaTwelveUp == undefined) {
          arrUp[i].emaTwelveUp = "No Data";
        }
        if (arrDown[i].emaTwelveDown == undefined) {
          arrDown[i].emaTwelveDown = "No Data";
        }
        if (arrUp[i].emaTwentyUp == undefined) {
          arrUp[i].emaTwentyUp = "No Data";
        }
        if (arrDown[i].emaTwentyDown == undefined) {
          arrDown[i].emaTwentyDown = "No Data";
        }
        if (arrUp[i].emaTwentySixUp == undefined) {
          arrUp[i].emaTwentySixUp = "No Data";
        }
        if (arrDown[i].emaTwentySixDown == undefined) {
          arrDown[i].emaTwentySixDown = "No Data";
        }
        if (arrUp[i].emaFiftyUp == undefined) {
          arrUp[i].emaFiftyUp = "No Data";
        }
        if (arrDown[i].emaFiftyDown == undefined) {
          arrDown[i].emaFiftyDown = "No Data";
        }
        if (arrUp[i].emaTwoHunUp == undefined) {
          arrUp[i].emaTwoHunUp = "No Data";
        }
        if (arrDown[i].emaTwoHunDown == undefined) {
          arrDown[i].emaTwoHunDown = "No Data";
        }
    
        if (arrUp[i].wmaFiveTeenUp == undefined) {
          arrUp[i].wmaFiveTeenUp = "No Data";
        }
        if (arrDown[i].wmaFiveTeenDown == undefined) {
          arrDown[i].wmaFiveTeenDown = "No Data";
        }
        if (arrUp[i].wmaTwentyUp == undefined) {
          arrUp[i].wmaTwentyUp = "No Data";
        }
        if (arrDown[i].wmaTwentyDown == undefined) {
          arrDown[i].wmaTwentyDown = "No Data";
        }
        if (arrUp[i].wmaThirtyUp == undefined) {
          arrUp[i].wmaThirtyUp = "No Data";
        }
        if (arrDown[i].wmaThirtyDown == undefined) {
          arrDown[i].wmaThirtyDown = "No Data";
        }
        if (arrUp[i].wmaFiftyUp == undefined) {
          arrUp[i].wmaFiftyUp = "No Data";
        }
        if (arrDown[i].wmaFiftyDown == undefined) {
          arrDown[i].wmaFiftyDown = "No Data";
        }
        if (arrUp[i].wmaOneHunUp == undefined) {
          arrUp[i].wmaOneHunUp = "No Data";
        }
        if (arrDown[i].wmaOneHunDown == undefined) {
          arrDown[i].wmaOneHunDown = "No Data";
        }
        if (arrUp[i].wmaTwoHunUp == undefined) {
          arrUp[i].wmaTwoHunUp = "No Data";
        }
        if (arrDown[i].wmaTwoHunDown == undefined) {
          arrDown[i].wmaTwoHunDown = "No Data";
        }
    
        if (arrUp[i].vwmaFiveTeenUp == undefined) {
          arrUp[i].vwmaFiveTeenUp = "No Data";
        }
        if (arrDown[i].vwmaFiveTeenDown == undefined) {
          arrDown[i].vwmaFiveTeenDown = "No Data";
        }
        if (arrUp[i].vwmaTwentyUp == undefined) {
          arrUp[i].vwmaTwentyUp = "No Data";
        }
        if (arrDown[i].vwmaTwentyDown == undefined) {
          arrDown[i].vwmaTwentyDown = "No Data";
        }
        if (arrUp[i].vwmaThirtyUp == undefined) {
          arrUp[i].vwmaThirtyUp = "No Data";
        }
        if (arrDown[i].vwmaThirtyDown == undefined) {
          arrDown[i].vwmaThirtyDown = "No Data";
        }
        if (arrUp[i].vwmaFiftyUp == undefined) {
          arrUp[i].vwmaFiftyUp = "No Data";
        }
        if (arrDown[i].vwmaFiftyDown == undefined) {
          arrDown[i].vwmaFiftyDown = "No Data";
        }
        if (arrUp[i].vwmaOneHunUp == undefined) {
          arrUp[i].vwmaOneHunUp = "No Data";
        }
        if (arrDown[i].vwmaOneHunDown == undefined) {
          arrDown[i].vwmaOneHunDown = "No Data";
        }
        if (arrUp[i].vwmaTwoHunUp == undefined) {
          arrUp[i].vwmaTwoHunUp = "No Data";
        }
        if (arrDown[i].vwmaTwoHunDown == undefined) {
          arrDown[i].vwmaTwoHunDown = "No Data";
        }
    
        if (arrDown[i].vwapDown == undefined) {
          arrDown[i].vwapDown = "No Data";
        }
        if (arrUp[i].vwapUp == undefined) {
          arrUp[i].vwapUp = "No Data";
        }
    
        if (arrDown[i].macdDown == undefined) {
          arrDown[i].macdDown = "No Data";
        }
        if (arrUp[i].macdUp == undefined) {
          arrUp[i].macdUp = "No Data";
        }
    
        if (arrDown[i].rsiDown == undefined) {
          arrDown[i].rsiDown = "No Data";
        }
        if (arrUp[i].rsiUp == undefined) {
          arrUp[i].rsiUp = "No Data";
        }
        if (arrDown[i].cciDown == undefined) {
          arrDown[i].cciDown = "No Data";
        }
        if (arrUp[i].cciUp == undefined) {
          arrUp[i].cciUp = "No Data";
        }
        if (arrDown[i].williamsRDown == undefined) {
          arrDown[i].williamsRDown = "No Data";
        }
        if (arrUp[i].williamsRUp == undefined) {
          arrUp[i].williamsRUp = "No Data";
        }
        if (arrUp[i].stochasticKUp == undefined) {
          arrUp[i].stochasticKUp = "No Data";
        }
        if (arrDown[i].stochasticKDown == undefined) {
          arrDown[i].stochasticKDown = "No Data";
        }
        if (arrUp[i].stochasticDUp == undefined) {
          arrUp[i].stochasticDUp = "No Data";
        }
        if (arrDown[i].stochasticDDown == undefined) {
          arrDown[i].stochasticDDown = "No Data";
        }
        if (arrUp[i].stochasticSignalUp == undefined) {
          arrUp[i].stochasticSignalUp = "No Data";
        }
        if (arrDown[i].stochasticSignalDown == undefined) {
          arrDown[i].stochasticSignalDown = "No Data";
        }
    
        if (arrDown[i].bbMiddleDown == undefined) {
          arrDown[i].bbMiddleDown = "No Data";
        }
        if (arrUp[i].bbMiddleUp == undefined) {
          arrUp[i].bbMiddleUp = "No Data";
        }
        if (arrDown[i].bbLowerDown == undefined) {
          arrDown[i].bbLowerDown = "No Data";
        }
        if (arrUp[i].bbLowerUp == undefined) {
          arrUp[i].bbLowerUp = "No Data";
        }
        if (arrDown[i].bbUpperDown == undefined) {
          arrDown[i].bbUpperDown = "No Data";
        }
        if (arrUp[i].bbUpperUp == undefined) {
          arrUp[i].bbUpperUp = "No Data";
        }
        if (arrDown[i].bbPercentDown == undefined) {
          arrDown[i].bbPercentDown = "No Data";
        }
    
        if (arrUp[i].bbPercentUp == undefined) {
          arrUp[i].bbPercentUp = "No Data";
        }
        if (arrDown[i].macdHistogramDown == undefined) {
          arrDown[i].macdHistogramDown = "No Data";
        }
        if (arrDown[i].macdSignalLineDown == undefined) {
          arrDown[i].macdSignalLineDown = "No Data";
        }
        if (arrUp[i].macdHistogramUp == undefined) {
          arrUp[i].macdHistogramUp = "No Data";
        }
        if (arrUp[i].macdSignalLineUp == undefined) {
          arrUp[i].macdSignalLineUp = "No Data";
        }
        if (arrUp[i].symbolUp == undefined) {
          arrUp[i].symbolUp = "No Data";
        }
        if (arrDown[i].symbolDown == undefined) {
          arrDown[i].symbolDown = "No Data";
        }
    
        arrUp[i].volumeIncreaseToday = volumeIncreaseUp
        arrUp[i].volumeIncreaseYesterday = yesterdayVolIncreaseUp
        arrDown[i].volumeIncreaseToday = volumeIncreaseDown
        arrDown[i].volumeIncreaseYesterday = yesterdayVolIncreaseDown
      }
     
     
      for (let i = 0; i < arrUp.length; i++) {
        // // UPPER ------------------------------------------------------------------------------
    
        arrUp[i].symbol = arrUp[i].symbolUp;
        delete arrUp[i].symbolUp;
        arrUp[i].change = arrUp[i].changeUp;
        delete arrUp[i].changeUp;
        arrUp[i].avgVolume = arrUp[i].avgVolumeUp;
        delete arrUp[i].avgVolumeUp;
        arrUp[i].changesPercentage = arrUp[i].changesPercentageUp;
        delete arrUp[i].changesPercentageUp;
        arrUp[i].emaEight = arrUp[i].emaEightUp;
        delete arrUp[i].emaEightUp;
        arrUp[i].emaTwelve = arrUp[i].emaTwelveUp;
        delete arrUp[i].emaTwelveUp;
        arrUp[i].emaTwenty = arrUp[i].emaTwentyUp;
        delete arrUp[i].emaTwentyUp;
        arrUp[i].emaTwentySix = arrUp[i].emaTwentySixUp;
        delete arrUp[i].emaTwentySixUp;
        arrUp[i].emaFifty = arrUp[i].emaFiftyUp;
        delete arrUp[i].emaFiftyUp;
        arrUp[i].emaTwoHun = arrUp[i].emaTwoHunUp;
        delete arrUp[i].emaTwoHunUp;
        arrUp[i].macd = arrUp[i].macdUp;
        delete arrUp[i].macdUp;
        arrUp[i].macdHistogram = arrUp[i].macdHistogramUp;
        delete arrUp[i].macdHistogramUp;
        arrUp[i].macdSignalLine = arrUp[i].macdSignalLineUp;
        delete arrUp[i].macdSignalLineUp;
        arrUp[i].price = arrUp[i].priceUp;
        delete arrUp[i].priceUp;
        arrUp[i].rsi = arrUp[i].rsiUp;
        delete arrUp[i].rsiUp;
        arrUp[i].smaFiveTeen = arrUp[i].smaFiveTeenUp;
        delete arrUp[i].smaFiveTeenUp;
        arrUp[i].smaTwenty = arrUp[i].smaTwentyUp;
        delete arrUp[i].smaTwentyUp;
        arrUp[i].smaThirty = arrUp[i].smaThirtyUp;
        delete arrUp[i].smaThirtyUp;
        arrUp[i].smaFifty = arrUp[i].smaFiftyUp;
        delete arrUp[i].smaFiftyUp;
        arrUp[i].smaOneHun = arrUp[i].smaOneHunUp;
        delete arrUp[i].smaOneHunUp;
        arrUp[i].smaTwoHun = arrUp[i].smaTwoHunUp;
        delete arrUp[i].smaTwoHunUp;
        arrUp[i].volume = arrUp[i].volumeUp;
        delete arrUp[i].volumeUp;
        arrUp[i].volumeYesterday = arrUp[i].volumeYesterdayUp;
        delete arrUp[i].volumeYesterdayUp;
        arrUp[i].vwap = arrUp[i].vwapUp;
        delete arrUp[i].vwapUp;
        arrUp[i].stochasticD = arrUp[i].stochasticDUp;
        delete arrUp[i].stochasticDUp;
        arrUp[i].stochasticK = arrUp[i].stochasticKUp;
        delete arrUp[i].stochasticKUp;
        arrUp[i].stochasticSignal = arrUp[i].stochasticSignalUp;
        delete arrUp[i].stochasticSignalUp;
        arrUp[i].wmaFiveTeen = arrUp[i].wmaFiveTeenUp;
        delete arrUp[i].wmaFiveTeenUp;
        arrUp[i].wmaTwenty = arrUp[i].wmaTwentyUp;
        delete arrUp[i].wmaTwentyUp;
        arrUp[i].wmaThirty = arrUp[i].wmaThirtyUp;
        delete arrUp[i].wmaThirtyUp;
        arrUp[i].wmaFifty = arrUp[i].wmaFiftyUp;
        delete arrUp[i].wmaFiftyUp;
        arrUp[i].wmaOneHun = arrUp[i].wmaOneHunUp;
        delete arrUp[i].wmaOneHunUp;
        arrUp[i].wmaTwoHun = arrUp[i].wmaTwoHunUp;
        delete arrUp[i].wmaTwoHunUp;
        arrUp[i].vwmaFiveTeen = arrUp[i].vwmaFiveTeenUp;
        delete arrUp[i].vwmaFiveTeenUp;
        arrUp[i].vwmaTwenty = arrUp[i].vwmaTwentyUp;
        delete arrUp[i].vwmaTwentyUp;
        arrUp[i].vwmaThirty = arrUp[i].vwmaThirtyUp;
        delete arrUp[i].vwmaThirtyUp;
        arrUp[i].vwmaFifty = arrUp[i].vwmaFiftyUp;
        delete arrUp[i].vwmaFiftyUp;
        arrUp[i].vwmaOneHun = arrUp[i].vwmaOneHunUp;
        delete arrUp[i].vwmaOneHunUp;
        arrUp[i].vwmaTwoHun = arrUp[i].vwmaTwoHunUp;
        delete arrUp[i].vwmaTwoHunUp;
        arrUp[i].williamsR = arrUp[i].williamsRUp;
        delete arrUp[i].williamsRUp;
        arrUp[i].cciTwenty = arrUp[i].cciUp;
        delete arrUp[i].cciUp;
        arrUp[i].bbUpper = arrUp[i].bbUpperUp;
        delete arrUp[i].bbUpperUp;
        arrUp[i].bbLower = arrUp[i].bbLowerUp;
        delete arrUp[i].bbLowerUp;
        arrUp[i].bbMiddle = arrUp[i].bbMiddleUp;
        delete arrUp[i].bbMiddleUp;
        arrUp[i].bbPercent = arrUp[i].bbPercentUp;
        delete arrUp[i].bbPercentUp;
    
        if (arrUp[i].bbPercent == undefined) {
          arrUp[i].bbPercent = 'No Data'
        }
      }
      for (let i = 0; i < arrDown.length; i++) {
        // DOWNERS ------------------------------------------------------------------------------
    
        arrDown[i].symbol = arrDown[i].symbolDown;
        delete arrDown[i].symbolDown;
        arrDown[i].change = arrDown[i].changeDown;
        delete arrDown[i].changeDown;
        arrDown[i].avgVolume = arrDown[i].avgVolumeDown;
        delete arrDown[i].avgVolumeDown;
        arrDown[i].changesPercentage = arrDown[i].changesPercentageDown;
        delete arrDown[i].changesPercentageDown;
        arrDown[i].emaEight = arrDown[i].emaEightDown;
        delete arrDown[i].emaEightDown;
        arrDown[i].emaTwelve = arrDown[i].emaTwelveDown;
        delete arrDown[i].emaTwelveDown;
        arrDown[i].emaTwenty = arrDown[i].emaTwentyDown;
        delete arrDown[i].emaTwentyDown;
        arrDown[i].emaTwentySix = arrDown[i].emaTwentySixDown;
        delete arrDown[i].emaTwentySixDown;
        arrDown[i].emaFifty = arrDown[i].emaFiftyDown;
        delete arrDown[i].emaFiftyDown;
        arrDown[i].emaTwoHun = arrDown[i].emaTwoHunDown;
        delete arrDown[i].emaTwoHunDown;
        arrDown[i].macd = arrDown[i].macdDown;
        delete arrDown[i].macdDown;
        arrDown[i].macdHistogram = arrDown[i].macdHistogramDown;
        delete arrDown[i].macdHistogramDown;
        arrDown[i].macdSignalLine = arrDown[i].macdSignalLineDown;
        delete arrDown[i].macdSignalLineDown;
        arrDown[i].price = arrDown[i].priceDown;
        delete arrDown[i].priceDown;
        arrDown[i].rsi = arrDown[i].rsiDown;
        delete arrDown[i].rsiDown;
        arrDown[i].smaFiveTeen = arrDown[i].smaFiveTeenDown;
        delete arrDown[i].smaFiveTeenDown;
        arrDown[i].smaTwenty = arrDown[i].smaTwentyDown;
        delete arrDown[i].smaTwentyDown;
        arrDown[i].smaThirty = arrDown[i].smaThirtyDown;
        delete arrDown[i].smaThirtyDown;
        arrDown[i].smaFifty = arrDown[i].smaFiftyDown;
        delete arrDown[i].smaFiftyDown;
        arrDown[i].smaOneHun = arrDown[i].smaOneHunDown;
        delete arrDown[i].smaOneHunDown;
        arrDown[i].smaTwoHun = arrDown[i].smaTwoHunDown;
        delete arrDown[i].smaTwoHunDown;
        arrDown[i].volume = arrDown[i].volumeDown;
        delete arrDown[i].volumeDown;
        arrDown[i].volumeYesterday = arrDown[i].volumeYesterdayDown;
        delete arrDown[i].volumeYesterdayDown;
        arrDown[i].vwap = arrDown[i].vwapDown;
        delete arrDown[i].vwapDown;
        arrDown[i].stochasticD = arrDown[i].stochasticDDown;
        delete arrDown[i].stochasticDDown;
        arrDown[i].stochasticK = arrDown[i].stochasticKDown;
        delete arrDown[i].stochasticKDown;
        arrDown[i].stochasticSignal = arrDown[i].stochasticSignalDown;
        delete arrDown[i].stochasticSignalDown;
        arrDown[i].wmaFiveTeen = arrDown[i].wmaFiveTeenDown;
        delete arrDown[i].wmaFiveTeenDown;
        arrDown[i].wmaTwenty = arrDown[i].wmaTwentyDown;
        delete arrDown[i].wmaTwentyDown;
        arrDown[i].wmaThirty = arrDown[i].wmaThirtyDown;
        delete arrDown[i].wmaThirtyDown;
        arrDown[i].wmaFifty = arrDown[i].wmaFiftyDown;
        delete arrDown[i].wmaFiftyDown;
        arrDown[i].wmaOneHun = arrDown[i].wmaOneHunDown;
        delete arrDown[i].wmaOneHunDown;
        arrDown[i].wmaTwoHun = arrDown[i].wmaTwoHunDown;
        delete arrDown[i].wmaTwoHunDown;
        arrDown[i].vwmaFiveTeen = arrDown[i].vwmaFiveTeenDown;
        delete arrDown[i].vwmaFiveTeenDown;
        arrDown[i].vwmaTwenty = arrDown[i].vwmaTwentyDown;
        delete arrDown[i].vwmaTwentyDown;
        arrDown[i].vwmaThirty = arrDown[i].vwmaThirtyDown;
        delete arrDown[i].vwmaThirtyDown;
        arrDown[i].vwmaFifty = arrDown[i].vwmaFiftyDown;
        delete arrDown[i].vwmaFiftyDown;
        arrDown[i].vwmaOneHun = arrDown[i].vwmaOneHunDown;
        delete arrDown[i].vwmaOneHunDown;
        arrDown[i].vwmaTwoHun = arrDown[i].vwmaTwoHunDown;
        delete arrDown[i].vwmaTwoHunDown;
        arrDown[i].williamsR = arrDown[i].williamsRDown;
        delete arrDown[i].williamsRDown;
        arrDown[i].cciTwenty = arrDown[i].cciDown;
        delete arrDown[i].cciDown;
        arrDown[i].bbUpper = arrDown[i].bbUpperDown;
        delete arrDown[i].bbUpperDown;
        arrDown[i].bbLower = arrDown[i].bbLowerDown;
        delete arrDown[i].bbLowerDown;
        arrDown[i].bbMiddle = arrDown[i].bbMiddleDown;
        delete arrDown[i].bbMiddleDown;
        arrDown[i].bbPercent = arrDown[i].bbPercentDown;
        delete arrDown[i].bbPercentDown;
      }
    
     
      let finalStocksArr = arrDown.concat(arrUp)
      return finalStocksArr;
    
    }
    //----- BUILD TO PAGE ----- // ------- AT SOME POINT THE FUNCTION WILL BE SET IN AN INTERVAL - HAVING THE ARRs CLEAR IS NOT A BAD IDEA
    const returnedData = await filterTradableSymbols(nyseMasterKey, nasdaqMasterKey, compileStocks);
    
    return returnedData;
    
    }