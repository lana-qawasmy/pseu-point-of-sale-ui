
namespace ItemNS {
    export interface Item {
        _id?: string;
        name: string,
        image: string,
        barcode: string,
        description: string,
        addedBy: string,
        priceHistory: [{ date: Date, price: Number; }],
    };
}

export default ItemNS;