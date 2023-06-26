import "./edit-roles.css";
import { BsSearch } from 'react-icons/bs';
import { useEditRoles } from "../../hooks";
const EditRoles = () => {
    const {search, setSearch} = useEditRoles();
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
    </div>
  );
};

export default EditRoles;
