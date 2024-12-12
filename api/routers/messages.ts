import express from "express";
import fileDb from "../fileDb";
import {MessageWithoutId} from "../types";
import {imagesUpload} from "../multer";

const messagesRouter = express.Router();

messagesRouter.get('/messages', async (_req, res) => {
    try {
        const messages = await fileDb.getItems();
        res.send(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send({ error: 'Failed to fetch messages' });
    }
});

messagesRouter.post('/messages', imagesUpload.single('image'), async (req, res) => {
    const { author, message } = req.body;

    const newMessage: MessageWithoutId = {
        author: author || 'Аноним',
        message,
        image: req.file ? 'images' + req.file.filename : null,
    };

    if (!newMessage.message) {
        res.status(400).send({ error: 'Message is required' });
        return;
    }

    try {
        const savedMessage = await fileDb.addItem(newMessage);
        res.status(201).send(savedMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send({ error: 'Failed to save message' });
    }
});

export default messagesRouter;
