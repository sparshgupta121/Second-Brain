import dotenv from "dotenv";
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || "";
const JWT_SECRET: string = process.env.JWT_SECRET || "";

const ContentTypes = [
    "YOUTUBE",
    "TWITTER",
    "DOCUMENT",
    "LINK",
    "TAG",
    "CONTENT"
]

const createRandomHash = (length: number) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for(let i=0; i<length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export { MONGO_URI, JWT_SECRET, ContentTypes, createRandomHash };