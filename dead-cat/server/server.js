const express = require("express");
const server = express();
const PORT = 2000;
const filterTradableSymbols = require("./stock-functions/fetch-compile-functions/filterTradableSymbols");
const date = require("./stock-functions/fetch-compile-functions/handleDate");
const masterKeys = require("./stock-functions/masterKeys");
const compileStocks = require("./stock-functions/fetch-compile-functions/compileStocks");
// DB
const connectDB = require("./db/connectDB");
const axios = require("axios");
const router = require("./routes/routes");
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use("/api/v1/", router);

// NEED TO CREATE AN API THAT RUNS THE ANALYSIS OF STOCKS EVERY MINUTE OR SO AND HAS API READY TO STORE DATA TO SEND TOCCLIENT WHEN FETCHED
server.get("/", (req, res) => {
  res.send("Server on " + PORT);
});

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
  };
  // SET DATE --------------------------
  await date.handleDate(dateObj);

  //----- BUILD TO PAGE ----- // ------- AT SOME POINT THE FUNCTION WILL BE SET IN AN INTERVAL - HAVING THE ARRs CLEAR IS NOT A BAD IDEA
  const returnedData = await filterTradableSymbols.filterTradableSymbols(
    masterKeys.nyseMasterKey,
    masterKeys.nasdaqMasterKey,
    compileStocks.compileStocks,
    dateObj
  );
  console.log(returnedData);
  await axios.post("http://localhost:2000/api/v1/postData", returnedData);
  setTimeout(() => {
    technicalAnalysis();
  }, 30000);
};

server.listen(PORT, async () => {
  await connectDB(
    "mongodb+srv://autiomni:Poopshoes123@serverlessinstance0.sfvgo.mongodb.net/Data?retryWrites=true&w=majority"
  );
  console.log("server on 2000");
  await technicalAnalysis();
  console.log("Done");
  // const dataComplete = await axios.get('http://localhost:2000/api/v1/getData').then(res => {return res.data});
  // await axios.post('http://localhost:2000/api/v1/postData', ['posted', 'for real'])
});
