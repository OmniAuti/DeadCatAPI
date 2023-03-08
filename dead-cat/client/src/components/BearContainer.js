const BearContainer = (props) => {
  
  return (
    <div onClick={() => props.toggleActiveDowner(props.data.id)} tabIndex={props.activePortfolio ? 0: -1} className={props.data.active ? "active-down-symbol downer symbol-box" : "downer symbol-box"}>
      <h2 id="symbol">{props.data.symbol}</h2>
      <p className="price">Price: ${props.data.price.toFixed(2)}</p>
      <div className="changes-row">
        <p className="">{props.data.changesPercentage.toFixed(2)}%</p>
        <img id="downArrow" src="./images/downArrow.svg"/>
        <p>${props.data.change.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BearContainer;
