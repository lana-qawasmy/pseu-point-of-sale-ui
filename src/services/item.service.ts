import { ItemNS } from "../types";
const addItem = async (item: ItemNS.Item) => {
    try {
        const stringResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/item/addItem`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
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

export { addItem };
