import "./category-bar.css";
import { CategoryBlock, Input, Button } from "../core";
import { useCategoryBar } from "../../hooks";
interface IProps {
  disableAddBlock: boolean;
  categoryId?: string;
  setCategoryId?: React.Dispatch<React.SetStateAction<string>>;
  selectedCategoryItems?: [string];
  setSelectedCategoryItems?: React.Dispatch<React.SetStateAction<[string]>>;
}
const CategoryBar = (props: IProps) => {
  const categoryBar = useCategoryBar();
  const handlSelectedCategory = (
    index: number,
    id: string,
    items: [string]
  ) => {
    props.setCategoryId && props.setCategoryId(id);
    props.setSelectedCategoryItems && props.setSelectedCategoryItems(items);

    categoryBar.handlSelectedCategory(index, id as string);
  };
  return (
    <div className="categoryBarContainer">
      <div className="allBlock">
        <button
          className={`${
            categoryBar.selectedCategory.length === 0
              ? "focus"
              : "categoryBlockContainer"
          }`}
          style={{ height: "100px", width: "100px" }}
          name="add"
          onClick={(e) => {
            categoryBar.setSelectedCategory([]);
          }}
        >
          <div className="iconWrapper">📋</div>
          <div className="categoryText">All</div>
        </button>
      </div>
      <div className="categoryBar">
        {categoryBar.categoryList.map((item, index) => {
          return (
            <CategoryBlock
              key={item._id}
              Icon={item.icon}
              Name={item.name}
              OnClick={() =>
                handlSelectedCategory(
                  index,
                  item._id as string,
                  item.items || [""]
                )
              }
              selected={categoryBar.selectedCategory}
              index={index}
            />
          );
        })}
      </div>
      <div className="addNewBlock">
        <button
          className="categoryBlockContainer"
          disabled={props.disableAddBlock}
          style={{ height: "100px", width: "100px" }}
          name="add"
          onClick={() => categoryBar.setShowAddForm(true)}
        >
          <div className="iconWrapper">➕</div>
          <div className="categoryText">Add</div>
        </button>
      </div>
      {categoryBar.showAddForm && (
        <div
          className="addFormContainer"
          onClick={() => categoryBar.setShowAddForm(false)}
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
                    categoryBar.handleInputValidation(e.target.value);
                  }}
                  value={categoryBar.newCategoryFields.emoji}
                  id="emojiInput"
                />
                <Input
                  Label="Name"
                  PlaceHolder="Elechtronics"
                  Required
                  Width={280}
                  Radius={25}
                  FontSize={20}
                  FontWeight={800}
                  onChange={(e) => {
                    categoryBar.setNewCategoryFields({
                      name: e.target.value,
                      emoji: categoryBar.newCategoryFields.emoji,
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
                  onClick={categoryBar.handleSubmitNewCategory}
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
                    categoryBar.setShowAddForm(false);
                    categoryBar.setNewCategoryFields({name: '', emoji: ''})
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
