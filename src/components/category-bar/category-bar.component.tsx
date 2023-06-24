import "./category-bar.css";
import { CategoryBlock } from "../core";
import { CollectionNS } from '../../types';
import AddNewCategoryBlock from '../add-new-category-block/add-new-category-block.component';
import { Link } from 'react-router-dom';
interface IProps {
    disableAddBlock: boolean;
    selectedCategory: CollectionNS.ICollection | null;

    loading: boolean;
    categoryList: CollectionNS.ICollection[];
    handleSelectedCategory: (category: CollectionNS.ICollection | null) => void;

    // For add collection block
    handleInputValidation?: (value: string) => void;
    showAddForm?: boolean;
    setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>;
    newCategoryFields?: {
        emoji: string;
        name: string;
    };
    setNewCategoryFields?: React.Dispatch<React.SetStateAction<{
        emoji: string;
        name: string;
    }>>;
    handleSubmitNewCategory?: () => Promise<void>;
}
const CategoryBar = (props: IProps) => {

    return (
        <div className="categoryBarContainer">
            <div className="allBlock">
                <button
                    className={`${props.selectedCategory === null ? "focus" : "categoryBlockContainer"}`}
                    style={{ height: "100px", width: "100px" }}
                    name="add"
                    onClick={(e) => props.handleSelectedCategory(null)}
                >
                    <div className="iconWrapper">📋</div>
                    <div className="categoryText">All</div>
                </button>
            </div>
            <div className="categoryBar">
                {
                    props.loading
                        ? <span> Loading...</span>
                        : props.categoryList.map((category: CollectionNS.ICollection, index: number) => {
                            return (
                                <CategoryBlock
                                    selectedCategoryId=
                                    {
                                        props.selectedCategory !== null &&
                                            props.selectedCategory._id ?
                                            props.selectedCategory._id : null
                                    }
                                    category={category}
                                    key={category._id}
                                    OnClick={() => props.handleSelectedCategory(category)}
                                    index={index}
                                />
                            );
                        })
                }
            </div>
            <div className="addNewBlock">
                <button
                    className="categoryBlockContainer"
                    disabled={props.disableAddBlock}
                    style={{ height: "100px", width: "100px" }}
                    name="add"
                    onClick={() => props.setShowAddForm && props.setShowAddForm(true)}
                >
                    <div className="iconWrapper">➕</div>
                    <div className="categoryText">Add</div>
                </button>
                <div className="seeAllWrapper">
                    <Link to={'/viewCategories'}>See All</Link>
                </div>
            </div>
            <AddNewCategoryBlock
                handleSubmitNewCategory={props.handleSubmitNewCategory}
                newCategoryFields={props.newCategoryFields}
                showAddForm={props.showAddForm}
                handleInputValidation={props.handleInputValidation}
                setNewCategoryFields={props.setNewCategoryFields}
                setShowAddForm={props.setShowAddForm}
            />
        </div>
    );
};

export default CategoryBar;
