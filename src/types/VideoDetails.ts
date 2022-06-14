interface comment {
    _id: string;
    body: string;
    author: string;
    createdAt: string;
}
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
    comments: comment[];
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
