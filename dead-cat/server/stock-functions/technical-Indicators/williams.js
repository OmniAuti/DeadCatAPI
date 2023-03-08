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

  module.exports = {williamsRFunction}