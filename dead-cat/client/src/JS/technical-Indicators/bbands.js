 // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
 export function bollingerBandsFunction(chartArr, dataPull, newestPull, num) {
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