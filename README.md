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

- 🎧 Listen - Audio story (coming soon)
- 📖 Read - Cultural story about Gye Nyame
- 🧠 Quiz - Test your knowledge
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
│   │   └── keyboards.js      # Keyboard layouts
│   ├── controllers/
│   │   └── botController.js  # Bot logic handlers
│   ├── routes/
│   │   └── botRoutes.js     # Route definitions
│   ├── services/
│   │   ├── stateService.js   # User state management
│   │   ├── quizService.js    # Quiz logic
│   │   └── passwordService.js # Password validation
│   ├── bot.js                # Main bot class
│   ├── server.js            # Polling mode server
│   └── webhook.js           # Webhook mode server
├── package.json
├── .env.example
└── README.md
```

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
# or with nodemon
npm run webhook:dev
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
