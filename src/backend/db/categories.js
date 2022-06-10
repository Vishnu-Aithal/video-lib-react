import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
    {
        _id: uuid(),
        categoryName: "Veritasium",
        img: {
            src: "https://yt3.ggpht.com/ytc/AKedOLQYcLqrGZC1RZL4e1AFz5-ImMQmmgObvzWBCL7-mA=s176-c-k-c0x00ffffff-no-rj",
            alt: "Veritasium",
        },
        description:
            "Veritasium focuses on addressing counter-intuitive concepts in science. The videos range in style from interviews with experts, such as 2011 Physics Nobel Laureate Brian Schmidt, to science experiments, dramatisations, songs, and interviews with the public to uncover misconceptions about science. ",
    },
    {
        _id: uuid(),
        categoryName: "Kurzgesagt",
        img: {
            src: "https://yt3.ggpht.com/ytc/AKedOLRVT94BfVl1Xw1UCqakso5v7sSWB0QQvLd3fAAKTw=s176-c-k-c0x00ffffff-no-rj",
            alt: "Kurzgesagt",
        },
        description:
            "Kurzgesagt is a German animation and design studio founded by Philipp Dettmer. The studio's YouTube channel focuses on minimalist animated educational content, using the flat design style. It discusses scientific, technological, political, philosophical and psychological subjects.",
    },
    {
        _id: uuid(),
        categoryName: "VSauce",
        img: {
            src: "https://yt3.ggpht.com/ytc/AKedOLSCpbn6_3KOR7zAuqaS9fXtX7JAb0AQ6Y_f33ohog=s176-c-k-c0x00ffffff-no-rj",
            alt: "VSuace",
        },
        description:
            "The channels feature videos on scientific, psychological, mathematical, and philosophical topics, as well as gaming, technology, popular culture, and other general interest subjects.",
    },
];
