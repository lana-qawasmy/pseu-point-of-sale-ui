import { ItemNS } from "../types";
const addItem = async (item: ItemNS.Item, token: string) => {
    try {
        const stringResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/item/addItem`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                method: "POST",
                body: JSON.stringify(item),
            }
        );
        return stringResponse;
    } catch (error) {
        console.error(error);
        return false;
    }
};
// eslint-disable-next-line
export default { addItem };
