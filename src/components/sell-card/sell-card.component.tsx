import "./sell-card.css";

const SellCard = () => {
  return (
    <div className="cardContainer">
      <div className="cardWrapper">
        <div className="image"></div>
        <div className="rightSection">
            <span>Hot pizza :))</span>
            <div className="bottom">
            <div className="counter">
                <button>-</button>
                <span>1</span>
                <button>+</button>
            </div>
            <span>18.5</span>
            </div>
        </div>
      </div>
    </div>
  );
};


export default SellCard;