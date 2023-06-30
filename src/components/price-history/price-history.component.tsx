import React from 'react';
import './price-history.css';
import { IoIosArrowDropdown } from 'react-icons/io';
interface Iprops{
    priceHistory: {price: Number, date: Date}[]
}
const PriceHistory = (props: Iprops) =>{
    const  formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        return formattedDate;
      }
    const [showPriceHistoryList,setShowPriceHistoryList] = React.useState<boolean>(false)
    const {priceHistory} = props;
    const[sortedList, setSortedList] = React.useState([...priceHistory]);
    React.useMemo(()=>{
        if (priceHistory.length > 1){
           if(new Date(priceHistory[1].date).getTime() > new Date(priceHistory[0].date).getTime()){
               setSortedList([...priceHistory.reverse()]);
            }else{
                setSortedList([...priceHistory]);
            }
        }else{
            setSortedList([...priceHistory]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <div className="priceHistoryContainer">
            <div className="priceHistoryAnchor"
            onClick={()=>{showPriceHistoryList? setShowPriceHistoryList(false): setShowPriceHistoryList(true)}}
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
                {showPriceHistoryList&&
                    sortedList.map((item,index)=>{
                        return(
                            <div className="priceElement" key={Math.random()}>
                                <div className="priceLeftSection" key={ Math.random()}>
                                {item.price.toFixed(2)}$
                                </div>
                                <div className="priceRightSection" key={ Math.random()}>
                                {formatDate(item.date)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );

};

export default PriceHistory;