import BearCol from "./BearCol";
import BullCol from "./BullCol";
import TechnicalIndicators from "./TechnicalIndicators";
import SearchTechnicalIndicators from "./SearchTechnicalIndicators";
import Portfolio from "./Portfolio";
import LoadingScreen from "./LoadingScreen";
import PortfolioMainPage from "./PortfolioMainPage";

import { useState, useEffect } from "react";

const MainContainer = (props) => {
  //STATES ----------------------------------------------

  const [finalUpperArr, setFinalUpperArr] = useState([]);
  const [finalDownerArr, setFinalDownerArr] = useState([]);
  //ID CHECK TO CLOSE BOX ---------------------------------------------------------
  const [currentActiveBox, setCurrentActiveBox] = useState(null);
  const [activeSearchCol, setActiveSearchCol] = useState(false);
  const [firstOpen, setFirstOpen] = useState(false);
  const [openApp, setOpenApp] = useState(null);
  const [technicalAnalysisCol, setTechnicalAnalysisCol] = useState([]);

  // EFFECTS -==============----==============================================================
  // SETTING REGULAR DEFAULT DATA
  useEffect(() => {
    for (let i = 0; i < props.pulledData.length; i++) {
      props.pulledData[i].id = i;
      props.pulledData[i].active = false;
    }
    setFinalDownerArr(props.pulledData.slice(0, 5));
    setFinalUpperArr(props.pulledData.slice(5));
  }, [props.pulledData]);

  // SETTING PORTFOLIO DATA
  useEffect(() => {

    for (let i = 0; i < props.portfolioPulledData.length; i++) {

 

      props.portfolioPulledData[i].id = i;
      props.portfolioPulledData[i].active = false;

    }

    
    
    // NEED TO RECONFIGURE THIS TO BE PORTFOLIO NO UPPER AND DOWNER
    setFinalDownerArr(props.portfolioPulledData.slice(0, 5));
    setFinalUpperArr(props.portfolioPulledData.slice(5));
  }, [props.portfolioPulledData]);

  useEffect(() => {
    if (openApp == false) {
      setTimeout(() => {
        setOpenApp(true);
      }, 500);
    }
  }, [openApp]);

  useEffect(() => {
    setOpenApp(null);
    for (const upper of finalUpperArr) {
      upper.active = false;
    }
    for (const downer of finalDownerArr) {
      downer.active = false;
    }
  }, [props.activePortfolio]);

  // SEARCH FUNCTIONALITY ===============================================
  useEffect(() => {
    if (props.searchedPulledData === undefined) return;
    if (Object.keys(props.searchedPulledData).length !== 0) {
      setActiveSearchCol(true);
      setOpenApp(true);

      for (const upper of finalUpperArr) {
        upper.active = false;
      }
      for (const downer of finalDownerArr) {
        downer.active = false;
      }
      return;
    }
  }, [props.searchedPulledData]);

  useEffect(() => {
    if (props.searchedSymbol.length > 0) {
      setOpenApp(null);
    }
  }, [props.searchedSymbol]);

  // FUNCTIONS FOR OPEN TECHNICAL INDICATORS ---------------------------------------------------------------------------
  const toggleActiveUpper = (id) => {
    if (currentActiveBox == id) {
      setOpenApp(null);
      for (const upper of finalUpperArr) {
        upper.active = false;
      }
      setCurrentActiveBox(null);
      return;
    }

    for (const upper of finalUpperArr) {
      if (id == upper.id) {
        upper.active = true;
      } else {
        upper.active = false;
      }
    }

    for (const downer of finalDownerArr) {
      downer.active = false;
    }
    setTimeout(() => {
      setTechnicalAnalysisCol(props.pulledData[id]);
      setActiveSearchCol(false);
    }, 500);

    if (firstOpen === false) {
      setTimeout(() => {
        setOpenApp(!openApp);
        setFirstOpen(true);
      }, 500);
    } else {
      setOpenApp(!openApp);
    }

    setCurrentActiveBox(id);
  };
  const toggleActiveDowner = (id) => {
    if (currentActiveBox == id) {
      setOpenApp(null);
      for (const downer of finalDownerArr) {
        downer.active = false;
      }
      setCurrentActiveBox(null);
      return;
    }

    for (const downer of finalDownerArr) {
      if (id == downer.id) {
        downer.active = true;
      } else {
        downer.active = false;
      }
    }

    for (const upper of finalUpperArr) {
      upper.active = false;
    }

    setTimeout(() => {
      setTechnicalAnalysisCol(props.pulledData[id]);
      setActiveSearchCol(false);
    }, 500);

    if (firstOpen === false) {
      setTimeout(() => {
        setOpenApp(!openApp);
        setFirstOpen(true);
      }, 500);
    } else {
      setOpenApp(!openApp);
    }

    setCurrentActiveBox(id);
  };
  const toggleActivePortfolioRight = (id) => {
    if (currentActiveBox == id) {
      setOpenApp(null);
      for (const upper of finalUpperArr) {
        upper.active = false;
      }
      setCurrentActiveBox(null);
      return;
    }

    for (const upper of finalUpperArr) {
      if (id == upper.id) {
        upper.active = true;
      } else {
        upper.active = false;
      }
    }

    for (const downer of finalDownerArr) {
      downer.active = false;
    }
    setTimeout(() => {
      setTechnicalAnalysisCol(props.portfolioPulledData[id]);
      setActiveSearchCol(false);
    }, 500);

    if (firstOpen === false) {
      setTimeout(() => {
        setOpenApp(!openApp);
        setFirstOpen(true);
      }, 500);
    } else {
      setOpenApp(!openApp);
    }

    setCurrentActiveBox(id);
  };
  const toggleActivePortfolioLeft = (id) => {
    if (currentActiveBox == id) {
      setOpenApp(null);
      for (const downer of finalDownerArr) {
        downer.active = false;
      }
      setCurrentActiveBox(null);
      return;
    }

    for (const downer of finalDownerArr) {
      if (id == downer.id) {
        downer.active = true;
      } else {
        downer.active = false;
      }
    }

    for (const upper of finalUpperArr) {
      upper.active = false;
    }

    setTimeout(() => {
      setTechnicalAnalysisCol(props.portfolioPulledData[id]);
      setActiveSearchCol(false);
    }, 500);

    if (firstOpen === false) {
      setTimeout(() => {
        setOpenApp(!openApp);
        setFirstOpen(true);
      }, 500);
    } else {
      setOpenApp(!openApp);
    }

    setCurrentActiveBox(id);
  };

  // RENDER ========================================================

  return (
    <main>
      <Portfolio
        changeDefaultOrPortfolio={props.changeDefaultOrPortfolio}
        handleOpenPortfolio={props.handleOpenPortfolio}
        activePortfolioZ={props.activePortfolioZ}
        activePortfolio={props.activePortfolio}
      />

      {!props.pullDone && <LoadingScreen />}
      {props.portfolioDefault ? (
        <>
          <BearCol
            toggleActiveDowner={toggleActiveDowner}
            openApp={openApp}
            finalDownerArr={finalDownerArr}
            activePortfolio={props.activePortfolio}
          />

          <BullCol
            toggleActiveUpper={toggleActiveUpper}
            openApp={openApp}
            finalUpperArr={finalUpperArr}
            activePortfolio={props.activePortfolio}
          />
        </>
      ) : (
        <PortfolioMainPage
          activePortfolio={props.activePortfolio}
          openApp={openApp}
          toggleActivePortfolioLeft={toggleActivePortfolioLeft}
          toggleActivePortfolioRight={toggleActivePortfolioRight}
          finalDownerArr={finalDownerArr} // THESE JUST DIVIDE BETWEEN LEFT AND RIGHT COL - NO REAL UPPER AND DOWNER
          finalUpperArr={finalUpperArr}
        />
      )}

      {activeSearchCol ? (
        <SearchTechnicalIndicators
          openApp={openApp}
          searchedPulledData={props.searchedPulledData}
        />
      ) : (
        <TechnicalIndicators
          openApp={openApp}
          technicalAnalysisCol={technicalAnalysisCol}
        />
      )}
    </main>
  );
};

export default MainContainer;
