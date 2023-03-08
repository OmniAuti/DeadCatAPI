  
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


  module.exports = {stochOsc1433Function}