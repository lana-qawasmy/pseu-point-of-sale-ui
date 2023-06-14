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

const getCollections = (token: string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/collection/getCollections`, {
            method: 'GET',
            headers: {
                'authorization': token,
            }
        }).then(async (response) => {
            return await response.json();;
        }).catch((error) => {
            console.error(error);
            return false;
        });
    } catch (error) {
        console.error(error);
        return false;
    }
};

const updateCollection = (token: string, id: string, itemsIds: any) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/collection/updateCollection`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ itemsIds, id }), 
        }).then(async (response) => {
                if (response.status === 200) {
                    return await response.json();
                } else {
                    return ('Update failed');
                }
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    } catch (error) {

    }
}

const collectionServices = {
    addCollection: addCollection,
    getCollections: getCollections,
    updateCollection: updateCollection
  };
  
  export default collectionServices;
