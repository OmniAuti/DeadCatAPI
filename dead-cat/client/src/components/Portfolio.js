import PortfolioForm from "./PortfolioForm";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioHolder from "./PortfolioHolder";
import PortfolioSettings from "./PortfolioSettings";

import { useState, useEffect } from "react";

const Portfolio = (props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [clearCheck, setClearCheck] = useState(false);
  const [newStorage, setNewStorage] = useState(false);

  const handleShowSettings = () => {
    setShowSettings(!showSettings);
  };
  const handleSaveSettings = () => {
    // SAVE TO LOCAL STORAGE HERE --------
    setShowSettings(!showSettings);
  };

  const handleNewStorage = () => {
    setNewStorage(!newStorage);
  };

  // CLEAR PORTFOLIO ===========
  const handleClearPortfolio = () => {
    localStorage.removeItem(["deadCatPortfolio"]);
    setClearCheck(true);
    setTimeout(() => {
      setClearCheck(false);
    }, 1000)
  };

  useEffect(() => {
    setShowSettings(false);
  }, [props.activePortfolio]);

  return (
    <div
      style={props.activePortfolioZ ? { zIndex: "-1" } : { zIndex: "99" }}
      className={
        props.activePortfolio
          ? "portfolio-cont"
          : "portfolio-cont active-portfolio"
      }
    >
      <div
        className={
          props.activePortfolio ? "portfolio" : "portfolio active-portfolio"
        }
      >
        <button
          tabIndex={props.activePortfolio ? -1 : 0}
          onClick={handleShowSettings}
          className="portfolio-settings"
        >
          <img src="/images/settings.svg" alt="Options Icon" />
        </button>
        <button
          tabIndex={props.activePortfolio ? -1 : 0}
          onClick={props.handleOpenPortfolio}
          className="portfolio-close"
        >
          <p>X</p>
        </button>

        <PortfolioSettings
          changeDefaultOrPortfolio={props.changeDefaultOrPortfolio}
          activePortfolio={props.activePortfolio}
          handleSaveSettings={handleSaveSettings}
          showSettings={showSettings}
          clearCheck={clearCheck}
        />
        <PortfolioHeader />
        <PortfolioForm
          handleNewStorage={handleNewStorage}
          clearCheck={clearCheck}
          activePortfolio={props.activePortfolio}
        />
        <PortfolioHolder
          newStorage={newStorage}
          clearCheck={clearCheck}
          handleClearPortfolio={handleClearPortfolio}
          activePortfolio={props.activePortfolio}
        />
      </div>
    </div>
  );
};

export default Portfolio;
