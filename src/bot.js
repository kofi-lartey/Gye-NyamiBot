import TelegramBot from 'node-telegram-bot-api';
import { BotController } from './controllers/botController.js';

export class GyeNyameBot {
    constructor(token) {
        this.bot = new TelegramBot(token, { polling: true });
        this.controller = new BotController(this.bot);
        this.setupHandlers();
    }

    setupHandlers() {
        this.bot.onText(/\/start/, (msg) => this.controller.handleStart(msg));
        this.bot.onText(/\/reset/, (msg) => this.controller.handleReset(msg));
        this.bot.onText(/\/help/, (msg) => this.controller.handleHelp(msg));
        this.bot.on('callback_query', (query) => this.controller.handleCallback(query));
        this.bot.on('message', (msg) => this.controller.handleMessage(msg));
    }

    start() {
        console.log('🤖 Gye Nyame Bot is running...');
    }

    getBot() {
        return this.bot;
    }
}
