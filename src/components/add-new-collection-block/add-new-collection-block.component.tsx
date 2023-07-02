import React from 'react';
import './add-new-collection-block.css';
import { Button, Input } from '../core';

interface IProps {
    showAddForm?: boolean;
    setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputValidation?: (value: string) => void;
    newCollectionFields?: {
        emoji: string;
        name: string;
    };
    setNewCollectionFields?: React.Dispatch<React.SetStateAction<{
        emoji: string;
        name: string;
    }>>;
    handleSubmitNewCollection?: () => Promise<void>;
}

const AddNewCollectionBlock = (props: IProps) => {
    return props.showAddForm
        ? (
            <div
                className="addFormContainer"
                onClick={() => props.setShowAddForm && props.setShowAddForm(false)}
            >
                <div className="addFormWrapper" onClick={(e) => e.stopPropagation()}>
                    <h2>Add a new collection</h2>
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
                                value={props.newCollectionFields && props.newCollectionFields.emoji}
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
                                    props.setNewCollectionFields && props.setNewCollectionFields({
                                        name: e.target.value,
                                        emoji: (props.newCollectionFields && props.newCollectionFields.emoji) || '',
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
                                onClick={props.handleSubmitNewCollection}
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
                                    props.setNewCollectionFields && props.setNewCollectionFields({ name: '', emoji: '' });
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

export default AddNewCollectionBlock;