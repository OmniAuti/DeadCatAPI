import BullContainer from "./BullContainer";

const BullCol = (props) => {

    return(
        <div className="upper-col" style={props.openApp ? {width: '25%'} : {width: '50%'}}>
           {props.finalUpperArr.map(data =>
               <BullContainer activePortfolio={props.activePortfolio} openApp={props.openApp}  toggleActiveUpper={props.toggleActiveUpper} key={data.id} data={data}/>
               )}    
        </div>
    )
}

export default BullCol; 