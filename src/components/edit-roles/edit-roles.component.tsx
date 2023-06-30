import "./edit-roles.css";
import { BsSearch } from "react-icons/bs";
import { useEditRoles } from "../../hooks";
const EditRoles = () => {
  const {
    search,
    setSearch,
    usersList,
    handleChangeRole,
  } = useEditRoles();
  return (
    <div className="editRolesContainer">
        <h1 style={{textAlign: "left"}}>Users List</h1>
      <div className="userSearchWrapper">
        <input
          type="text"
          id="usersSearch"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <i className="fa fa-user icon">
          <BsSearch />
        </i>
      </div>
      <div className="usersListContainer">
          {usersList?.map((user, index) => {
            return (
              <div key={index}>
                <span key={index}>{user.fullName}</span>
                <div className="selectWrapper">
                <select
                  onChange={(e) =>
                    handleChangeRole(e.target.value, user, index)
                  }
                >
                  {user.role === "cashier" && (
                    <>
                      <option value="cashier">Cashier</option>
                      <option value="manager">Manager</option>
                    </>
                  )}
                  {user.role === "manager" && (
                    <>
                      <option value="manager">Manager</option>
                      <option value="cashier">Cashier</option>
                    </>
                  )}
                </select>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EditRoles;
