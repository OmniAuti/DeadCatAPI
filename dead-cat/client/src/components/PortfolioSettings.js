import { useState, useEffect } from "react";
const PortfolioSettings = (props) => {
  const [checked, setChecked] = useState(true);
  const [inputVal, setInputVal] = useState("default");
  const handleSubmit = (e) => {
    e.preventDefault();
    // CAN'T SAVE EMPTY PORTFOLIO
    if (inputVal === "portfolio") {
      const storageCheck = JSON.parse(localStorage.getItem("deadCatPortfolio"));
      if (storageCheck === null) {
        alert(
          "Please save something in your portfolio before changing this setting."
        );
        return;
      } else if (storageCheck.length <= 0) {
        alert(
          "Please save something in your portfolio before changing this setting."
        );
        return;
      }
    }
    props.handleSaveSettings();
    props.changeDefaultOrPortfolio(inputVal);
  };

  const handleChangeSettings = (e) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    if (props.clearCheck === true) {
      setChecked(true);
      setInputVal("default");
      props.changeDefaultOrPortfolio("default")
      return;
    }
}, [props.clearCheck]);

  useEffect(() => {
    if (inputVal === "default") {
      setChecked(true);
      return;
    } else if (inputVal === "portfolio") {
      setChecked(false);
      return;
    } else if (inputVal === null) {
      setChecked(true);
      return;
    }
    return () => {};
  }, [inputVal]);

  useEffect(() => {
    const checkedStorage = JSON.parse(localStorage.getItem("deadCatSettings"));
    if (checkedStorage === "default") {
      setChecked(true);
      setInputVal("default");
      return;
    } else if (checkedStorage === "portfolio") {
      setChecked(false);
      setInputVal("portfolio");
      return;
    } else if (checkedStorage === null) {
      setInputVal("default");
      setChecked(true);
      return;
    }

    return () => {};
  }, []);

  // NEED TO CHANGE LATER ---------- HAVE THE CHECKED BTN BE WHATEVER IS IN LOCAL STORAGE
  return (
    <div
      className={
        props.showSettings
          ? "active-settings portfolio-settings-cont"
          : "portfolio-settings-cont"
      }
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <legend>What To Show On Load</legend>
          <label htmlFor="default-setting">Default</label>

          {checked ? (
            <input
              defaultChecked
              tabIndex={props.activePortfolio ? -1 : 0}
              onClick={(e) => handleChangeSettings(e)}
              name="settings"
              id="default-setting"
              type="radio"
              value="default"
            />
          ) : (
            <input
              tabIndex={props.activePortfolio ? -1 : 0}
              onClick={(e) => handleChangeSettings(e)}
              name="settings"
              id="default-setting"
              type="radio"
              value="default"
            />
          )}
          <label htmlFor="portfolio-setting">Show Portfolio</label>
          {checked ? (
            <input
              tabIndex={props.activePortfolio ? -1 : 0}
              onClick={(e) => handleChangeSettings(e)}
              name="settings"
              id="portfolio-setting"
              type="radio"
              value="portfolio"
            />
          ) : (
            <input
              defaultChecked
              tabIndex={props.activePortfolio ? -1 : 0}
              onClick={(e) => handleChangeSettings(e)}
              name="settings"
              id="portfolio-setting"
              type="radio"
              value="portfolio"
            />
          )}
          <input type="submit" value="Save Settings" />
        </fieldset>
      </form>
    </div>
  );
};

export default PortfolioSettings;
