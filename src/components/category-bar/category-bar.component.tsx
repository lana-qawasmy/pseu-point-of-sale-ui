import './category-bar.css';
import { CategoryBlock } from '../core';

const CategoryBar = () =>{

    return(
        <div className="categoryBarContainer">
        <div className="allBlock">
            <button className="categoryBlockContainer" style={{height: '100px', width: '100px'}} name='add' onClick={e => {}}>
                <div className="iconWrapper">📋</div>
                <div className="categoryText">All</div>
            </button>
        </div>
        <div className="categoryBar">
            <CategoryBlock Icon={'🔌'} Name='Elechtroincssssssssssss' />
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
    );
};

export default CategoryBar;