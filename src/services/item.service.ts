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

const getItems = (token: string, searchTerms?: string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/item/getItems/${searchTerms && `?searchTerms=${searchTerms}`}`, {
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


const getItem = (token: string,id: string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/item/getItem/${id}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            }
        }).then(async (response) => {
            if(response.status ===200)return await response.json();
            else{
                const message = await response.json();
                return message.message;
            } 
        }).catch((error) => {
            console.error(error);
            return undefined;
        });
    } catch (error) {
        console.error(error);
        return undefined;
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


const updateItem = (newItem: ItemNS.Item, token: string) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/item/updateItem`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(newItem),
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
}
// eslint-disable-next-line
export default {
    addItem,
    getItems,
    deleteItem,
    updateItem,
    getItem
};
