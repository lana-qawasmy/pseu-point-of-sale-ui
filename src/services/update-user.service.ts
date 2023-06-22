import { UserNS } from "../types";
export interface IPasswords {
    old: string;
    new: string;
    _id: string
  }
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
    })
    .catch((error: Error) => {
      console.error(error.message);
      return false;
    });
};

const updatePassword = async(passwords: IPasswords) =>{
    return fetch(`${process.env.REACT_APP_SERVER_URL}/user/updatePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwords),
      }).then(async (response: Response) => {
            if(response.status === 200){
                return await response.json();
            }else if(response.status === 400){
                return 'Something went wrong, please try again';
            }
        })
        .catch((error: Error) => {
          console.error(error.message);
          return undefined;
        });
}

export  {updateUser, updatePassword};
