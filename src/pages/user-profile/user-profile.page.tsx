import'./user-profile.css';
import { useContext } from 'react';
import { UserContext } from '../../components/providers/user.provider';
import image from '../../assets/imageIcon.svg';

const UserProfile = () =>{
    const user = useContext(UserContext);
    const style = {
        backgroundImage: user.user?.image === ""?
        `url('${image}')` : 
        `url('${user.user?.image}')`,
    };
    console.log(image);
    return(
        <div className="userProfileContainer">
            <div className="imageWrapper">
                <div className="image" style={style} ></div>
            </div>
        </div>
    )
}

export default UserProfile;