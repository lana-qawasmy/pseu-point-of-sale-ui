import './view-existed-items.css';
import { Item } from '../../components';
import { useViewItems } from '../../hooks';
import {CategoryBar} from '../../components';
import { useEffect, useState } from 'react';

const ViewExistedItems = () => {
    const { itemsTable, select, handleChangeSelect, handleDelete,handleChangeCategory } = useViewItems();
    const [categoryId,setCategoryId] = useState<string>('');
    const [selectedCategoryItems, setSelectedCategoryItems] = useState<[string]>(['']);
    useEffect(()=>{
        handleChangeCategory(selectedCategoryItems);
    },[selectedCategoryItems,categoryId])
    return (
        <div className='viewItemsPage'>
            <CategoryBar disableAddBlock={false} 
            categoryId={categoryId} 
            setCategoryId={setCategoryId} 
            selectedCategoryItems={selectedCategoryItems} 
            setSelectedCategoryItems={setSelectedCategoryItems}/>
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
                                OnSelect={() => handleChangeSelect(index, categoryId)}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};
export default ViewExistedItems;