import { userStateManager, UserState } from '../services/stateService.js';
import { getQuizQuestion } from '../services/quizService.js';
import { validatePassword, getPasswordMessage } from '../services/passwordService.js';
import { getFAQByCategory, faqCategories } from '../services/faqService.js';
import { getTTSContent } from '../services/ttsService.js';
import { mainReplyKeyboard, listenKeyboard, getQuizKeyboard, faqCategoriesKeyboard, getFAQPaginationKeyboard } from '../config/keyboards.js';

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
/START - Start the bot
/RESET - Reset your progress
/HELP - Show this help message

*What you'll learn:*
• About Gye Nyame symbol
• Digital safety tips
• How to spot scams
• Social media protection
• Mobile banking security
• Create strong passwords

*Features:*
• 🎧 Listen - Audio lessons (opens web player)
• 📖 Read - Written lessons  
• 🧠 Quiz - Test knowledge
• ❓ FAQ - Ask questions`;

        await this.bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
    }

    async handleCallback(query) {
        const chatId = query.message.chat.id;
        const data = query.data;
        
        await this.bot.answerCallbackQuery(query.id);

        // Navigation
        if (data === 'action_back' || data === 'action_menu') {
            await this.handleStart({ chat: { id: chatId } });
            return;
        }

        if (data === 'action_faq') {
            await this.handleFAQ(chatId);
            return;
        }

        // Listen actions
        if (data === 'action_listen') {
            await this.handleListen(chatId);
            return;
        }

        if (data === 'listen_english') {
            await this.handleListenEnglish(chatId);
            return;
        }

        if (data === 'listen_twi') {
            await this.handleListenTwi(chatId);
            return;
        }

        if (data === 'listen_twi_text') {
            await this.handleListenTwiText(chatId);
            return;
        }

        // Read action
        if (data === 'action_read') {
            await this.handleRead(chatId);
            return;
        }

        // Quiz action
        if (data === 'action_quiz') {
            await this.handleQuiz(chatId);
            return;
        }

        // Quiz answers
        if (data === 'quiz_answer_1') {
            await this.handleQuizCorrect(chatId);
            return;
        }

        if (data.startsWith('quiz_answer_')) {
            await this.handleQuizWrong(chatId);
            return;
        }

        // Password
        if (data === 'password_check') {
            await this.handlePasswordPrompt(chatId);
            return;
        }

        if (data === 'password_retry') {
            await this.handlePasswordRetry(chatId);
            return;
        }

        // FAQ categories
        if (data === 'faq_digital_safety') {
            await this.handleFAQCategory(chatId, faqCategories.DIGITAL_SAFETY);
            return;
        }

        if (data === 'faq_scams') {
            await this.handleFAQCategory(chatId, faqCategories.SCAMS);
            return;
        }

        if (data === 'faq_social_media') {
            await this.handleFAQCategory(chatId, faqCategories.SOCIAL_MEDIA);
            return;
        }

        if (data === 'faq_mobile_banking') {
            await this.handleFAQCategory(chatId, faqCategories.MOBILE_BANKING);
            return;
        }

        // FAQ pagination
        if (data.startsWith('faq_next_') || data.startsWith('faq_prev_')) {
            const parts = data.split('_');
            const direction = parts[1]; // next or prev
            const category = parts[2];
            let index = parseInt(parts[3]);
            
            // Calculate new index based on direction
            if (direction === 'next') {
                index = index + 1;
            } else {
                index = index - 1;
            }
            
            await this.handleFAQItem(chatId, category, index);
            return;
        }
    }

    async handleMessage(msg) {
        const chatId = msg.chat.id;
        const text = msg.text;

        // Menu buttons
        if (text === '🎧 Listen') {
            await this.handleListen(chatId);
        } else if (text === '📖 Read') {
            await this.handleRead(chatId);
        } else if (text === '🧠 Start Quiz') {
            await this.handleQuiz(chatId);
        } else if (text === '❓ FAQ') {
            await this.handleFAQ(chatId);
        } else if (text === '🔄 Reset') {
            await this.handleReset(msg);
        } else if (userStateManager.getState(chatId) === UserState.PASSWORD) {
            await this.handlePasswordInput(chatId, text);
        }
    }

    // ========== LISTEN HANDLERS ==========

    async handleListen(chatId) {
        userStateManager.setState(chatId, UserState.LISTENING);
        
        const message = `🎧 *Listen to the Story*\n\n
Choose your language:`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...listenKeyboard });
    }

    async handleListenEnglish(chatId) {
        const content = getTTSContent('gyeNyame');
        
        const message = `🔊 *Audio Player (English)*\n\n
