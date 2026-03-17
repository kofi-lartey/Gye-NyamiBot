import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GyeNyameBot } from './bot.js';
import { createBotRoutes } from './routes/botRoutes.js';
import { generateAllAudioClips } from './services/ttsService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TOKEN) {
    console.error('❌ Error: TELEGRAM_BOT_TOKEN not found in .env file');
    console.log('Please copy .env.example to .env and add your bot token');
    process.exit(1);
}

const app = express();
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve audio files
app.use('/audio', express.static(path.join(__dirname, '../audio')));

const bot = new GyeNyameBot(TOKEN);
bot.start();

app.use('/', createBotRoutes(bot.controller));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/audio-player', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

// Generate audio clips at startup (optional - can take a few seconds)
const GENERATE_AUDIO = process.env.GENERATE_AUDIO === 'true';

async function startServer() {
    if (GENERATE_AUDIO) {
        console.log('🎧 Pre-generating audio clips (first run may take time)...');
        try {
            await generateAllAudioClips();
            console.log('✅ Audio clips ready!');
        } catch (error) {
            console.error('⚠️ Audio generation skipped:', error.message);
        }
    }
    
    app.listen(PORT, () => {
        console.log(`🌐 Server running on http://localhost:${PORT}`);
        console.log(`🎧 Audio player: http://localhost:${PORT}/audio-player`);
    });
}

startServer();

process.on('SIGINT', () => {
    console.log('\n👋 Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 Shutting down gracefully...');
    process.exit(0);
});
