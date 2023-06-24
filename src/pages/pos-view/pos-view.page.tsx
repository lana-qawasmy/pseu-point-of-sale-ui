import "./pos-view.css";
import "../../components/core/category-block/category-block.css";
import { CategoryBar, ItemInPOS, SellBar } from "../../components";
import { usePOSView } from "../../hooks";
import { SearchBar } from "../../components/core";

const PosView = () => {
    

    const {
    selectedCategory,
    categoriesList,
    categoriesLoading,
    itemsTable,
    itemsLoading,
    useParams,
    navigate,
    handleSearch,
    handleSelectedCategory,
    handleSelectedItems,
  } = usePOSView();
  return (
    <div className="posPage">
      <div className="posViewContainer">
        <div className="categoryWrapper">
          <CategoryBar
            disableAddBlock={true}
            categoryList={categoriesList}
            handleSelectedCategory={handleSelectedCategory}
            loading={categoriesLoading}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="searchBarWrapper">
          <SearchBar
            Placeholder="Search"
            Name="Search"
            Id="search"
            OnChange={handleSearch}
            Value={useParams.params.get("searchTerms") || ""}
            Radius={5}
            Height={35}
            Width={280}
            FontSize={16}
            FontColor="#023e8a"
            Padding={10}
          />
        </div>
        <div className="itemsContainer">
          {itemsLoading ? (
            <span>Loading...</span>
          ) : (
            itemsTable.map((item,index) => {
              return (
                item.priceHistory[0] && (
                  <ItemInPOS
                    navigate={navigate}
                    key={item._id as string}
                    selectedCategory={selectedCategory || null}
                    item={item}
                    OnSelect={() => handleSelectedItems(item)}
                  />
                )
              );
            })
          )}
        </div>
      </div>
      <SellBar />
    </div>
  );
};
export default PosView;