Tap the button below to open the audio player:\n
👆 https://your-domain.com/audio\n\n
or copy: http://localhost:3000/audio\n\n
_This will open a web player where you can listen to the lesson in English._`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...listenKeyboard });
    }

    async handleListenTwi(chatId) {
        const content = getTTSContent('gyeNyame');
        
        // Create inline keyboard with web player URL
        const audioKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🎧 Open Audio Player', url: 'http://localhost:3000/audio' }],
                    [{ text: '🇬🇭 Listen in Twi (Text)', callback_data: 'listen_twi_text' }],
                    [{ text: '⬅️ Back to Menu', callback_data: 'action_back' }]
                ]
            }
        };
        
        const message = `🔊 *Twi Audio Player*\n\n
*Tap "Open Audio Player" to hear the Twi narration!*\n\n
The player uses your phone's built-in speech to read Twi text aloud.\n\n
*Twia:* ${content.twi}`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...audioKeyboard });
    }

    async handleListenTwiText(chatId) {
        const content = getTTSContent('gyeNyame');
        
        const message = `🇬🇭 *Gye Nyame (Twi)*\n\n
${content.twi}\n\n
*Translation:*\n${content.english}`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...listenKeyboard });
    }

    // ========== READ HANDLER ==========

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

    // ========== FAQ HANDLERS ==========

    async handleFAQ(chatId) {
        userStateManager.setState(chatId, 'faq');
        
        const message = `❓ *Frequently Asked Questions*\n\n
Learn more about staying safe online!\n\n
Choose a topic:`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...faqCategoriesKeyboard });
    }

    async handleFAQCategory(chatId, category) {
        const faqs = getFAQByCategory(category);
        
        if (faqs.length > 0) {
            userStateManager.setState(chatId, `faq_${category}_0`);
            await this.handleFAQItem(chatId, category, 0);
        }
    }

    async handleFAQItem(chatId, category, index) {
        const faqs = getFAQByCategory(category);
        const faq = faqs[index];
        
        if (!faq) return;

        userStateManager.setState(chatId, `faq_${category}_${index}`);
        
        const message = `❓ *${faq.question}*\n\n
*Answer:*\n${faq.answer}\n\n
*Twi:*\n${faq.twiAnswer}`;

        await this.bot.sendMessage(
            chatId, 
            message, 
            { parse_mode: 'Markdown', ...getFAQPaginationKeyboard(category, index, faqs.length) }
        );
    }

    // ========== QUIZ HANDLERS ==========

    async handleQuiz(chatId) {
        userStateManager.setState(chatId, UserState.QUIZ);
        
        const question = getQuizQuestion(1);
        
        const message = `🧠 *Quiz Time!*\n\n${question.question}`;
        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...getQuizKeyboard() });
    }

    async handleQuizCorrect(chatId) {
        userStateManager.incrementScore(chatId);
        const score = userStateManager.getScore(chatId);
        
        const content = getTTSContent('quizCorrect');
        
        const message = `✅ *Correct!*\n\n${content.english}\n\n*Twia:* ${content.twi}\n\n*Score: ${score}/1*\n\nNow let's build a strong password! 🔐\n\nCreate a strong password with:\n• At least 8 characters\n• At least 1 number\n• At least 1 symbol\n• Uppercase & lowercase letters\n\nType your password below:`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        userStateManager.setState(chatId, UserState.PASSWORD);
    }

    async handleQuizWrong(chatId) {
        const content = getTTSContent('quizWrong');
        
        const message = `❌ *Be careful!*\n\n${content.english}\n\n*Twia:* ${content.twi}\n\n_Real companies will never ask you to click links in messages._\n\n*Try again:* What do you do?`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...getQuizKeyboard() });
    }

    // ========== PASSWORD HANDLERS ==========

    async handlePasswordPrompt(chatId) {
        const message = `🔐 *Create a Strong Password*\n\nRules:\n• At least 8 characters\n• At least 1 number\n• At least 1 symbol (!@#$%^&*)\n• Uppercase & lowercase\n\nType your password below:`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        userStateManager.setState(chatId, UserState.PASSWORD);
    }

    async handlePasswordRetry(chatId) {
        const message = `🔐 *Try Again!*\n\nCreate a strong password with:\n• At least 8 characters\n• At least 1 number  \n• At least 1 symbol\n• Uppercase & lowercase\n\nType your password:`;

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

    // ========== CERTIFICATION ==========

    async handleCertification(chatId) {
        const content = getTTSContent('congratulations');
        
        const message = `🎉 *CONGRATULATIONS!*\n\nYou have completed the Gye Nyame Digital Safety Module!\n\n🏆 *You are now:*\nDigital Protector – Gye Nyame Level 1\n\n🛡️ *Remember:*\n${content.english}\n\n*Twia:* ${content.twi}\n\nType /start to begin again or /help for assistance.`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...mainReplyKeyboard });
    }
}
