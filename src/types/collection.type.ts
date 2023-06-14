namespace CollectionNS {

    export interface ICollection {
        _id?:   string
        name: string;
        icon: string;
        items?: [string];
        addedBy: string;
    }
}

export default CollectionNS;