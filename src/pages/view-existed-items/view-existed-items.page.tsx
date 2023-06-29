import "./view-existed-items.css";
import { Item } from "../../components";
import { CollectionBar } from "../../components";
import { useViewItems } from "../../hooks";
import { SearchBar } from "../../components/core";

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
            <div className="itemsContainer">

                {
                    itemsLoading
                        ? <span>Loading...</span>
                        :
                        itemsTable.map((item) => {
                            return item.item.priceHistory[0] && (
                                <Item
                                    selectedCollection={selectedCollection}
                                    key={item.item._id}
                                    item={item.item}
                                    DeletedPrice={12}
                                    Selected={item.selected}
                                    OnDelete={handleDelete}
                                    OnEdit={() => console.log(1)}
                                    OnSelect={() => handleChangeSelectItem(item.item._id, selectedCollection?._id as string)}
                                />
                            );
                        })}
            </div>
        </div>
    );
};
export default ViewExistedItems;
