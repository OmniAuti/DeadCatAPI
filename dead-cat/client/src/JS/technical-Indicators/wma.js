  // WMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  export function wmaFunction(chartArr, dataPull, newestPull, num) {
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