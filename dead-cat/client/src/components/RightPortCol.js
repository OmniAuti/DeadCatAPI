import PortfolioStockContainerRight from "./PortfolioStockContainerRight";


const RightPortCol = (props) => {
  
  return (
    <div className="upper-col" style={props.openApp ? {width: '25%'} : {width: '50%'}}>
         {props.finalUpperArr.map(data =>
               <PortfolioStockContainerRight activePortfolio={props.activePortfolio} openApp={props.openApp} toggleActivePortfolioRight={props.toggleActivePortfolioRight} key={data.id} data={data}/>
               )}    
    </div>
  );
};

export default RightPortCol;
