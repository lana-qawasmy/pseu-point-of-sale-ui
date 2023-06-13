import './pos-view.css';
import '../../components/core/category-block/category-block.css'
import { Link } from 'react-router-dom';
import { CategoryBlock } from '../../components/core';

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
                <div className="allBlock">
                    <button className="categoryBlockContainer" style={{height: '100px', width: '100px'}} name='add' onClick={e => {}}>
                        <div className="iconWrapper">📋</div>
                        <div className="categoryText">All</div>
                    </button>
                </div>
                <div className="categoryBar">
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                    <CategoryBlock Icon={'🆗'} Name='New' />
                </div>
                <div className="addNewBlock">
                    <button className="categoryBlockContainer" style={{height: '100px', width: '100px'}} name='add' onClick={e => {}}>
                        <div className="iconWrapper">➕</div>
                        <div className="categoryText">Add</div>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default PosView;