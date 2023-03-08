import BearContainer from "./BearContainer";

const BearCol = (props) => {
  
  return (
    <div className="downer-col" style={props.openApp ? {width: '25%'} : {width: '50%'}}>
         {props.finalDownerArr.map(data =>
               <BearContainer activePortfolio={props.activePortfolio} openApp={props.openApp} toggleActiveDowner={props.toggleActiveDowner} key={data.id} data={data}/>
               )}    
    </div>
  );
};

export default BearCol;
