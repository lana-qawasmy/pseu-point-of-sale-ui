
namespace ItemNS {
    export interface Item {
        _id?: string;
        name: string,
        image: string,
        barcode: string,
        quantity: number,
        description: string,
        addedBy: string,
        priceHistory: [{ date: Date, price: Number; }] | { date: Date, price: Number }[],
    };
}

export default ItemNS;