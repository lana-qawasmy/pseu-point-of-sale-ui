import "./user-profile.css";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { BiDownArrow } from "react-icons/bi";
import { useEditUser } from "../../hooks";
import { Button } from "../../components/core";

const UserProfile = () => {
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
  } = useEditUser();

  return (
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
              <input type={showPassword[0]? "text" : "password"} />
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
              <input type={showPassword[1]? "text" : "password"} />
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
              <input type={showPassword[2]? "text" : "password"} />
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
          <div className="passwordButtons">
            <Button HtmlType="button" Type="Ghost" onClick={(e)=>{setShowPasswordContainer(false)}}>Cancel</Button>
            <Button HtmlType="button" Type="Ghost">Save</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
