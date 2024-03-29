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
            const x = await res.json();
            if (res.status === 201) {
                return { state: true, value: x.message };
            }
            else {
                return { state: false, value: x.message };
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
        })
            .then(async (response) => {
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

const updateCollection = (token: string, collectionId: string, itemId: any) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/collection/updateCollection`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ collectionId, itemId }),
        })
            .then(async (response) => {
                if (response.status === 200) {
                    return await response.json();
                } else {
                    return false;
                }
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

const getCollection = (token: string, collectionId: string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/collection/getCollection/${collectionId}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            }
        })
            .then(async (response) => {
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

const getCollectionItems = (token: string, collectionId: string, searchTerms?: string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/collection/getCollectionItems/${collectionId}${searchTerms ? `?searchTerms=${searchTerms}` : ''}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            }
        })
            .then(async (response) => {
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

const deleteCollection = (token: string, collection: CollectionNS.ICollection) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/collection/deleteCollection?userId=${collection.addedBy}&collectionId=${collection._id}`, {
            method: 'DELETE',
            headers: {
                'authorization': token,
            },
        })
            .then(async (response) => {
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

const collectionServices = {
    addCollection,
    getCollections,
    getCollection,
    updateCollection,
    getCollectionItems,
    deleteCollection,
};

export default collectionServices;
