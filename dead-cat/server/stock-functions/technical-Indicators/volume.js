  // SET VOLUME FOR LATER
function setVolume(chartArr, dataPull, newestPull, num, dateObj) {
    // SET RECENT YESTERDAY VOLUME
    try {
      if (dataPull.historical.length <= 0) {
        chartArr[num].yesterdayVolume = 0;
      } else {
        chartArr[num].yesterdayVolume = dataPull.historical[0].volume;
        if (dateObj.marketDay == 0 || dateObj.marketDay == 6) {
          chartArr[num].yesterdayVolume = dataPull.historical[1].volume;
        }
  
        if (dateObj.marketDay >= 1 && dateObj.marketDay <= 5 && dateObj.timeNum < 930) {
          chartArr[num].yesterdayVolume = dataPull.historical[1].volume;
        }
  
        if (dateObj.timeNum > 1830) {
          chartArr[num].yesterdayVolume = dataPull.historical[1].volume;
        }
      }
      if (newestPull.length < 0) {
        chartArr[num].volume = 0;
      } else {
        // SET RECENT VOLUME
        chartArr[num].volume = newestPull[0].volume;
      }
    } catch (e) {}
  }
  

  module.exports = {setVolume}