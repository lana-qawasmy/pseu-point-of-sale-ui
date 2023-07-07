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
    date?: string;
    items?: {
        item: ItemNS.Item;
        quantity?: number;
    }[] | ItemNS.Item[];
    discountCode?: String;
    tax?: Number;
}

const useSingleOrder = () => {
    const params = useParams();
    const orderId = params.id;
    const userContext = React.useContext(UserContext)
    const [order, setOrder] = React.useState<IOrder>();
    const notification = useNotification()
    const orderItems: ItemNS.Item[] = order?.items as ItemNS.Item[];
    const [subtotal, setSubtotal] = React.useState(0)
    const date = order?.date as string;
    const time = order?.time as String;
    const [splitDate, setSplitDate] = React.useState('');
    const [splitTime, setSplitTime] = React.useState('');
    React.useEffect(() => {
        let tempSubtotal = 0;
        if (order) {
            const tempDate = date.split('T')[0].split('-').reverse().map((dateComponent) => (dateComponent[0] === '0') ? dateComponent[1] : dateComponent).join('/');
            const timeArray = time.split(':');
            const tempTime = timeArray[0] + ':' + timeArray[1] + ' ' + timeArray[2][3] + timeArray[2][4]
            setSplitDate(tempDate)
            setSplitTime(tempTime)
            orderItems.forEach(item => {
                const price = item.priceHistory[0].price
                tempSubtotal += (item.quantity * (price as number))
            })
            setSubtotal(tempSubtotal)
        }
        // eslint-disable-next-line
    }, [order])

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
        // eslint-disable-next-line
    }, [])
    
    return {order , orderItems , subtotal , splitDate , splitTime}
}

export default useSingleOrder;