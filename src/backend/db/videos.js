/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */
import { v4 as uuid } from "uuid";
export const videos = [
    //Veritasium--------------------------------------------------------------------------

    {
        _id: uuid(),
        title: "The Universe is Hostile to Computers",
        description:
            "Tiny particles from distant galaxies have caused plane accidents, election interference and game glitches. ",
        creator: "Veritasium",
        img: {
            src: "https://i.ytimg.com/vi/AaZ_RSt0KP8/hqdefault.jpg",
            alt: "Sattelite Earth",
        },
        url: "https://www.youtube.com/watch?v=AaZ_RSt0KP8",
    },
    {
        _id: uuid(),
        title: "Why No One Has Measured The Speed Of Light",
        description:
            "Physics students learn the speed of light, c, is the same for all inertial observers but no one has ever actually measured it in one direction. ",
        creator: "Veritasium",
        img: {
            src: "https://i.ytimg.com/vi/pTn6Ewhb27k/hqdefault.jpg",
            alt: "Light",
        },
        url: "https://www.youtube.com/watch?v=pTn6Ewhb27k&t=18s",
    },
    {
        _id: uuid(),
        title: "Parallel Worlds Probably Exist. Here’s Why",
        description:
            "The most elegant interpretation of quantum mechanics is the universe is constantly splitting",
        creator: "Veritasium",
        img: {
            src: "https://i.ytimg.com/vi/kTXTPe3wahc/hqdefault.jpg",
            alt: "Parallel Worlds",
        },
        url: "https://www.youtube.com/watch?v=kTXTPe3wahc",
    },

    //Kurzgesagt--------------------------------------------------------------------------

    {
        _id: uuid(),
        title: "Is Reality Real? The Simulation Argument",
        description: "Is The Big Bang just someone starting thier computer?",
        creator: "Kurzgesagt",
        img: {
            src: "https://i.ytimg.com/vi/tlTKTTt47WE/hqdefault.jpg",
            alt: "Human Simulation",
        },
        url: "https://www.youtube.com/watch?v=tlTKTTt47WE",
    },
    {
        _id: uuid(),
        title: "String Theory Explained – What is The True Nature of Reality?",
        description:
            "Is String Theory the final solution for all of physic’s questions or an overhyped dead end?",
        creator: "Kurzgesagt",
        img: {
            src: "https://i.ytimg.com/vi/Da-2h2B4faU/hqdefault.jpg",
            alt: "String Theory",
        },
        url: "https://www.youtube.com/watch?v=Da-2h2B4faU",
    },
    {
        _id: uuid(),
        title: "Wormholes Explained – Breaking Spacetime",
        description:
            "Are wormholes real or are they just magic disguised as physics and maths? And if they are real how do they work and where can we find them?",
        creator: "Kurzgesagt",
        img: {
            src: "https://i.ytimg.com/vi/9P6rdqiybaw/hqdefault.jpg",
            alt: "Wormholes",
        },
        url: "https://www.youtube.com/watch?v=9P6rdqiybaw",
    },

    //VSauce--------------------------------------------------------------------------

    {
        _id: uuid(),
        title: "Illusions of Time",
        description: "Vsuace's Take on Time",
        creator: "VSauce",
        img: {
            src: "https://i.ytimg.com/vi/zHL9GP_B30E/hqdefault.jpg",
            alt: "Camera",
        },
        url: "https://www.youtube.com/watch?v=kTXTPe3wahc",
    },
    {
        _id: uuid(),
        title: "Is The 5-Second Rule True?",
        description: "VSauce's Take on The 5 - Second Rule",
        creator: "VSauce",
        img: {
            src: "https://i.ytimg.com/vi/rYXdsOEWBj0/hqdefault.jpg",
            alt: "Fallen Banana",
        },
        url: "https://www.youtube.com/watch?v=kTXTPe3wahc",
    },
    {
        _id: uuid(),
        title: "Where Do Deleted Files Go?",
        description: "Find Out what happens to the deleted files from Vsuace",
        creator: "VSauce",
        img: {
            src: "https://i.ytimg.com/vi/G5s4-Kak49o/hqdefault.jpg",
            alt: "Torn File Icon",
        },
        url: "https://www.youtube.com/watch?v=kTXTPe3wahc",
    },
];
