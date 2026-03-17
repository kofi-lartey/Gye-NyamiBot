import 'dotenv/config';
import express from 'express';
import { GyeNyameBot } from './bot.js';
import { createBotRoutes } from './routes/botRoutes.js';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = process.env.PORT || 3000;

if (!TOKEN) {
    console.error('❌ Error: TELEGRAM_BOT_TOKEN not found');
    process.exit(1);
}

if (!WEBHOOK_URL) {
    console.error('❌ Error: WEBHOOK_URL not found in .env');
    console.log('For webhook mode, please set WEBHOOK_URL in .env');
    process.exit(1);
}

const app = express();
app.use(express.json());

const bot = new GyeNyameBot(TOKEN);

app.use('/', createBotRoutes(bot.controller));

app.post(`/webhook/${TOKEN}`, async (req, res) => {
    try {
        await bot.controller.handleCallback(req.body.callback_query);
        res.send('OK');
    } catch (error) {
        console.error('Error processing update:', error);
        res.status(500).send('Error');
    }
});

app.get('/', (req, res) => {
    res.json({
        status: 'running',
        mode: 'webhook',
        url: WEBHOOK_URL
    });
});

async function setupWebhook() {
    try {
        await bot.bot.setWebhook(`${WEBHOOK_URL}/webhook/${TOKEN}`);
        console.log(`✅ Webhook set to: ${WEBHOOK_URL}/webhook/${TOKEN}`);
    } catch (error) {
        console.error('Failed to set webhook:', error);
    }
}

setupWebhook().then(() => {
    app.listen(PORT, () => {
        console.log(`🌐 Webhook server running on port ${PORT}`);
    });
});
