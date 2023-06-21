import React from 'react';
import './add-new-category-block.css';
import { Button, Input } from '../core';

interface IProps {
    showAddForm?: boolean;
    setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputValidation?: (value: string) => void;
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

const AddNewCategoryBlock = (props: IProps) => {
    return props.showAddForm
        ? (
            <div
                className="addFormContainer"
                onClick={() => props.setShowAddForm && props.setShowAddForm(false)}
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
                                    props.handleInputValidation && props.handleInputValidation(e.target.value);
                                }}
                                value={props.newCategoryFields && props.newCategoryFields.emoji}
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
                                    props.setNewCategoryFields && props.setNewCategoryFields({
                                        name: e.target.value,
                                        emoji: (props.newCategoryFields && props.newCategoryFields.emoji) || '',
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
                                    props.setShowAddForm && props.setShowAddForm(false);
                                    props.setNewCategoryFields && props.setNewCategoryFields({ name: '', emoji: '' });
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
        : (<></>);

};

export default AddNewCategoryBlock;