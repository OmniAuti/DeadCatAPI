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

  module.exports = {cciFunction}