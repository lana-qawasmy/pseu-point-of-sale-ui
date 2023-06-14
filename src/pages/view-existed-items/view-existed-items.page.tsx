import './view-existed-items.css';
import { Item } from '../../components';
import { useViewItems } from '../../hooks';
import {CategoryBar} from '../../components';

const ViewExistedItems = () => {
    const { itemsTable, select, handleChangeSelect, handleDelete } = useViewItems();

    return (
        <div className='viewItemsPage'>
            <CategoryBar disableAddBlock={false}/>
            <h2>Menu</h2>
            <div className='itemsContainer'>
                {
                    itemsTable.map((item, index) => {
                        return (
                            <Item
                                key={item._id}
                                Selected={select[index]}
                                item={item}
                                DeletedPrice={12}
                                OnDelete={handleDelete}
                                OnEdit={() => console.log(1)}
                                OnSelect={() => handleChangeSelect(index)}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};
export default ViewExistedItems;