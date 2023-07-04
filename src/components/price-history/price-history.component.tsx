import React from 'react';
import './price-history.css';
import { IoIosArrowDropdown } from 'react-icons/io';
interface IProps {
    priceHistory: { price: Number, date: Date; }[];
}
const PriceHistory = (props: IProps) => {
    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        return formattedDate;
    };
    const [showPriceHistoryList, setShowPriceHistoryList] = React.useState<boolean>(false);
    const { priceHistory } = props;

    return (
        <div className="priceHistoryContainer">
            <div className="priceHistoryAnchor"
                onClick={() => { showPriceHistoryList ? setShowPriceHistoryList(false) : setShowPriceHistoryList(true); }}
            >
                <div className="leftSection"><h2>Price history</h2></div>
                <div className="rightSection"><IoIosArrowDropdown
                    size={'30px'}
                    color='#2c64c6'
                    className={`arrowIcon ${showPriceHistoryList ? "flipUp" : ""}`}
                /></div>
            </div>
            <hr />
            <div className={`listContainer ${showPriceHistoryList ? "slideIn" : "slideOut"}`}>
                {showPriceHistoryList &&
                    priceHistory.map((item, index) => {
                        return (
                            <div className="priceElement" key={Math.random()}>
                                <div className="priceLeftSection" key={Math.random()}>
                                    {item.price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}$
                                </div>
                                <div className="priceRightSection" key={Math.random()}>
                                    {formatDate(item.date)}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );

};

export default PriceHistory;