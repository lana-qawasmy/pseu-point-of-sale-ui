import "./view-existed-items.css";
import { Item } from "../../components";
import { CollectionBar } from "../../components";
import { useViewItems } from "../../hooks";
import { SearchBar, Spinner } from "../../components/core";

const ViewExistedItems = () => {
    const {
        itemsTable,
        useParams,
        selectedCollection,

        collectionList,
        showAddForm,
        newCollectionFields,
        itemsLoading,
        collectionsLoading,

        setShowAddForm,
        setNewCollectionFields,
        handleInputValidation,
        handleSubmitNewCollection,

        handleChangeSelectItem,
        handleDelete,
        handleSearch,
        handleSelectedCollection,
        handleDeleteCollection,
    } = useViewItems();


    return (
        <div className="viewItemsPage">
            <CollectionBar
                collectionList={collectionList}
                disableAddBlock={false}
                loading={collectionsLoading}
                selectedCollection={selectedCollection}
                newCollectionFields={newCollectionFields}
                setNewCollectionFields={setNewCollectionFields}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
                handleInputValidation={handleInputValidation}
                handleSubmitNewCollection={handleSubmitNewCollection}
                handleSelectedCollection={handleSelectedCollection}
                handleDeleteCollection={handleDeleteCollection}
            />
            <div className="searchBarWrapper">
                <SearchBar
                    Placeholder='Search'
                    Name="Search"
                    Id="search"
                    OnChange={handleSearch}
                    Value={useParams.params.get("searchTerms") || ""}
                    Radius={5}
                    Height={35}
                    Width={280}
                    FontSize={16}
                    FontColor='#023e8a'
                    Padding={10}
                />
            </div>
            <div className={`itemsContainer ${itemsLoading ? 'loading' : ''}`}>
                {
                    itemsLoading
                        ? <span className='loading'><Spinner /></span>
                        :
                        itemsTable && itemsTable?.map((item) => {
                            return (
                                <Item
                                    selectedCollection={selectedCollection}
                                    key={item.item._id}
                                    item={item.item}
                                    Selected={item.selected}
                                    OnDelete={handleDelete}
                                    Editable={true}
                                    OnSelect={() => handleChangeSelectItem(item.item._id, selectedCollection?._id as string)}
                                />
                            );
                        })}
            </div>
        </div>
    );
};
export default ViewExistedItems;
