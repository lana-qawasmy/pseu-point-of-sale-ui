import "./edit-roles.css";
import { BsSearch } from 'react-icons/bs';
import { useEditRoles } from "../../hooks";
const EditRoles = () => {
    const {
        search, setSearch,
        usersList,setUsersList,
        handleChangeRole,
    } = useEditRoles();
  return (
    <div className="editRolesContainer">
      <div className="userSearchWrapper">
        <input 
        type="text" 
        id="usersSearch" 
        placeholder="Search"
        value={search}
        onChange={e=>{setSearch(e.target.value)}}
        />
        <i className="fa fa-user icon"><BsSearch /></i>
      </div>
      <div className="usersListContainer">
        <ul>
            {
                usersList?.map((user,index) =>{
                    return(
                        <li key={index}>
                            <span key={index}>{user.fullName}</span>
                            <select onChange={e => handleChangeRole(e.target.value, user, index)}>
                                {user.role === 'cashier'&&
                                <>
                                <option value="cashier">Cashier</option>
                                <option value="manager">Manager</option>
                                </>
                                }
                                {user.role === 'manager'&&
                                <>
                                <option value="manager">Manager</option>
                                <option value="cashier">Cashier</option>
                                </>
                                }
                            </select>
                        </li>
                    )
                })
            }
        </ul>
        {/* <select onChange={e => handleChangeRole(e.target.value)}>
            {
                usersList?.map((user, index)=>{
                    return (
                        <option 
                        value={user._id} 
                        key={index} 
                        >
                            {user.fullName}
                        </option>
                        )
                })
            }
        </select> */}
      </div>
    </div>
  );
};

export default EditRoles;
