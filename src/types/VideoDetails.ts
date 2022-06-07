export interface VideoDetails {
    _id: string;
    title: string;
    description: string;
    creator: string;
    img: {
        src: string;
        alt: string;
    };
    url: string;
}

export interface CategoryDetails {
    _id: string;
    categoryName: "string";
    creator: string;
    img: {
        src: string;
        alt: string;
    };
    description: string;
}
