const PortfolioStockContainerRight = (props) => {
  
  var activePortfolioSymbol = ""

    if ( props.data.changesPercentage < 0) {
      activePortfolioSymbol = "active-portfolio-symbol-bear";
    } else if (props.data.changesPercentage > 0) {
      activePortfolioSymbol = "active-portfolio-symbol-bull";
    } else {
      activePortfolioSymbol =  "active-portfolio-symbol"
    }

    return (
      <div onClick={() => props.toggleActivePortfolioRight(props.data.id)} tabIndex={props.activePortfolio ? 0: -1} className={props.data.active ? `${activePortfolioSymbol} upper symbol-box` : "upper symbol-box"}>
        <h2 id="symbol">{props.data.symbol}</h2>
        <p className="price">Price: ${props.data.price.toFixed(2)}</p>
        <div className="changes-row">
          <p className="">{props.data.changesPercentage.toFixed(2)}%</p>
          <div id={Number(props.data.changesPercentage) < 0 ? 'search-arrow-down' : 'search-arrow-up'}></div>
          <p>${props.data.change.toFixed(2)}</p>
        </div>
      </div>
    );
  };
  
  export default PortfolioStockContainerRight;
  