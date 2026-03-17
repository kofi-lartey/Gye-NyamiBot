import 'dotenv/config';
import express from 'express';
import { GyeNyameBot } from './bot.js';
import { createBotRoutes } from './routes/botRoutes.js';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TOKEN) {
    console.error('❌ Error: TELEGRAM_BOT_TOKEN not found in .env file');
    console.log('Please copy .env.example to .env and add your bot token');
    process.exit(1);
}

const app = express();
app.use(express.json());

const bot = new GyeNyameBot(TOKEN);
bot.start();

app.use('/', createBotRoutes(bot.controller));

app.get('/', (req, res) => {
    res.json({
        status: 'running',
        bot: 'Gye Nyame - Digital Protection Learning Module',
        version: '1.0.0'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('\n👋 Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 Shutting down gracefully...');
    process.exit(0);
});
