import {useState} from 'react'

const Header = (props) => {

const [searchValue, setSearchValue] = useState('')

  function handleSearchText(e) {
    var symbol = e.target.value.toUpperCase();
    setSearchValue(symbol)
  }

  function handleSubmit(e) {
     e.preventDefault()
     // search function in app.js
     props.handleSearch(searchValue)
     setTimeout(() => [
      setSearchValue('')
     ], 250)
  }

  return (
    <header className="header">
      <button onClick={props.handleOpenPortfolio} id="portfolio">
        <img src="./images/services-portfolio.svg" />
      </button>

      <h1>
        Dead
        <a href="http://www.deadcatapp.com/" target="_blank">
          <img className="deadCat-header" src="./images/deadCatLogo.png" />
        </a>
        Cat
      </h1>

      <div className="search-bar">
        <form onSubmit={(e) => handleSubmit(e)} name="search-form">
        <input
          disabled={props.pullDone ? false : true}
          maxLength="4"
          min="1"
          className="search-text"
          id="search-bar"
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchText(e)}
        />
        </form>
        <button disabled={props.pullDone ? false : true} onClick={(e) => handleSubmit(e)} id="search-submit-btn" htmlFor="search-form" type="submit">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="search"
          className="search-icon"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
          ></path>
        </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
