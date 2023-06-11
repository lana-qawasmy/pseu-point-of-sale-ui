import './pos-view.css';
import { Link } from 'react-router-dom';

const PosView = () => {
    return (
        <div className='posViewContainer'>
            <div className="posTitlewrapper">
                <div className="posViewTitle">
                    Category
                </div>
                <div className="seeAllWrapper">
                    <Link to={'/viewCategories'}>See All</Link>
                </div>
            </div>
            <div className="categoryBarContainer">
                <div className="allBlock"></div>
                <div className="categoryBar"></div>
                <div className="addNewBlock"></div>
            </div>
        </div>
    );
};
export default PosView;