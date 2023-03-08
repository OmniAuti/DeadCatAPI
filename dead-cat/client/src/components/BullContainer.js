const BullContainer = (props) => {

  return (
      <div onClick={() => props.toggleActiveUpper(props.data.id)} tabIndex={props.activePortfolio ? 0 : - 1} className={props.data.active ? "active-up-symbol upper symbol-box" : "upper symbol-box"}>
        <h2 id="symbol">{props.data.symbol}</h2>
        <p className="">Price: ${props.data.price.toFixed(2)}</p>
        <div className="changes-row">
          <p className="">{props.data.changesPercentage.toFixed(2)}%</p>
          <img id="upArrow" src="./images/upArrow.svg"/>
          <p>${props.data.change.toFixed(2)}</p>
        </div>
      </div>
  );
};

export default BullContainer;
