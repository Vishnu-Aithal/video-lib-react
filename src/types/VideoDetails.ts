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
