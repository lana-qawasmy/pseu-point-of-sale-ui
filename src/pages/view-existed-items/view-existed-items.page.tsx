import './view-existed-items.css';
import { Item } from '../../components';
import { useViewItems } from '../../hooks';

const ViewExistedItems = () => {
    const { itemsTable } = useViewItems();
    console.log(itemsTable);
    const handleDelete = (userId: string, itemId: string) => {
        console.log({ userId });
        console.log({ itemId });
    };
    return (
        <div className='viewItemsPage'>
            <h2>Menu</h2>
            <div className='itemsContainer'>
                {
                    itemsTable.map((item) => {
                        return (
                            <Item
                                // selected
                                key={item._id}
                                item={item}
                                DeletedPrice={12}
                                OnDelete={handleDelete}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};
export default ViewExistedItems;