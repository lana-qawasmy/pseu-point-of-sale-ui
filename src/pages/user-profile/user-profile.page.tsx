import "./user-profile.css";
import { useContext, useState } from "react";
import { UserContext } from "../../components/providers/user.provider";
import image from "../../assets/profile-Icon.jpg";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useEditUser } from "../../hooks";

const UserProfile = () => {
  const user = useContext(UserContext);
  const {
    uploadImage,
    inputState,
    setInputState,
    deleteImage,
    showImageButtons,
    setShowImageButtons,
  } = useEditUser();

  const style = {
    backgroundImage:
      user.user?.image === ""
        ? `url('${image}')`
        : `url('${user.user?.image}')`,
  };

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
          <input type="text" value={inputState.name}
          onChange={(e)=>{setInputState((oldState) => ({ ...oldState, name: e.target.value }))}} />
        </div>
        <div>
          <span>Email</span>
          <input type="text" value={inputState.email}
          onChange={(e)=>{setInputState((oldState) => ({ ...oldState, email: e.target.value }))}} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
