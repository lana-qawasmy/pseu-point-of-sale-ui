import "./user-profile.css";
import { EditRoles } from "../../components";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { BiDownArrow } from "react-icons/bi";
import { useEditUser } from "../../hooks";
import { Button } from "../../components/core";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../components/providers/user.provider";

const UserProfile = () => {
  const {user} = useContext(UserContext);
  const {
    uploadImage,
    inputState,
    setInputState,
    deleteImage,
    showImageButtons,
    setShowImageButtons,
    showPasswordContainer,
    setShowPasswordContainer,
    showPassword,
    setShowPassword,
    handlePassword,
    showPasswordAlert,
    handleSaveInfo,
    handleSavePassword,
    passwords,
  } = useEditUser();
  const navigate = useNavigate();
  return (
    <div className="profilePage">
      <div className="userProfileContainer">
        <div
          className="imageWrapper"
          onMouseOver={() => setShowImageButtons(true)}
          onMouseLeave={() => setShowImageButtons(false)}
        >
          <div
            className="image"
            style={{ backgroundImage: `url("${inputState.image}")` }}
          ></div>
          {/* {showImageButtons && ( */}
          {showImageButtons && (
            <div className="imageButtonsWrapper">
              <label htmlFor="imageFile" className="btn">
                Change <AiOutlineEdit />
                <input
                  style={{ color: "transparent" }}
                  type="file"
                  id="imageFile"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                ></input>
              </label>
              <button className="btn" onClick={deleteImage}>
                Remove <AiOutlineDelete />
              </button>
            </div>
          )}
        </div>
        <div className="personalInfoContainer">
          <div>
            <span>Full name</span>
            <input
              type="text"
              value={inputState.name}
              onChange={(e) => {
                setInputState((oldState) => ({
                  ...oldState,
                  name: e.target.value,
                }));
              }}
            />
          </div>
          <div>
            <span>Email</span>
            <input
              type="text"
              value={inputState.email}
              onChange={(e) => {
                setInputState((oldState) => ({
                  ...oldState,
                  email: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="passwordAnchor">
          <span
            onClick={() =>
              setShowPasswordContainer(showPasswordContainer ? false : true)
            }
          >
            Edit password{" "}
            <BiDownArrow
              className={`arrowIcon ${showPasswordContainer ? "flipUp" : ""}`}
            />
          </span>
        </div>
        {showPasswordContainer && (
          <div
            className={`passwordContainer ${
              showPasswordContainer ? "slideIn" : "slideOut"
            }`}
          >
            <div>
              <span>Old password</span>
              <div>
                <input
                  type={showPassword[0] ? "text" : "password"}
                  onChange={(e) => {
                    handlePassword(e.target.value, 0);
                  }}
                  onClick={() => {
                    handlePassword(passwords.old, 0);
                  }}
                />
                {showPassword[0] ? (
                  <AiOutlineEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword([false, false, false])}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword([true, false, false])}
                  />
                )}
              </div>
            </div>
            <div>
              <span>New password</span>
              <div>
                <input
                  type={showPassword[1] ? "text" : "password"}
                  onChange={(e) => {
                    handlePassword(e.target.value, 1);
                  }}
                  onClick={() => {
                    handlePassword(passwords.new, 1);
                  }}
                />
                {showPassword[1] ? (
                  <AiOutlineEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword([false, false, false])}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword([false, true, false])}
                  />
                )}
              </div>
            </div>
            <div>
              <span>Confirm password</span>
              <div>
                <input
                  type={showPassword[2] ? "text" : "password"}
                  onChange={(e) => {
                    handlePassword(e.target.value, 2);
                  }}
                  onClick={() => {
                    handlePassword(passwords.confirmed, 2);
                  }}
                />
                {showPassword[2] ? (
                  <AiOutlineEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword([false, false, false])}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword([false, false, true])}
                  />
                )}
              </div>
            </div>
            <div
              className="alerWrapper"
              style={{ color: "red", fontSize: "14px" }}
            >
              {showPasswordAlert[0] && (
                <span>
                  At least 8 charachters including upper/lower case, numbers and
                  special characters
                  <br />
                </span>
              )}
              {showPasswordAlert[1] && (
                <span>
                  Passwords are not the same
                  <br />
                </span>
              )}
              {showPasswordAlert[2] && (
                <span>
                  The new password is the same as the old one
                  <br />
                </span>
              )}
            </div>
            <div className="passwordButtons">
              <Button
                HtmlType="button"
                Type="Ghost"
                onClick={(e) => {
                  setShowPasswordContainer(false);
                }}
              >
                Cancel
              </Button>
              <Button
                HtmlType="button"
                Type="Ghost"
                Disabled={showPasswordAlert.includes(true)}
                onClick={handleSavePassword}
              >
                Save
              </Button>
            </div>
          </div>
        )}
        <div className="buttonsWrapper">
          <Button
            HtmlType="button"
            Type="Danger"
            Width="100"
            Radius="20"
            onClick={(e) => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
          <Button
            HtmlType="button"
            Type="Tertiary"
            Width="100"
            Radius="20"
            onClick={handleSaveInfo}
          >
            Save
          </Button>
        </div>
      </div>
      {
        user?.role === 'admin' &&
        <EditRoles />
      }
    </div>
  );
};

export default UserProfile;
