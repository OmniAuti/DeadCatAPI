const PortfolioItem = (props) => {
    return (
        <div className="portfolio-item" >
            <h3>{props.data.symbol}</h3>
           <button onClick={(id) => props.handleDeleteStorageItem(props.data.id)}><img className="trash-bin" src="/images/bin.svg"/></button>  
        </div>
    )
}

export default PortfolioItem;