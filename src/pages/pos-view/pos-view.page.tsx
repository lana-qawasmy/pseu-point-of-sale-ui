import './pos-view.css';
import '../../components/core/collection-block/collection-block.css';
import { CollectionBar, ItemInPOS } from '../../components';
import { usePOSView } from '../../hooks';
import { SearchBar } from '../../components/core';

const PosView = () => {
    const {
        selectedCollection,
        categoriesList,
        categoriesLoading,
        itemsTable,
        itemsLoading,
        useParams,
        navigate,
        handleSearch,
        handleSelectedCollection,
    } = usePOSView();
    return (
        <div className='posViewContainer'>
            <div className='collectionWrapper'>
                <CollectionBar
                    disableAddBlock={true}
                    collectionList={categoriesList}
                    handleSelectedCollection={handleSelectedCollection}
                    loading={categoriesLoading}
                    selectedCollection={selectedCollection}
                />
            </div>
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
                            return item.priceHistory[0] && (
                                <ItemInPOS
                                    navigate={navigate}
                                    key={item._id as string}
                                    selectedCollection={selectedCollection || null}
                                    item={item}
                                    OnSelect={() => console.log(1)}
                                />
                            );
                        })}
            </div>
        </div>
    );
};
export default PosView;