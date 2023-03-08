  // VWMA FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------
  export function vwmaFunction(chartArr, dataPull, newestPull, num) {
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