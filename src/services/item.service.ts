import { ItemNS } from "../types";
const addItem = async (item: ItemNS.Item, token: string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/item/addItem`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
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

const getItems = (userId: string, token: string, searchTerms?:string) => {
    try {
        // return fetch(`${process.env.REACT_APP_SERVER_URL}/item/getItems/${userId}?searchTerms=${searchTerms}`, {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/item/getItems/${userId}/${searchTerms && `?searchTerms=${searchTerms}`}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            }
        }).then(async (response) => {
            return await response.json();
        }).catch((error) => {
            console.error(error);
            return false;
        });
    } catch (error) {
        console.error(error);
        return false;
    }
};

const deleteItem = (userId: string, itemId: string, token: string) => {
    try {

        return fetch(`${process.env.REACT_APP_SERVER_URL}/item/deleteItem?userId=${userId}&itemId=${itemId}`, {
            method: 'DELETE',
            headers: {
                'authorization': token,
            }
        })
            .then((response) => {
                return (response.status === 200);
            })
            .catch((error) => {
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
    addItem,
    getItems,
    deleteItem,
};
