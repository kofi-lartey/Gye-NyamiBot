import { userStateManager, UserState } from '../services/stateService.js';
import { handleQuizAnswer, getQuizQuestion } from '../services/quizService.js';
import { validatePassword, getPasswordMessage } from '../services/passwordService.js';
import { mainReplyKeyboard, getQuizKeyboard } from '../config/keyboards.js';

export class BotController {
    constructor(bot) {
        this.bot = bot;
    }

    async handleStart(msg) {
        const chatId = msg.chat.id;
        userStateManager.reset(chatId);
        
        const welcomeMessage = `Akwaaba! 🌍
Today's symbol: Gye Nyame
Protect Your Digital Life

Gye Nyame means "Except God" - a symbol of protection.
Just as we seek protection in life, we must also protect ourselves online!

Choose what you want to do:`;

        await this.bot.sendMessage(chatId, welcomeMessage, mainReplyKeyboard);
        userStateManager.setState(chatId, UserState.MENU);
    }

    async handleReset(msg) {
        const chatId = msg.chat.id;
        userStateManager.reset(chatId);
        
        await this.bot.sendMessage(chatId, '🔄 Reset complete! Starting fresh...', mainReplyKeyboard);
        await this.handleStart(msg);
    }

    async handleHelp(msg) {
        const chatId = msg.chat.id;
        const helpMessage = `🆘 *Help*\n\n
/start - Start the bot
/reset - Reset your progress
/help - Show this help message

*What you'll learn:*
• About Gye Nyame symbol
• Digital safety tips
• How to spot scams
• Create strong passwords`;

        await this.bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
    }

    async handleCallback(query) {
        const chatId = query.message.chat.id;
        const data = query.data;
        
        await this.bot.answerCallbackQuery(query.id);

        if (data === 'action_listen') {
            await this.handleListen(chatId);
        } else if (data === 'action_read') {
            await this.handleRead(chatId);
        } else if (data === 'action_quiz') {
            await this.handleQuiz(chatId);
        } else if (data === 'quiz_answer_1') {
            await this.handleQuizCorrect(chatId);
        } else if (data.startsWith('quiz_answer_')) {
            await this.handleQuizWrong(chatId);
        } else if (data === 'password_check') {
            await this.handlePasswordPrompt(chatId);
        } else if (data === 'password_retry') {
            await this.handlePasswordRetry(chatId);
        }
    }

    async handleMessage(msg) {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (text === '🎧 Listen') {
            await this.handleListen(chatId);
        } else if (text === '📖 Read') {
            await this.handleRead(chatId);
        } else if (text === '🧠 Start Quiz') {
            await this.handleQuiz(chatId);
        } else if (text === '🔄 Reset') {
            await this.handleReset(msg);
        } else if (userStateManager.getState(chatId) === UserState.PASSWORD) {
            await this.handlePasswordInput(chatId, text);
        }
    }

    async handleListen(chatId) {
        userStateManager.setState(chatId, UserState.LISTENING);
        
        const message = `🎧 *Listen*\n\n
_Audio coming soon!_

*Meanwhile, here's the story in Twi and English:*

"Me da woase" (Thank you very much)
"Gye Nyame" yɛ nka (Except God)

In Twi: "Gye Nyame" means "Except God" - our ancestors reminded us that only God gives true protection.

In English: Gye Nyame is an Adinkra symbol that reminds us we need protection in everything we do - including our digital lives!

*Stay tuned for audio version!*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...mainReplyKeyboard });
    }

    async handleRead(chatId) {
        userStateManager.setState(chatId, UserState.READING);
        
        const message = `📖 *The Gye Nyame Story*

*What is Gye Nyame?*
Gye Nyame is one of the most powerful Adinkra symbols from Ghana. It means "Except God" in the Twi language.

*In the Akan worldview:*
Our ancestors believed that only God (Onyame) gives true protection. The symbol reminds us to seek divine guidance in all things.

*Connecting to Digital Safety:*
Just as we pray for protection in the physical world, we must also protect ourselves online!

🛡️ *Remember:*
• Don't share your PIN
• Think before clicking
• Keep your passwords secret

*Now let's test your knowledge!*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...mainReplyKeyboard });
    }

    async handleQuiz(chatId) {
        userStateManager.setState(chatId, UserState.QUIZ);
        
        const question = getQuizQuestion(1);
        
        const message = `🧠 *Quiz Time!*\n\n${question.question}`;
        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...getQuizKeyboard() });
    }

    async handleQuizCorrect(chatId) {
        userStateManager.incrementScore(chatId);
        const score = userStateManager.getScore(chatId);
        
        const message = `✅ *Correct!*\n\nYou are protecting yourself!
Never click unknown links. Real MTN/Vodafone will never ask you to click links via SMS.

*Score: ${score}/1*

Now let's build a strong password! 🔐

Create a strong password with:
• At least 8 characters
• At least 1 number
• At least 1 symbol
• Uppercase & lowercase letters

Type your password below:`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        userStateManager.setState(chatId, UserState.PASSWORD);
    }

    async handleQuizWrong(chatId) {
        const message = `❌ *Be careful!*\n\nNever trust unknown links. This is a scam!
Real companies will never ask you to click links in messages.`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...getQuizKeyboard() });
    }

    async handlePasswordPrompt(chatId) {
        const message = `🔐 *Create a Strong Password*\n\nRules:
• At least 8 characters
• At least 1 number
• At least 1 symbol (!@#$%^&*)
• Uppercase & lowercase\n\nType your password below:`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        userStateManager.setState(chatId, UserState.PASSWORD);
    }

    async handlePasswordRetry(chatId) {
        const message = `🔐 *Try Again!*\n\nCreate a strong password with:
• At least 8 characters
• At least 1 number  
• At least 1 symbol
• Uppercase & lowercase\n\nType your password:`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }

    async handlePasswordInput(chatId, password) {
        const validation = validatePassword(password);
        userStateManager.setPassword(chatId, password);
        
        await this.bot.sendMessage(chatId, getPasswordMessage(validation), { parse_mode: 'Markdown' });
        
        if (validation.isValid) {
            userStateManager.setState(chatId, UserState.CERTIFIED);
            await this.handleCertification(chatId);
        } else {
            const retryKeyboard = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '🔄 Try Again', callback_data: 'password_retry' }]
                    ]
                }
            };
            await this.bot.sendMessage(chatId, 'Try again with a stronger password!', retryKeyboard);
        }
    }

    async handleCertification(chatId) {
        const message = `🎉 *CONGRATULATIONS!*\n\nYou have completed the Gye Nyame Digital Safety Module!\n\n🏆 *You are now:*
Digital Protector – Gye Nyame Level 1\n\n🛡️ *Remember:*
Just like Gye Nyame protects us in Ghana,
you now have the power to protect yourself online!\n\nAsante! (Thank you!) 🙏\n\nType /start to begin again or /help for assistance.`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...mainReplyKeyboard });
    }
}
