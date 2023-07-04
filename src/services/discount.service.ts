const getDiscount = (code: string, token: string) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/discount/getDiscount?discountCode=${code}`, {
        method: 'GET',
        headers: {
            'authorization': token
        }
    })
        .then(async (response) => {
            return await response.json();
        }).catch((error) => {
            console.error(error);
            return false;
        });
}

//eslint-disable-next-line
export default { getDiscount };