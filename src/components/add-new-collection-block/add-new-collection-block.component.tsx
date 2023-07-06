import React from 'react';
import './add-new-collection-block.css';
import { Button, Input, PopUp } from '../core';

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
            <PopUp>

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
                                    Label="Name"
                                    PlaceHolder="Electronics"
                                    Required
                                    Width={280}
                                    Radius={25}
                                    FontSize={14}
                                    Height={38}
                                    FontWeight={800}
                                    onChange={(e) => {
                                        props.setNewCollectionFields && props.setNewCollectionFields({
                                            name: e.target.value,
                                            emoji: (props.newCollectionFields && props.newCollectionFields.emoji) || '',
                                        });
                                    }}
                                />
                                <Input
                                    Height={38}
                                    Label="emoji"
                                    PlaceHolder="🔥"
                                    Required
                                    Width={280}
                                    Radius={25}
                                    FontSize={14}
                                    FontWeight={800}
                                    onChange={(e) => {
                                        props.handleInputValidation && props.handleInputValidation(e.target.value);
                                    }}
                                    value={props.newCollectionFields && props.newCollectionFields.emoji}
                                    id="emojiInput"
                                />
                            </div>
                            <div className="lowerBody">
                                <Button
                                    HtmlType="button"
                                    Ratio='19/5'
                                    Type="Danger"
                                    FontSize="16"
                                    Width="140"
                                    Radius="30"
                                    onClick={() => {
                                        props.setShowAddForm && props.setShowAddForm(false);
                                        props.setNewCollectionFields && props.setNewCollectionFields({ name: '', emoji: '' });
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    HtmlType="button"
                                    Type="Primary"
                                    FontSize="16"
                                    Width="140"
                                    Radius="30"
                                    Ratio='19/5'
                                    onClick={props.handleSubmitNewCollection}
                                >
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PopUp>
        )
        : (<></>);

};

export default AddNewCollectionBlock;