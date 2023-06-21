import './pos-view.css';
import '../../components/core/category-block/category-block.css';
import { CategoryBar } from '../../components';

const PosView = () => {
    const ha = () => {
        console.log(1);

    };
    return (
        <div className='posViewContainer'>
            <div className='categoryWrapper'>
                <CategoryBar
                    disableAddBlock={true}
                    categoryList={[]}
                    handleSelectedCategory={ha}
                    loading={false}
                    selectedCategory={null}
                />
            </div>
        </div>
    );
};
export default PosView;