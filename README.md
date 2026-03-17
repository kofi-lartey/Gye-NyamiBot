# Gye Nyame - Digital Protection Learning Module

A Telegram bot that teaches digital safety using Ghanaian Adinkra symbols.

## Quick Start

```bash
# Install dependencies
npm install

# Copy .env file
copy .env.example .env

# Add your bot token to .env
# TELEGRAM_BOT_TOKEN=your_token_here

# Run with nodemon (development)
npm run dev

# Or run normally
npm start
```

## Bot Features

- 🎧 Listen - Audio story in Twi & English
- 📖 Read - Cultural story about Gye Nyame
- 🧠 Quiz - Test your knowledge
- ❓ FAQ - Digital safety questions
- 🔐 Password Checker - Validate strong passwords
- 🏆 Certification - Earn Digital Protector badge

## Commands

- `/start` - Start the bot
- `/reset` - Reset progress
- `/help` - Get help

## Project Structure

```
gye-nyame-bot/
├── src/
│   ├── config/
│   │   └── keyboards.js           # Keyboard layouts
│   ├── controllers/
│   │   └── botController.js      # Bot logic handlers
│   ├── routes/
│   │   └── botRoutes.js          # Route definitions
│   ├── services/
│   │   ├── stateService.js       # User state management
│   │   ├── quizService.js        # Quiz logic
│   │   ├── passwordService.js    # Password validation
│   │   ├── faqService.js         # FAQ content (25+ questions)
│   │   └── ttsService.js         # Text-to-speech (free)
│   ├── bot.js                    # Main bot class
│   ├── server.js                # Polling mode server
│   └── webhook.js               # Webhook mode server
├── package.json
├── .env.example
└── README.md
```

## FAQ Categories

The bot includes 25+ questions across 4 categories:

1. **🛡️ Digital Safety Tips** - Basic online protection
2. **⚠️ Common Scams** - Scams in Ghana & Africa
3. **📱 Social Media Safety** - Facebook, WhatsApp, Instagram
4. **💰 Mobile Banking** - MTN Money, Vodafone Cash, Bank apps

## Text-to-Speech

The bot displays Twi text alongside English translations. For audio:
- **Telegram**: Shows Twi phonetic text users can read
- **PWA/Web**: Uses Web Speech API for audio playback
- **Free**: No API keys required!

## Deployment

### Polling (Development)
```bash
npm start
# or with nodemon
npm run dev
```

### Webhook (Production)
```bash
npm run webhook
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| TELEGRAM_BOT_TOKEN | Your Telegram bot token |
| PORT | Server port (default: 3000) |
| WEBHOOK_URL | Production webhook URL |
| NODE_ENV | Environment (development/production) |

## Tech Stack

- Node.js (ES Modules)
- Express
- node-telegram-bot-api
- nodemon (dev)

## How to Get Bot Token

1. Open Telegram and search for @BotFather
2. Send /newbot command
3. Follow instructions to name your bot
4. Copy the token and add to .env file
