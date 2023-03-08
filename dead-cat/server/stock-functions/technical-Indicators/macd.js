
  // MACD FUNCTION -----------------------------------------------------------------------------------------------------------------------------------------
function macdFunction(chartArr, num, arr1, arr2) {
    const macd = chartArr[num].emaTwelve - chartArr[num].emaTwentySix;
    chartArr[num].macd = macd.toFixed(2);
    // CALCULATE SIGNAL LINE ----------------
    let averageMacd = [];
    let iMacd = 8;
  
    try {
      while (iMacd >= 0) {
        averageMacd.unshift(arr1[iMacd] - arr2[iMacd]);
        iMacd--;
      }
      let averageSum = averageMacd.reduce((a, b) => a + b);
      let finalAverageMacd = averageSum / 9;
      let macdSignalLine =
        (2 / 9) * (chartArr[num].macd - finalAverageMacd) + finalAverageMacd;
      chartArr[num].macdSignalLine = macdSignalLine.toFixed(2);
      // HISTORGRAM CALC ------------------------------------- IF HISTOGRAM GOES FROM NEGATIVE TO POSITIVE IT IS BULLISH
      let histogram = chartArr[num].macd - chartArr[num].macdSignalLine;
      chartArr[num].macdHistogram = histogram.toFixed(2);
      // FOR NO DATA TO PULL FROM
      if (chartArr[num].macdHistogram === "NaN") {
        chartArr[num].macdHistogram = "No Data";
      }
      if (chartArr[num].macd === "NaN") {
        chartArr[num].macd = "No Data";
      }
      if (chartArr[num].macdSignalLine === "NaN") {
        chartArr[num].macdSignalLine = "No Data";
      }
    } catch (e) {}
  }

  module.exports = {macdFunction}