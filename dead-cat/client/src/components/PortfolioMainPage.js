import LeftPortCol from "./LeftPortCol";
import RightPortCol from "./RightPortCol";

const PortfolioMainPage = (props) => {
    return(
        <div>
            <LeftPortCol finalDownerArr={props.finalDownerArr} toggleActivePortfolioLeft={props.toggleActivePortfolioLeft} activePortfolio={props.activePortfolio} openApp={props.openApp}/>
            <RightPortCol finalUpperArr={props.finalUpperArr} toggleActivePortfolioRight={props.toggleActivePortfolioRight} activePortfolio={props.activePortfolio} openApp={props.openApp}/>
        </div>
    )
}

export default PortfolioMainPage;