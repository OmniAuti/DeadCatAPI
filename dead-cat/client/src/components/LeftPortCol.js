import PortfolioStockContainerLeft from "./PortfolioStockContainerLeft";


const LeftPortCol = (props) => {
  
  return (
    <div className="downer-col" style={props.openApp ? {width: '25%'} : {width: '50%'}}>
         {props.finalDownerArr.map(data =>
               <PortfolioStockContainerLeft activePortfolio={props.activePortfolio} openApp={props.openApp} toggleActivePortfolioLeft={props.toggleActivePortfolioLeft} key={data.id} data={data}/>
               )}    
    </div>
  );
};

export default LeftPortCol;
