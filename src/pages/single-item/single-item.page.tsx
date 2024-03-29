import "./single-item.css";
import { useSingleItem, formatPrice } from "../../hooks";
import { PriceHistory } from "../../components";
const SingleItem = () => {
    const { item } = useSingleItem();

    return (
        <>
            {item && (
                <div className="singleItemPage">
                    <div className="singleItemContainer">
                        <div
                            title={`${item.name} image`}
                            className="image"
                            style={{ backgroundImage: `url('${item.image}')` }}
                        ></div>
                        <div className="content">
                            <h2 title={item.name}>{item.name}</h2>
                            <span className="quantity" title={`${item.quantity} Piece(s) available`}>
                                <span className="number">{item.quantity}</span>Piece(s) available
                            </span>
                            <div className="price" title='Price'>
                                <span className="certainPrice">
                                    {formatPrice(item.priceHistory[0].price)} $
                                </span>
                            </div>
                            <span className="description" title='Description'>{item.description}</span>
                        </div>
                    </div>
                    <PriceHistory priceHistory={item.priceHistory as { date: Date; price: Number; }[]} />
                </div>
            )}
        </>
    );
};

export default SingleItem;
