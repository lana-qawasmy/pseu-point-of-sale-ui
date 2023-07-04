import "./navigation-bar.css";
import { IconContext } from "react-icons";
import { MdAddBox, MdSpaceDashboard, MdHistory } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
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
                >{(userContext.user?.role === 'manager' || userContext.user?.role === 'admin') &&
                    <div className="optionWrapper">
                        <button
                            type="button"
                            className={location.pathname === "/addItem" ? "focusBtn" : ""}
                            onClick={() => {
                                navigate("/addItem", { replace: false });
                            }}
                        >
                            <span>.</span>
                            <MdAddBox />
                        </button>
                    </div>
                    }
                    <div className="optionWrapper">
                        <button
                            type="button"
                            className={location.pathname === "/" ? "focusBtn" : ""}
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
                            className={location.pathname === "/ordersHistory" ? "focusBtn" : ""}
                            onClick={() => {
                                navigate("/ordersHistory", { replace: false });
                            }}
                        >
                            <span>.</span>
                            <MdHistory />
                        </button>
                    </div>
                    {(userContext.user?.role === 'manager' || userContext.user?.role === 'admin') &&
                        <div className="optionWrapper">
                            <button
                                type="button"
                                className={location.pathname === "/existedItems" ? "focusBtn" : ""}
                                onClick={() => {
                                    navigate("/existedItems", { replace: false });
                                }}
                            >
                                <span>.</span>
                                <FaClipboardList />
                            </button>
                        </div>
                    }
                    {(location.pathname.includes('/viewSingleItem') || location.pathname.includes('/viewSingleOrder')) &&
                        <div className="optionWrapper">
                            <button
                                type="button"
                                className={(location.pathname.includes('/viewSingleItem') || location.pathname.includes('/viewSingleOrder')) ? "focusBtn" : ""}
                                onClick={() => {
                                    navigate("/addItem", { replace: false });
                                }}
                            >
                                <span>.</span>
                                <AiOutlineEye />
                            </button>
                        </div>
                    }
                </IconContext.Provider>
            </div>
            <div className="logoutContainer">
                <div className="optionWrapper">

                    <button
                        type="button"
                        className={location.pathname === "/profile" ? "focusBtn" : ""}
                        onClick={() => {
                            navigate("/profile", { replace: false });
                        }}
                    >
                        <span>.</span>
                        <CgProfile size={'2em'} color={`${location.pathname === "/profile" ? '#03045e' : '#e0e2e8'}`} className='radioIcons' />
                    </button>
                    <button onClick={logOut} className='logoutButton'>
                        <RiLogoutBoxRFill color="#e0e2e8" size="2.3em" />
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default NavigationBar;
