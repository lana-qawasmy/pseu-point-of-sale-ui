import "./navigation-bar.css";
import { IconContext } from "react-icons";
import { MdAddBox, MdSpaceDashboard, MdHistory } from "react-icons/md";
import { LuView } from "react-icons/lu";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../providers/user.provider";

const NavigationBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userContext = useContext(UserContext);
    const logOut = () => {
        userContext.setUser && userContext.setUser(undefined);
        sessionStorage.removeItem('user');
        navigate("/signin", { replace: false });
    };

    return location.pathname !== "/signin" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/terms" ? (
        <div className="navigationBarContainer">
            <div className="logoContainer" onClick={() => navigate("/", { replace: false })}></div>
            <div className="optionsContainer">
                <IconContext.Provider
                    value={{ color: "#e0e2e8", size: "2em", className: "radioIcons" }}
                >
                    <div className="optionWrapper">
                        <button
                            type="button"
                            className={location.pathname === "/addItem" ? "focus" : ""}
                            onClick={() => {
                                navigate("/addItem", { replace: false });
                            }}
                        >
                            <span>.</span>
                            <MdAddBox />
                        </button>
                    </div>
                    <div className="optionWrapper">
                        <button
                            type="button"
                            className={location.pathname === "/" ? "focus" : ""}
                            onClick={() => {
                                navigate("/", { replace: false });
                            }}
                        >
                            <span>.</span>
                            <MdSpaceDashboard />
                        </button>
                    </div>
                    <div className="optionWrapper">
                        <button
                            type="button"
                            className={location.pathname === "/ordersHistory" ? "focus" : ""}
                            onClick={() => {
                                navigate("/ordersHistory", { replace: false });
                            }}
                        >
                            <span>.</span>
                            <MdHistory />
                        </button>
                    </div>
                    <div className="optionWrapper">
                        <button
                            type="button"
                            className={location.pathname === "/existedItems" ? "focus" : ""}
                            onClick={() => {
                                navigate("/existedItems", { replace: false });
                            }}
                        >
                            <span>.</span>
                            <LuView />
                        </button>
                    </div>
                </IconContext.Provider>
            </div>
            <div className="logoutContainer">
                <button onClick={logOut}>
                    <RiLogoutBoxRFill color="#e0e2e8" size="2.3em" />
                </button>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default NavigationBar;
