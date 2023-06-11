import './view-existed-items.css';
import { Item } from '../../components';
import { useViewItems } from '../../hooks';

const ViewExistedItems = () => {
    const { itemsTable } = useViewItems();
    console.log(itemsTable);

    return (
        <div className='viewItemsPage'>
            <h2>Select Menu</h2>
            <div className='itemsContainer'>
                {
                    itemsTable.map((item) => {
                        return (
                            <Item key={item._id} item={item} />
                        );
                    })
                }
            </div>
        </div>
    );
};
export default ViewExistedItems;