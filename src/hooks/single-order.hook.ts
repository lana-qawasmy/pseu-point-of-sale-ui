import React from "react";
import { useParams } from "react-router-dom";
import { itemService, orderService } from "../services";
import { UserContext } from "../components/providers/user.provider";
import { useNotification } from "../hooks";
import { ItemNS } from "../types";

interface IOrderItem {
    item: string,
    quantity: number
}

interface IOrder {
    _id?: string;
    orderNumber?: number;
    cashierName: String;
    total: Number;
    time?: string;
    date?: Date;
    items?: {
        item: ItemNS.Item;
        quantity: number;
    }[];
    discountCode?: String;
    tax?: Number;
}

const useSingleOrder = () => {
    const params = useParams();
    const orderId = params.id;
    const userContext = React.useContext(UserContext)
    const [order, setOrder] = React.useState<IOrder>();
    const notification = useNotification()

    const fetchOrderDetails = async () => {
        try {
            const order = await orderService.getOrder(orderId || '', userContext.user?.token || '')
            const items = await fetchItems()
            if (order) {
                const orderItems = items?.filter((item: ItemNS.Item) => {
                    return order.items.find((orderItem: IOrderItem) => item._id === orderItem.item)
                });
                order.items.sort((a: IOrderItem, b: IOrderItem) => {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                });
                orderItems.sort((a: ItemNS.Item, b: ItemNS.Item) => {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                });
                return ({
                    ...order, items: orderItems.map((item: ItemNS.Item, index: number) => {
                        return { ...item, quantity: order.items[index].quantity }
                    })
                })
            } else {
                notification.setNotification({ message: 'Fetching order\'s details has falid!', status: "error" })
            }
        } catch (error) {
            console.error(error)
            notification.setNotification({ message: 'Fetching order\'s details has falid!', status: "error" })
        }
    }

    const fetchItems = async () => {
        try {
            const newItems = await itemService.getItems(userContext.user?.token || '', '')
            if (newItems)
                return newItems
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        fetchOrderDetails()
            .then(newOrder => {
                setOrder(newOrder)
            }).catch(error => {
                console.error(error)
            })
        // eslind-disable-next-line
    }, [])
    
    return {order}
}

export default useSingleOrder;