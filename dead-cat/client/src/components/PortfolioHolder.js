import PortfolioItem from "./PortfolioItem";
import { useState, useEffect } from "react";

const PortfolioHolder = (props) => {
  const [storageArr, setStorageArr] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
// THIS IS FOR DELETING ================================
  const handleDeleteStorageItem = (id) => {
    setStorageArr(storageArr.filter((item) => item.id !== id));
  };
  // ADDED NEW ITEM ===================
  useEffect(() => {
    setStorageArr(JSON.parse(localStorage.getItem("deadCatPortfolio")));
    setIsEmpty(false)
  }, [props.newStorage]);

  // CHECKING AND SETTING STORAGE BASED ON STORAGEARR STATE ===================
  useEffect(() => {
    if (storageArr === null) {
      localStorage.removeItem("deadCatPortfolio")
      setIsEmpty(true);
       return
    } else if (storageArr.length <= 0) {
      localStorage.removeItem("deadCatPortfolio")
      setIsEmpty(true)
      return
    }
    localStorage.setItem("deadCatPortfolio", JSON.stringify(storageArr))
    setIsEmpty(false)
  }, [storageArr])

  useEffect(() => {
    if (props.clearCheck === true) {
      setStorageArr([])
    }
  }, [props.clearCheck])
  // SETTING PORTFOLIO ON LOAD ===================
  useEffect(() => {
    const storageCheck = JSON.parse(localStorage.getItem("deadCatPortfolio"));   
    if (storageCheck === null) {
      setIsEmpty(true);
       return
    } else if (storageCheck.length <= 0) {
      setIsEmpty(true)
      return
    }

    localStorage.setItem("deadCatPortfolio", JSON.stringify(storageCheck))
    setStorageArr(storageCheck)
    setIsEmpty(false)
  }, [])

if (isEmpty) {
  return (
    <div className="portfolio-holder">
      <hr></hr>

      <p>Empty</p>

      <button
        onClick={props.handleClearPortfolio}
        tabIndex={props.activePortfolio ? -1 : 0}
        className="clear-portfolio"
      >
        Clear Entire Portfolio
      </button>
    </div>
  );
  } else {
    return (
      <div className="portfolio-holder">
        <hr></hr>

        {storageArr.map((data) => (
          <PortfolioItem
            handleDeleteStorageItem={handleDeleteStorageItem}
            key={data.id}
            data={data}
          />
        ))}

        <button
          onClick={props.handleClearPortfolio}
          tabIndex={props.activePortfolio ? -1 : 0}
          className="clear-portfolio"
        >
          Clear Entire Portfolio
        </button>
      </div>
    );
  }
};

export default PortfolioHolder;
