import { DiscountNS } from "../types";
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
const addDiscount = (discount: DiscountNS.Discount, token: string) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/discount/addDiscount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(discount)
    })
        .then(async (response) => {
            switch (response.status){
                case 201:
                    return {success: true, message: 'discount added successfully'};
                case 400: 
                    return{success: false, message: 'discount code and value are both required!'};
                case 500:
                    return {success: false, message: 'something went wrong, please try again!'};
                default:
                    return {success: false, message: 'something went wrong, please try again!'};
            }
        }).catch((error) => {
            console.error(error);
            return {success: false, message: 'something went wrong, please try again!'}; 
        });
}

//eslint-disable-next-line
export default { getDiscount,addDiscount };