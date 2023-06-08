import { ItemNS } from "../types";
const addItem = async (item: ItemNS.Item) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/item/addItem`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then(async (res) => {
            if (res.status === 201) {
                return { state: true, value: await res.json() };
            }
            else {
                return { state: false, value: await res.json() };
            }
        }).catch((error) => {
            console.error(error);
            return false;
        });
    } catch (error) {
        console.error(error);
        return false;
    }
};

// eslint-disable-next-line
export default {
    addItem
};
