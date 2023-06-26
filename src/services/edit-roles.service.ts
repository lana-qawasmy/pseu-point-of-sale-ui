const getUsers = (token: string) =>{
        try {
            return fetch(`${process.env.REACT_APP_SERVER_URL}/user/getUsers`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                }
            })
                .then(async (response) => {
                    return await response.json();
                }).catch((error) => {
                    console.error(error);
                    return undefined;
                });
        } catch (error) {
            console.error(error);
            return undefined;
        }
};

const rolesServices = {
    getUsers,
}
export default rolesServices;