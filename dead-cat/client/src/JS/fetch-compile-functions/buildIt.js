export async function buildIt(arrUp, arrDown) {
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