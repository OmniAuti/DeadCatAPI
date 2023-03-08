
// import { handleDate } from "./fetch-compile-functions/handleDate";
// import {filterTradableSymbols} from "./fetch-compile-functions/filterTradableSymbols"
// import { compileStocks } from "./fetch-compile-functions/compileStocks";
// import { nasdaqMasterKey, nyseMasterKey } from "./masterKeys";

const technicalAnalysis = async () => {
  // DATE OBJ --------------------------
  const dateObj = {
    today: null,
    year: null,
    date: null,
    month: null,
    minutes: null,
    hour: null,
    time: null,
    timeNum: null,
    marketDay: null,
    todayDate: null,
  }
  // SET DATE --------------------------
  await handleDate(dateObj)

//----- BUILD TO PAGE ----- // ------- AT SOME POINT THE FUNCTION WILL BE SET IN AN INTERVAL - HAVING THE ARRs CLEAR IS NOT A BAD IDEA
const returnedData = await filterTradableSymbols(nyseMasterKey, nasdaqMasterKey, compileStocks, dateObj);
console.log(returnedData)
return returnedData;
}

module.exports = {technicalAnalysis}
