import { indicatorColors } from "../JS/bullishBearishCheck";
import {useEffect, useState, useRef} from 'react';

const TechnicalIndicators = (props) => {    
//state ====================================
    const [render, setRender] = useState(false)
    // end of state ==================================
  
    const myRef = useRef(null)
// USE REF TO SCROLL TO TOP ========================
    const handleScroll = (ref) => {
        ref.current.scrollTo({
          top:0,
          left: 0,
          behavior: "smooth",
        });
      };

    useEffect(() => {
        handleScroll(myRef)
        setRender(!render)
        indicatorColors(props.technicalAnalysisCol)
    }, [props.technicalAnalysisCol])

    
    var activeTechnicals = "";

    if (props.technicalAnalysisCol.changesPercentage < 0) {
        activeTechnicals = "active-portfolio-technicals-Bear"
    } else if (props.technicalAnalysisCol.changesPercentage > 0) {
        activeTechnicals = "active-portfolio-technicals-Bull"
    } else {
        activeTechnicals = "active-portfolio-technicals-neutral"
    }
  
    return(
    <div ref={myRef} className={ `${activeTechnicals} technical-indicators-col`}>
            
      <h2 className="tech-title">Daily Indicators</h2>
      <p className="tech-title-warn">For Educational Purposes Only</p>

          <div className="tech-vol-row">
          <a tabIndex={props.openApp ? 0 : -1} className="info-link" href="https://www.investopedia.com/articles/technical/02/010702.asp" target="_blank"><h3 className='tech-header'>Volume</h3></a>
              <p>Average: <span className="tech-to-left avgVolume-actual">{props.technicalAnalysisCol.avgVolume}</span></p> 
              <p>Current Day: <span className="tech-to-left volumeToday-actual">{props.technicalAnalysisCol.volume}</span></p>
              <p>Change: <span className="tech-to-left"> {props.technicalAnalysisCol.volumeIncreaseToday}%</span></p>
              <p>Day Before: <span className="tech-to-left"> {props.technicalAnalysisCol.volumeYesterday}</span></p>
              <p>Change: <span className="tech-to-left"> {props.technicalAnalysisCol.volumeIncreaseYesterday}%</span></p>
          </div>

        <div className="tech-row">

          <a tabIndex={props.openApp ? 0 : -1} className="info-link sma-search-header" href="https://www.investopedia.com/terms/s/sma.asp" target="_blank"><h3 className='tech-header'>SMA</h3></a>
              <div className="averages-row">
                  <p className="smafifteen-search-actual">15: ${props.technicalAnalysisCol.smaFiveTeen}</p>
                  <p className="smatwenty-search-actual">20: ${props.technicalAnalysisCol.smaTwenty}</p>
              </div>
              <div className="averages-row">
                  <p className="smathirty-search-actual">30: ${props.technicalAnalysisCol.smaThirty}</p>
                  <p className="smafifty-search-actual">50: ${props.technicalAnalysisCol.smaFifty}</p>
              </div>
              
                 <p className="goldenSma-cross golden-cross">Golden Cross</p>
                 <p className="deathSma-cross death-cross">Death Cross</p>

              <div className="averages-row">
                  <p className="smaonehundred-search-actual">100: ${props.technicalAnalysisCol.smaOneHun}</p>
                  <p className="smatwohundred-search-actual">200: ${props.technicalAnalysisCol.smaTwoHun}</p>
              </div>
        </div>

      <div className="tech-row">
      <a tabIndex={props.openApp ? 0 : -1} className="info-link ema-search-header" href="https://www.investopedia.com/terms/e/ema.asp" target="_blank"><h3 className='tech-header'>EMA</h3></a>
                <div className="averages-row">
                <p className="emaeight-search-actual">8: ${props.technicalAnalysisCol.emaEight}</p>
                <p className="ematwelve-search-actual">12: ${props.technicalAnalysisCol.emaTwelve}</p>
                </div>
                <div className="averages-row">
                <p className="ematwenty-search-actual">20: ${props.technicalAnalysisCol.emaTwenty}</p>
                <p className="ematwentysix-search-actual">26: ${props.technicalAnalysisCol.emaTwentySix}</p>
                </div>  
                
                <p className="goldenEma-cross golden-cross ema-cross">Golden Cross</p>
                <p className="deathEma-cross death-cross ema-cross">Death Cross</p>
                
                <div className="averages-row">
                <p className="emafifty-search-actual">50: ${props.technicalAnalysisCol.emaFifty}</p>
                <p className="ematwohundred-search-actual">200: ${props.technicalAnalysisCol.emaTwoHun}</p>
                </div>         
      </div>

      <div className="tech-row">
      <a tabIndex={props.openApp ? 0 : -1} className="info-link wma-search-header" href="https://www.investopedia.com/ask/answers/071414/whats-difference-between-moving-average-and-weighted-moving-average.asp" target="_blank"><h3 className='tech-header'>WMA</h3></a>
              <div className="averages-row">
                  <p className="wmafifteen-search-actual">15: ${props.technicalAnalysisCol.wmaFiveTeen}</p>
                  <p className="wmatwenty-search-actual">20: ${props.technicalAnalysisCol.wmaTwenty}</p>
              </div>
              <div className="averages-row">
                  <p className="wmathirty-search-actual">30: ${props.technicalAnalysisCol.wmaThirty}</p>
                  <p className="wmafifty-search-actual">50: ${props.technicalAnalysisCol.wmaFifty}</p>
              </div>

              <p className="goldenWma-cross golden-cross wma-cross">Golden Cross</p>
              <p className="deathWma-cross death-cross wma-cross">Death Cross</p>

              <div className="averages-row">
                  <p className="wmaonehundred-search-actual">100: ${props.technicalAnalysisCol.wmaOneHun}</p>
                  <p className="wmatwohundred-search-actual">200: ${props.technicalAnalysisCol.wmaTwoHun}</p>
              </div>
      </div>

      <div className="tech-row">
      <a tabIndex={props.openApp ? 0 : -1} className="info-link vwma-search-header" href="https://www.tradingsetupsreview.com/volume-weighted-moving-average-vwma/" target="_blank"><h3 className='tech-header'>VWMA</h3></a>
              <div className="averages-row">
                  <p className="vwmafifteen-search-actual">15: ${props.technicalAnalysisCol.vwmaFiveTeen}</p>
                  <p className="vwmatwenty-search-actual">20: ${props.technicalAnalysisCol.vwmaTwenty}</p>
              </div>
              <div className="averages-row">
                  <p className="vwmathirty-search-actual">30: ${props.technicalAnalysisCol.vwmaThirty}</p>
                  <p className="vwmafifty-search-actual">50: ${props.technicalAnalysisCol.vwmaFifty}</p>
              </div>

              <p className="goldenVwma-cross golden-cross vwma-cross">Golden Cross</p>
              <p className="deathVwma-cross death-cross vwma-cross">Death Cross</p>

              <div className="averages-row">
                  <p className="vwmaonehundred-search-actual">100: ${props.technicalAnalysisCol.vwmaOneHun}</p>
                  <p className="vwmatwohundred-search-actual">200: ${props.technicalAnalysisCol.vwmaTwoHun}</p>
              </div>
      </div>

          <div className="tech-row">
          <a tabIndex={props.openApp ? 0 : -1} className="info-link vwap-search-header" href="https://www.investopedia.com/terms/v/vwap.asp" target="_blank"><h3 className='tech-header'>VWAP (5 Minute)</h3></a>
              <p className="osc-text vwap-search-actual">${props.technicalAnalysisCol.vwap}</p>
          </div>

          <div className="tech-row">
          <a tabIndex={props.openApp ? 0 : -1} className="info-link macd-search-header" href="https://www.investopedia.com/terms/m/macd.asp" target="_blank"><h3 className='tech-header'>MACD (12 , 26)</h3></a>
              <p className="osc-text macd-search-actual">{props.technicalAnalysisCol.macd}</p>
                  <div className="macd-row">
                      <p className="sl">Signal Line:<br></br>{props.technicalAnalysisCol.macdSignalLine}</p>
                      <p className="sl">Histogram:<br></br>{props.technicalAnalysisCol.macdHistogram}</p>
                  </div>
          </div>

          <div className="flex-rsi-cci">
              <div className="tech-row">
              <a tabIndex={props.openApp ? 0 : -1} className="info-link rsi-search-header" href="https://www.investopedia.com/terms/s/stochrsi.asp" target="_blank"><h3 className='tech-header'>RSI</h3></a>
                  <p className="osc-text rsi-search-actual">{props.technicalAnalysisCol.rsi}</p>
              </div>

              <div className="tech-row">
              <a tabIndex={props.openApp ? 0 : -1} className="info-link cci-search-header" href="https://www.investopedia.com/terms/c/commoditychannelindex.asp" target="_blank"><h3 className='tech-header'>CCI</h3></a>
                  <p className="osc-text cci-search-actual">{props.technicalAnalysisCol.cciTwenty}</p>
              </div>

          </div>

          <div className="tech-row">
          <a tabIndex={props.openApp ? 0 : -1} className="info-link williams-search-header" href="https://www.investopedia.com/terms/w/williamsr.asp" target="_blank"><h3 className='tech-header'>Williams %R</h3></a>
              <p className="osc-text williams-search-actual">{props.technicalAnalysisCol.williamsR}</p>
          </div>


          <div className="tech-row">
          <a tabIndex={props.openApp ? 0 : -1} className="info-link stochastic-search-header" href="https://www.investopedia.com/terms/s/stochasticoscillator.asp" target="_blank"><h3 className='tech-header'>Stochastic Oscillator</h3></a>
          <div className="averages-row">
              <p className="osc-text stochasticK-search-actual stochK">%K: {props.technicalAnalysisCol.stochasticK}</p>
              <p className="osc-text stochasticD-search-actual stochD">%D: {props.technicalAnalysisCol.stochasticD}</p>
          </div>
              <p className="osc-text">Signal Line: {props.technicalAnalysisCol.stochasticSignal}</p>
          </div>

          <div className="tech-row">
          <a tabIndex={props.openApp ? 0 : -1} className="info-link bb-search-header" href="https://www.investopedia.com/terms/b/bollingerbands.asp" target="_blank"><h3 className='tech-header'>Bollinger Bands</h3></a>
              <p className="osc-text bbPercent-search-actual">%B: {props.technicalAnalysisCol.bbPercent}</p>
              <div className="averages-row">
                  <p className="osc-text">Upper:<br></br>{props.technicalAnalysisCol.bbUpper}</p>
                  <p className="osc-text">Lower:<br></br>{props.technicalAnalysisCol.bbLower}</p>
              </div>
                  <p className="osc-text">Middle: {props.technicalAnalysisCol.bbMiddle}</p>

          </div>

          <div className="news-row">
          <a tabIndex={props.openApp ? 0 : -1} className="tech-header-news" href={`http://www.google.com/search?q=${props.technicalAnalysisCol.symbol}+stock+news&source=lnms&tbm=nws&sa=X&ved=2ahUKEwj7_6eMpbPyAhXaVs0KHfuADvoQ_AUoAXoECAEQAw&biw=1280&bih=614`} target="_blank">News About This Stock</a>
          </div>

          <div className="news-row">
          <a tabIndex={props.openApp ? 0 : -1} className="buy-coffee-link" target="_blank" href="https://buymeacoffee.com/omniauti">Support With A Coffee <img src="images/bmc-logo.svg" /></a>
          </div>
      </div>
    )
}

export default TechnicalIndicators;