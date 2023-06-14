import { CollectionNS } from "../types";
const addCollection = async (collection: CollectionNS.ICollection, token: string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/collection/addCollection`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(collection),
        }).then(async (res) => {
            if (res.status === 201) {
                return { state: true, value: await res.json() };
            }
            else {
                return { state: false, value: await res.json() }; 
            }
        }).catch((error) => {
            console.error(error);
            return { state: false, value: 'Something went wrong, try again' };
        });
    } catch (error) {
        console.error(error);
        return { state: false, value: 'Something went wrong, try again' };
    }
};

const getCollection = (userId: string, token: string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/collection/getCollections`, {
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

export default {
    addCollection: addCollection,
    getCollection: getCollection,
};
