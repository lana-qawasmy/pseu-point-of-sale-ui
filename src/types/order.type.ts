import ItemNS from './item.type';

export namespace OrderNS {
    export interface IOrder {
        _id?: string;
        orderNumber?: number;
        casherName: string;
        total: number;
        time?: string;
        date?: string;
        items?: {
            item: string,
            quantity: number;
        }[];
        discountCode?: string;
        tax?: number;
    }
}