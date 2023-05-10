import { ItemNS } from "../types";
const addItem = async (item: ItemNS.Item) => {
  try {
    const stringResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/item/addItem`,
      {
        method: "POST",
        body: JSON.stringify(item),
      }
    );
    console.log("here's addItem response: ", await stringResponse.json());
    return await stringResponse.json();
  } catch (error) {
    console.log("failed to send the request! the error: ",error);
    return false;
  }
};

export { addItem };
