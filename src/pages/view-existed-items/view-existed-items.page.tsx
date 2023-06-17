import './view-existed-items.css';
import { Item } from '../../components';
import { CategoryBar } from '../../components';
import { useEffect, useState } from 'react';
import { useParam, useViewItems } from '../../hooks';
import React from 'react';
import { SearchBar } from '../../components/core';

const ViewExistedItems = () => {
    const { itemsTable, select, handleChangeSelect, handleDelete, handleChangeCategory } = useViewItems();
    const [categoryId, setCategoryId] = useState<string>('');
    const [selectedCategoryItems, setSelectedCategoryItems] = useState<[string]>(['']);
    useEffect(() => {
        handleChangeCategory(selectedCategoryItems);
        // eslint-disable-next-line
    }, [selectedCategoryItems, categoryId]);


    const useParams = useParam();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        useParams.setParams('searchTerms', e.target.value);
    };
    
    return (
        <div className='viewItemsPage'>
            <CategoryBar
                disableAddBlock={false}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                selectedCategoryItems={selectedCategoryItems}
                setSelectedCategoryItems={setSelectedCategoryItems} 
                />
            <h2>Menu</h2>
            <SearchBar
                Name='search'
                Id='search'
                OnChange={handleSearch}
                Value={useParams.params.get('searchTerms') || ''}
                Padding={12}
                Raduis={5}
            />
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