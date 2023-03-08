// RSI FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
export function rsiFunction(chartArr, dataPull, newestPull, num) {
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