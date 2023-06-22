import { UserNS } from "../types";

const updateUser = async (user: UserNS.User) => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/updateInfo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(async (response: Response) => {
      switch (response.status) {
        case 200:
          return await response.json();
        case 400:
          return "Invalid Email";
        case 404:
          return "Something went wrong, please try again!";
        case 500:
          return "Something went wrong, please try again!";
        default:
          return "Something went wrong, please try again!";
      }
    //   if (response.status === 200) return await response.json();
    //   else return false;
    })
    .catch((error: Error) => {
      console.error(error.message);
      return false;
    });
};

export default updateUser;
