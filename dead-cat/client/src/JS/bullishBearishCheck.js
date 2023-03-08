// THIS IS FOR COLOR INDICATIONS OF TECHINCAL INDICATORS
export function indicatorColors(data) {
  // ALL MIGHTY PRICE
  var price = parseFloat(data.price);
  // GET HEADERS FOR HOVER EFFECT
  let vwapHeader = document.querySelector(".vwap-search-header");
  let macdHeader = document.querySelector(".macd-search-header");
  let rsiHeader = document.querySelector(".rsi-search-header");
  let cciHeader = document.querySelector(".cci-search-header");
  let williamsHeader = document.querySelector(".williams-search-header");
  let stochasticHeader = document.querySelector(".stochastic-search-header");
  let bbHeader = document.querySelector(".bb-search-header");

  // // GET ACTUALS FOR NUMBER CALCS AND HOVER COLOR
  let vwap = parseFloat(data.vwap);
  let macd = parseFloat(data.macd);
  let rsi = parseFloat(data.rsi);
  let cci = parseFloat(data.cciTwenty);
  let williams = parseFloat(data.williamsR);
  let stochasticK = parseFloat(data.stochasticK);
  let stochasticD = parseFloat(data.stochasticD);
  let bbPercent = parseFloat(data.bbPercent);

  //VOLUME INDICATORS
  var avgVolumeCheckNum = parseInt(data.avgVolume);
  var volumeTodayCheckNum = parseInt(data.volume);
  var changePercentageCheckNum = parseFloat(data.changesPercentage);

  let smaFifteen = document.querySelector(`.smafifteen-search-actual`);
  let smaTwenty = document.querySelector(`.smatwenty-search-actual`);
  let smaThirty = document.querySelector(`.smathirty-search-actual`);
  let smaFifty = document.querySelector(`.smafifty-search-actual`);
  let smaOneHun = document.querySelector(`.smaonehundred-search-actual`);
  let smaTwoHun = document.querySelector(`.smatwohundred-search-actual`);

  let emaEight = document.querySelector(`.emaeight-search-actual`);
  let emaTwelve = document.querySelector(`.ematwelve-search-actual`);
  let emaTwenty = document.querySelector(`.ematwenty-search-actual`);
  let emaTwentySix = document.querySelector(`.ematwentysix-search-actual`);
  let emaFifty = document.querySelector(`.emafifty-search-actual`);
  let emaTwoHun = document.querySelector(`.ematwohundred-search-actual`);

  let wmaFifteen = document.querySelector(`.wmafifteen-search-actual`);
  let wmaTwenty = document.querySelector(`.wmatwenty-search-actual`);
  let wmaThirty = document.querySelector(`.wmathirty-search-actual`);
  let wmaFifty = document.querySelector(`.wmafifty-search-actual`);
  let wmaOneHun = document.querySelector(`.wmaonehundred-search-actual`);
  let wmaTwoHun = document.querySelector(`.wmatwohundred-search-actual`);

  let vwmaFifteen = document.querySelector(`.vwmafifteen-search-actual`);
  let vwmaTwenty = document.querySelector(`.vwmatwenty-search-actual`);
  let vwmaThirty = document.querySelector(`.vwmathirty-search-actual`);
  let vwmaFifty = document.querySelector(`.vwmafifty-search-actual`);
  let vwmaOneHun = document.querySelector(`.vwmaonehundred-search-actual`);
  let vwmaTwoHun = document.querySelector(`.vwmatwohundred-search-actual`);

  // // BELOW TO GET NUMBER ONLY --------------------------------

  var smaFifteenNum = parseFloat(data.smaFiveTeen);
  var smaTwentyNum = parseFloat(data.smaTwenty);
  var smaThirtyNum = parseFloat(data.smaThirty);
  var smaFiftyNum = parseFloat(data.smaFifty);
  var smaOneHunNum = parseFloat(data.smaOneHun);
  var smaTwoHunNum = parseFloat(data.smaTwoHun);

  var emaEightNum = parseFloat(data.emaEight);
  var emaTwelveNum = parseFloat(data.emaTwelve);
  var emaTwentyNum = parseFloat(data.emaTwenty);
  var emaTwentySixNum = parseFloat(data.emaTwentySix);
  var emaFiftyNum = parseFloat(data.emaFifty);
  var emaTwoHunNum = parseFloat(data.emaTwoHun);

  var wmaFifteenNum = parseFloat(data.wmaFiveTeen);
  var wmaTwentyNum = parseFloat(data.wmaTwenty);
  var wmaThirtyNum = parseFloat(data.wmaThirty);
  var wmaFiftyNum = parseFloat(data.wmaFifty);
  var wmaOneHunNum = parseFloat(data.wmaOneHun);
  var wmaTwoHunNum = parseFloat(data.wmaTwoHun);

  var vwmaFifteenNum = parseFloat(data.vwmaFiveTeen);
  var vwmaTwentyNum = parseFloat(data.vwmaTwenty);
  var vwmaThirtyNum = parseFloat(data.vwmaThirty);
  var vwmaFiftyNum = parseFloat(data.vwmaFifty);
  var vwmaOneHunNum = parseFloat(data.vwmaOneHun);
  var vwmaTwoHunNum = parseFloat(data.vwmaTwoHun);

  // ALERTS --------------------------------

  let goldenCrossSma = document.querySelector(`.goldenSma-cross`);
  let deathCrossSma = document.querySelector(`.deathSma-cross`);
  let goldenCrossEma = document.querySelector(`.goldenEma-cross`);
  let deathCrossEma = document.querySelector(`.deathEma-cross`);
  let goldenCrossWma = document.querySelector(`.goldenWma-cross`);
  let deathCrossWma = document.querySelector(`.deathWma-cross`);
  let goldenCrossVwma = document.querySelector(`.goldenVwma-cross`);
  let deathCrossVwma = document.querySelector(`.deathVwma-cross`);

  smaFifteen.classList.remove("bullish-ma");
  smaTwenty.classList.remove("bullish-ma");
  smaThirty.classList.remove("bullish-ma");
  smaFifty.classList.remove("bullish-ma");
  smaOneHun.classList.remove("bullish-ma");
  smaTwoHun.classList.remove("bullish-ma");
  smaFifteen.classList.remove("bearish-ma");
  smaTwenty.classList.remove("bearish-ma");
  smaThirty.classList.remove("bearish-ma");
  smaFifty.classList.remove("bearish-ma");
  smaOneHun.classList.remove("bearish-ma");
  smaTwoHun.classList.remove("bearish-ma");
  smaFifteen.classList.remove("neutral-ma");
  smaTwenty.classList.remove("neutral-ma");
  smaThirty.classList.remove("neutral-ma");
  smaFifty.classList.remove("neutral-ma");
  smaOneHun.classList.remove("neutral-ma");
  smaTwoHun.classList.remove("neutral-ma");
  emaEight.classList.remove("bullish-ma");
  emaTwelve.classList.remove("bullish-ma");
  emaTwenty.classList.remove("bullish-ma");
  emaTwentySix.classList.remove("bullish-ma");
  emaFifty.classList.remove("bullish-ma");
  emaTwoHun.classList.remove("bullish-ma");
  emaEight.classList.remove("bearish-ma");
  emaTwelve.classList.remove("bearish-ma");
  emaTwenty.classList.remove("bearish-ma");
  emaTwentySix.classList.remove("bearish-ma");
  emaFifty.classList.remove("bearish-ma");
  emaTwoHun.classList.remove("bearish-ma");
  emaEight.classList.remove("neutral-ma");
  emaTwelve.classList.remove("neutral-ma");
  emaTwenty.classList.remove("neutral-ma");
  emaTwentySix.classList.remove("neutral-ma");
  emaFifty.classList.remove("neutral-ma");
  emaTwoHun.classList.remove("neutral-ma");
  wmaFifteen.classList.remove("bullish-ma");
  wmaTwenty.classList.remove("bullish-ma");
  wmaThirty.classList.remove("bullish-ma");
  wmaFifty.classList.remove("bullish-ma");
  wmaOneHun.classList.remove("bullish-ma");
  wmaTwoHun.classList.remove("bullish-ma");
  wmaFifteen.classList.remove("bearish-ma");
  wmaTwenty.classList.remove("bearish-ma");
  wmaThirty.classList.remove("bearish-ma");
  wmaFifty.classList.remove("bearish-ma");
  wmaOneHun.classList.remove("bearish-ma");
  wmaTwoHun.classList.remove("bearish-ma");
  wmaFifteen.classList.remove("neutral-ma");
  wmaTwenty.classList.remove("neutral-ma");
  wmaThirty.classList.remove("neutral-ma");
  wmaFifty.classList.remove("neutral-ma");
  wmaOneHun.classList.remove("neutral-ma");
  wmaTwoHun.classList.remove("neutral-ma");
  vwmaFifteen.classList.remove("bullish-ma");
  vwmaTwenty.classList.remove("bullish-ma");
  vwmaThirty.classList.remove("bullish-ma");
  vwmaFifty.classList.remove("bullish-ma");
  vwmaOneHun.classList.remove("bullish-ma");
  vwmaTwoHun.classList.remove("bullish-ma");
  vwmaFifteen.classList.remove("bearish-ma");
  vwmaTwenty.classList.remove("bearish-ma");
  vwmaThirty.classList.remove("bearish-ma");
  vwmaFifty.classList.remove("bearish-ma");
  vwmaOneHun.classList.remove("bearish-ma");
  vwmaTwoHun.classList.remove("bearish-ma");
  vwmaFifteen.classList.remove("neutral-ma");
  vwmaTwenty.classList.remove("neutral-ma");
  vwmaThirty.classList.remove("neutral-ma");
  vwmaFifty.classList.remove("neutral-ma");
  vwmaOneHun.classList.remove("neutral-ma");
  vwmaTwoHun.classList.remove("neutral-ma");
  vwapHeader.classList.remove("bullish-stuff");
  macdHeader.classList.remove("bullish-stuff");
  rsiHeader.classList.remove("bullish-stuff");
  cciHeader.classList.remove("bullish-stuff");
  williamsHeader.classList.remove("bullish-stuff");
  bbHeader.classList.remove("bullish-stuff");
  vwapHeader.classList.remove("bearish-stuff");
  macdHeader.classList.remove("bearish-stuff");
  rsiHeader.classList.remove("bearish-stuff");
  cciHeader.classList.remove("bearish-stuff");
  williamsHeader.classList.remove("bearish-stuff");
  bbHeader.classList.remove("bearish-stuff");
  vwapHeader.classList.remove("neutral-stuff");
  macdHeader.classList.remove("neutral-stuff");
  rsiHeader.classList.remove("neutral-stuff");
  cciHeader.classList.remove("neutral-stuff");
  williamsHeader.classList.remove("neutral-stuff");
  bbHeader.classList.remove("neutral-stuff");
  stochasticHeader.classList.remove("bearish-stuff-k");
  stochasticHeader.classList.remove("bullish-stuff-k");
  stochasticHeader.classList.remove("neutral-stuff-k");
  stochasticHeader.classList.remove("bearish-stuff-d");
  stochasticHeader.classList.remove("bullish-stuff-d");
  stochasticHeader.classList.remove("neutral-stuff-d");

  document.querySelector(`.volumeToday-actual`).classList.remove("bullish-stuff");
  document.querySelector(".volumeToday-actual").classList.remove("bearish-stuff");
  document.querySelector(".volumeToday-actual").classList.remove("neutral-stuff");

  goldenCrossVwma.classList.remove("cross-display");
  deathCrossVwma.classList.remove("cross-display");
  goldenCrossWma.classList.remove("cross-display");
  deathCrossWma.classList.remove("cross-display");
  goldenCrossEma.classList.remove("cross-display");
  deathCrossEma.classList.remove("cross-display");
  goldenCrossSma.classList.remove("cross-display");
  deathCrossSma.classList.remove("cross-display");


  // VOLUME CHECK --------------------------------------------------------------------------------------------
  if (avgVolumeCheckNum < volumeTodayCheckNum && changePercentageCheckNum > 0) {
    document.querySelector(`.volumeToday-actual`).classList.add("bullish-stuff");
  } else if (avgVolumeCheckNum < volumeTodayCheckNum && changePercentageCheckNum < 0
  ) {
    document.querySelector(".volumeToday-actual").classList.add("bearish-stuff");
  } else {
    document.querySelector(".volumeToday-actual").classList.add("neutral-stuff");
  }
  // IF FOR CLASS ADD -------------
  if (price > smaFifteenNum) {
    smaFifteen.classList.add("bullish-ma");
  } else if (price < smaFifteenNum) {
    smaFifteen.classList.add("bearish-ma");
  } else if (price == smaFifteenNum) {
    smaFifteen.classList.add("neutral-ma");
  }

  if (price > smaTwentyNum) {
    smaTwenty.classList.add("bullish-ma");
  } else if (price < smaTwentyNum) {
    smaTwenty.classList.add("bearish-ma");
  } else if (price == smaTwentyNum) {
    smaTwenty.classList.add("neutral-ma");
  }
  if (price > smaThirtyNum) {
    smaThirty.classList.add("bullish-ma");
  } else if (price < smaThirtyNum) {
    smaThirty.classList.add("bearish-ma");
  } else if (price == smaThirtyNum) {
    smaThirty.classList.add("neutral-ma");
  }
  if (price > smaFiftyNum) {
    smaFifty.classList.add("bullish-ma");
  } else if (price < smaFiftyNum) {
    smaFifty.classList.add("bearish-ma");
  } else if (price == smaFiftyNum) {
    smaFifty.classList.add("neutral-ma");
  }
  if (price > smaOneHunNum) {
    smaOneHun.classList.add("bullish-ma");
  } else if (price < smaOneHunNum) {
    smaOneHun.classList.add("bearish-ma");
  } else if (price == smaOneHunNum) {
    smaOneHun.classList.add("neutral-ma");
  }
  if (price > smaTwoHunNum) {
    smaTwoHun.classList.add("bullish-ma");
  } else if (price < smaTwoHunNum) {
    smaTwoHun.classList.add("bearish-ma");
  } else if (price == smaTwoHunNum) {
    smaTwoHun.classList.add("neutral-ma");
  }
  // CROSS --------------------------------
  if (smaFiftyNum > smaTwoHunNum) {
    goldenCrossSma.classList.add("cross-display");
  } else if (smaFiftyNum < smaTwoHunNum) {
    deathCrossSma.classList.add("cross-display");
  }

  //    EMA -----------------------------------

  if (price > emaEightNum) {
    emaEight.classList.add("bullish-ma");
  } else if (price < emaEightNum) {
    emaEight.classList.add("bearish-ma");
  } else if (price == emaEightNum) {
    emaEight.classList.add("neutral-ma");
  }

  if (price > emaTwelveNum) {
    emaTwelve.classList.add("bullish-ma");
  } else if (price < emaTwelveNum) {
    emaTwelve.classList.add("bearish-ma");
  } else if (price == emaTwelveNum) {
    emaTwelve.classList.add("neutral-ma");
  }

  if (price > emaTwentyNum) {
    emaTwenty.classList.add("bullish-ma");
  } else if (price < emaTwentyNum) {
    emaTwenty.classList.add("bearish-ma");
  } else if (price == emaTwentyNum) {
    emaTwenty.classList.add("neutral-ma");
  }

  if (price > emaTwentySixNum) {
    emaTwentySix.classList.add("bullish-ma");
  } else if (price < emaTwentySixNum) {
    emaTwentySix.classList.add("bearish-ma");
  } else if (price == emaTwentySixNum) {
    emaTwentySix.classList.add("neutral-ma");
  }

  if (price > emaFiftyNum) {
    emaFifty.classList.add("bullish-ma");
  } else if (price < emaFiftyNum) {
    emaFifty.classList.add("bearish-ma");
  } else if (price == emaFiftyNum) {
    emaFifty.classList.add("neutral-ma");
  }

  if (price > emaTwoHunNum) {
    emaTwoHun.classList.add("bullish-ma");
  } else if (price < emaTwoHunNum) {
    emaTwoHun.classList.add("bearish-ma");
  } else if (price == emaTwoHunNum) {
    emaTwoHun.classList.add("neutral-ma");
  }

  if (emaTwelveNum > emaTwentySixNum) {
    goldenCrossEma.classList.add("cross-display");
  } else if (emaTwelveNum < emaTwentySixNum) {
    deathCrossEma.classList.add("cross-display");
  }

  //    WMA -----------------------------------

  if (price > wmaFifteenNum) {
    wmaFifteen.classList.add("bullish-ma");
  } else if (price < wmaFifteenNum) {
    wmaFifteen.classList.add("bearish-ma");
  } else if (price == wmaFifteenNum) {
    wmaFifteen.classList.add("neutral-ma");
  }

  if (price > wmaTwentyNum) {
    wmaTwenty.classList.add("bullish-ma");
  } else if (price < wmaTwentyNum) {
    wmaTwenty.classList.add("bearish-ma");
  } else if (price == wmaTwentyNum) {
    wmaTwenty.classList.add("neutral-ma");
  }

  if (price > wmaThirtyNum) {
    wmaThirty.classList.add("bullish-ma");
  } else if (price < wmaThirtyNum) {
    wmaThirty.classList.add("bearish-ma");
  } else if (price == wmaThirtyNum) {
    wmaThirty.classList.add("neutral-ma");
  }

  if (price > wmaFiftyNum) {
    wmaFifty.classList.add("bullish-ma");
  } else if (price < wmaFiftyNum) {
    wmaFifty.classList.add("bearish-ma");
  } else if (price == wmaFiftyNum) {
    wmaFifty.classList.add("neutral-ma");
  }

  if (price > wmaOneHunNum) {
    wmaOneHun.classList.add("bullish-ma");
  } else if (price < wmaOneHunNum) {
    wmaOneHun.classList.add("bearish-ma");
  } else if (price == wmaOneHunNum) {
    wmaOneHun.classList.add("neutral-ma");
  }

  if (price > wmaTwoHunNum) {
    wmaTwoHun.classList.add("bullish-ma");
  } else if (price < wmaTwoHunNum) {
    wmaTwoHun.classList.add("bearish-ma");
  } else if (price == wmaTwoHunNum) {
    wmaTwoHun.classList.add("neutral-ma");
  }

  if (wmaFiftyNum > wmaTwoHunNum) {
    goldenCrossWma.classList.add("cross-display");
  } else if (wmaFiftyNum < wmaTwoHunNum) {
    deathCrossWma.classList.add("cross-display");
  }
  //    VWMA -----------------------------------

  if (price > vwmaFifteenNum) {
    vwmaFifteen.classList.add("bullish-ma");
  } else if (price < vwmaFifteenNum) {
    vwmaFifteen.classList.add("bearish-ma");
  } else if (price == vwmaFifteenNum) {
    vwmaFifteen.classList.add("neutral-ma");
  }

  if (price > vwmaTwentyNum) {
    vwmaTwenty.classList.add("bullish-ma");
  } else if (price < vwmaTwentyNum) {
    vwmaTwenty.classList.add("bearish-ma");
  } else if (price == vwmaTwentyNum) {
    vwmaTwenty.classList.add("neutral-ma");
  }

  if (price > vwmaThirtyNum) {
    vwmaThirty.classList.add("bullish-ma");
  } else if (price < vwmaThirtyNum) {
    vwmaThirty.classList.add("bearish-ma");
  } else if (price == vwmaThirtyNum) {
    vwmaThirty.classList.add("neutral-ma");
  }

  if (price > vwmaFiftyNum) {
    vwmaFifty.classList.add("bullish-ma");
  } else if (price < vwmaFiftyNum) {
    vwmaFifty.classList.add("bearish-ma");
  } else if (price == vwmaFiftyNum) {
    vwmaFifty.classList.add("neutral-ma");
  }

  if (price > vwmaOneHunNum) {
    vwmaOneHun.classList.add("bullish-ma");
  } else if (price < vwmaOneHunNum) {
    vwmaOneHun.classList.add("bearish-ma");
  } else if (price == vwmaOneHunNum) {
    vwmaOneHun.classList.add("neutral-ma");
  }

  if (price > vwmaTwoHunNum) {
    vwmaTwoHun.classList.add("bullish-ma");
  } else if (price < vwmaTwoHunNum) {
    vwmaTwoHun.classList.add("bearish-ma");
  } else if (price == vwmaTwoHunNum) {
    vwmaTwoHun.classList.add("neutral-ma");
  }

  if (vwmaFiftyNum > vwmaTwoHunNum) {
    goldenCrossVwma.classList.add("cross-display");
  } else if (vwmaFiftyNum < vwmaTwoHunNum) {
    deathCrossVwma.classList.add("cross-display");
  }

  // TECHNICAL INDICATORS ----------------------
  if (price < vwap) {
    vwapHeader.classList.add("bullish-stuff");
  } else if (price > vwap) {
    vwapHeader.classList.add("bearish-stuff");
  } else if (price == vwap) {
    vwapHeader.classList.add("neutral-stuff");
  }
  // MACD IF FOR CLASS ADD
  if (macd > 0) {
    macdHeader.classList.add("bullish-stuff");
  } else if (macd < 0) {
    macdHeader.classList.add("bearish-stuff");
  } else if (macd == 0) {
    macdHeader.classList.add("neutral-stuff");
  }
  // RSI IF FOR CLASS ADD
  if (rsi < 30) {
    rsiHeader.classList.add("bullish-stuff");
  } else if (rsi > 70) {
    rsiHeader.classList.add("bearish-stuff");
  } else if (rsi <= 70 && rsi >= 30) {
    rsiHeader.classList.add("neutral-stuff");
  }
  // CCI IF FOR CLASS ADD
  if (cci > 100) {
    cciHeader.classList.add("bullish-stuff");
  } else if (cci < -100) {
    cciHeader.classList.add("bearish-stuff");
  } else if (cci <= 100 && cci >= -100) {
    cciHeader.classList.add("neutral-stuff");
  }
  //  WILLIAMS IF FOR CLASS ADD
  if (williams > -50) {
    williamsHeader.classList.add("bullish-stuff");
  } else if (williams < -50) {
    williamsHeader.classList.add("bearish-stuff");
  }
  //  STOCHASTIC IF FOR CLASS ADD
  if (stochasticK > 85) {
    stochasticHeader.classList.add("bearish-stuff-k");
  } else if (stochasticK < 15) {
    stochasticHeader.classList.add("bullish-stuff-k");
  } else if (stochasticK <= 85 && stochasticK >= 15) {
    stochasticHeader.classList.add("neutral-stuff-k");
  }

  if (stochasticD > 80) {
    stochasticHeader.classList.add("bearish-stuff-d");
  } else if (stochasticD < 20) {
    stochasticHeader.classList.add("bullish-stuff-d");
  } else if (stochasticD <= 80 && stochasticD >= 20) {
    stochasticHeader.classList.add("neutral-stuff-d");
  }

  //  STOCHASTIC IF FOR CLASS ADD
  if (bbPercent < 0) {
    bbHeader.classList.add("bullish-stuff");
  } else if (bbPercent > 1) {
    bbHeader.classList.add("bearish-stuff");
  } else if (bbPercent > 0.8 && bbPercent < 1) {
    bbHeader.classList.add("bullish-stuff");
  } else if (bbPercent < 0.2 && bbPercent > 0) {
    bbHeader.classList.add("bearish-stuff");
  } else if (bbPercent <= 0.8 && bbPercent >= 0.2) {
    bbHeader.classList.add("neutral-stuff");
  }
}
