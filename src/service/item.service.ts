import { ItemNS } from "../types";
const addItem = async (item: ItemNS.Item) => {
  try {
    const stringResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/item/addItem`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(item),
      }
    );
    console.log("here's addItem response: ",  stringResponse);
    return stringResponse;
  } catch (error) {
    console.log("failed to send the request! the error: ",error);
    return false;
  }
};

export { addItem };
