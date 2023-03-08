 
  // VWAP FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  export function vwapFunction(chartArr, dataPull, num, dateObj) {
    // ----------- VWAP CALUC -------------------------------------------
    let dayLengthPeriod = 0;
    let tpvCul = 0;
    let volumeCul = 0;
    let tempVWAP = []; // HOLD VWAP PERIOD - TAKES FROM 0 INDEX FOR MOST CURRENT
  
    try {
      // -------------THIS IS FOR GETTING THE DAY LENGTH FOR VWAP
      while (dataPull[dayLengthPeriod].date.slice(0, 10) == dateObj.newDateString) {
        dayLengthPeriod++;
      }
    
      // --------------------THIS IS FOR CALCULATING THE VWAP AND PUSHING TO
  
      for (let i = 0; i < dayLengthPeriod; i++) {
        const { volume, high, close, low, date } = dataPull[i];
        let tpv = (high + low + close) / 3;
        if (date.slice(0, 10) == dateObj.newDateString) {
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