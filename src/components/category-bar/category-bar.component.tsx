import "./category-bar.css";
import { CategoryBlock, Input, Button } from "../core";
import { CollectionNS } from '../../types';
interface IProps {
    disableAddBlock: boolean;
    selectedCategory: CollectionNS.ICollection | null;

    loading: boolean;

    handleInputValidation: (value: string) => void;
    categoryList: CollectionNS.ICollection[];
    showAddForm: boolean;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
    newCategoryFields: {
        emoji: string;
        name: string;
    };
    setNewCategoryFields: React.Dispatch<React.SetStateAction<{
        emoji: string;
        name: string;
    }>>;
    handleSubmitNewCategory: () => Promise<void>;

    handleSelectedCategory: (category: CollectionNS.ICollection | null) => void;
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
                    onClick={() => props.setShowAddForm(true)}
                >
                    <div className="iconWrapper">➕</div>
                    <div className="categoryText">Add</div>
                </button>
            </div>
            {props.showAddForm && (
                <div
                    className="addFormContainer"
                    onClick={() => props.setShowAddForm(false)}
                >
                    <div className="addFormWrapper" onClick={(e) => e.stopPropagation()}>
                        <h2>Add a new category</h2>
                        <div className="addFormBody">
                            .
                            <div className="upperBody">
                                <Input
                                    Label="emoji"
                                    PlaceHolder="🔥"
                                    Required
                                    Width={280}
                                    Radius={25}
                                    FontSize={20}
                                    FontWeight={800}
                                    onChange={(e) => {
                                        props.handleInputValidation(e.target.value);
                                    }}
                                    value={props.newCategoryFields.emoji}
                                    id="emojiInput"
                                />
                                <Input
                                    Label="Name"
                                    PlaceHolder="Electronics"
                                    Required
                                    Width={280}
                                    Radius={25}
                                    FontSize={20}
                                    FontWeight={800}
                                    onChange={(e) => {
                                        props.setNewCategoryFields({
                                            name: e.target.value,
                                            emoji: props.newCategoryFields.emoji,
                                        });
                                    }}
                                />
                            </div>
                            <div className="lowerBody">
                                <Button
                                    HtmlType="button"
                                    Type="Primary"
                                    FontSize="16"
                                    Width="150"
                                    Radius="30"
                                    onClick={props.handleSubmitNewCategory}
                                >
                                    Create
                                </Button>
                                <Button
                                    HtmlType="button"
                                    Type="Danger"
                                    FontSize="16"
                                    Width="150"
                                    Radius="30"
                                    onClick={() => {
                                        props.setShowAddForm(false);
                                        props.setNewCategoryFields({ name: '', emoji: '' });
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryBar;
