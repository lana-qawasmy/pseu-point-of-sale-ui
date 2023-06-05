import "./navigation-bar.css";
import { IconContext } from "react-icons";
import { MdAddBox, MdSpaceDashboard, MdHistory } from "react-icons/md";
import { LuView } from "react-icons/lu";

const NavigationBar = () => {
  // #03045e
  return (
    <div className="navigationBarContaier">
      <div className="logoContainer"></div>
      <div className="optionsContainer">
        <IconContext.Provider
          value={{ color: "#e0e2e8", size: "2em", className: "radioIcons" }}
        >
          <div className="optionWrapper">
            <button type="button">
              <span>.</span>
              <MdAddBox />
            </button>
          </div>
          <div className="optionWrapper">
            <button type="button">
              <span>.</span>
              <MdSpaceDashboard />
            </button>
          </div>
          <div className="optionWrapper">
            <button type="button">
              <span>.</span>
              <MdHistory />
            </button>
          </div>
          <div className="optionWrapper">
            <button type="button">
              <span>.</span>
              <LuView />
            </button>
          </div>
        </IconContext.Provider>
      </div>
      <div className="logoutContainer"></div>
    </div>
  );
};

export default NavigationBar;
