import './pos-view.css';
import '../../components/core/category-block/category-block.css'
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
            {/* <CategoryBar disableAddBlock={true}/> */}
        </div>
    );
};
export default PosView;