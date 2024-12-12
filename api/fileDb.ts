import {Message, MessageWithoutId} from "./types";
import {promises as fs} from 'fs';
import crypto from "crypto";

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = await JSON.parse(fileContent.toString()) as Message[];
        } catch (e) {
            console.error(e);
        }
    },

    async getItems() {
        return data;
    },

    async addItem(item: MessageWithoutId) {
        const id = crypto.randomUUID();
        const message: Message = { id, author: item.author || 'Аноним', message: item.message, image: item.image || null };
        data.push(message);
        await this.save();
        return message;
    },

    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;