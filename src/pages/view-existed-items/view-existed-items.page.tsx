import "./view-existed-items.css";
import { Item } from "../../components";
import { CategoryBar } from "../../components";
import { useViewItems } from "../../hooks";
import { SearchBar } from "../../components/core";

const ViewExistedItems = () => {
    const {
        itemsTable,
        useParams,
        selectedCategory,

        categoryList,
        showAddForm,
        newCategoryFields,
        itemsLoading,
        categoriesLoading,

        setShowAddForm,
        setNewCategoryFields,
        handleInputValidation,
        handleSubmitNewCategory,

        handleChangeSelectItem,
        handleDelete,
        handleSearch,
        handleSelectedCategory,
    } = useViewItems();


    return (
        <div className="viewItemsPage">
            <CategoryBar
                categoryList={categoryList}
                disableAddBlock={false}
                loading={categoriesLoading}
                selectedCategory={selectedCategory}
                newCategoryFields={newCategoryFields}
                setNewCategoryFields={setNewCategoryFields}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
                handleInputValidation={handleInputValidation}
                handleSubmitNewCategory={handleSubmitNewCategory}
                handleSelectedCategory={handleSelectedCategory}
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
                                    selectedCategory={selectedCategory}
                                    key={item.item._id}
                                    item={item.item}
                                    DeletedPrice={12}
                                    Selected={item.selected}
                                    OnDelete={handleDelete}
                                    OnEdit={() => console.log(1)}
                                    OnSelect={() => handleChangeSelectItem(item.item._id, selectedCategory?._id as string)}
                                />
                            );
                        })}
            </div>
        </div>
    );
};
export default ViewExistedItems;
