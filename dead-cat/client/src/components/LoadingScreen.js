import {useEffect} from 'react'


const LoadingScreen = (props) => {

  
  return (
    <div className="loading-screen">
        <div className="loading-container">
        <div className="down-arrow-loading"></div>
        <div className="up-arrow-loading"></div>
        </div>
      <h1 id="loading-text">Loading</h1>
    </div>
  );
};

export default LoadingScreen;
