import './view-existed-items.css';
import { Item } from '../../components';
import { useParam, useViewItems } from '../../hooks';
import React from 'react';
import { SearchBar } from '../../components/core';

const ViewExistedItems = () => {
    const { itemsTable, select, handleChangeSelect, handleDelete } = useViewItems();
    const useParams = useParam();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        useParams.setParams('searchTerms', e.target.value)
    }
    return (
        <div className='viewItemsPage'>
            <h2>Menu</h2>
            <SearchBar Name='search' Id='search' OnChange={handleSearch} Value={useParams.params.get('searchTerms') || ''} />
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