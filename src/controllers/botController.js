import { userStateManager, UserState } from '../services/stateService.js';
import { getQuizQuestion, getRandomQuestion, getNextQuestion, getTotalQuestions, handleQuizAnswer, checkAnswer, getQuizKeyboard, getAllQuestions } from '../services/quizService.js';
import { validatePassword, getPasswordMessage } from '../services/passwordService.js';
import { getFAQByCategory, faqCategories } from '../services/faqService.js';
import { getTTSContent, generateAudio, AUDIO_CLIPS, getAudioPath, audioExists } from '../services/ttsService.js';
import { mainReplyKeyboard, listenKeyboard, getQuizKeyboard, faqCategoriesKeyboard, getFAQPaginationKeyboard } from '../config/keyboards.js';
import fs from 'fs';
import path from 'path';

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
• 🎧 Listen - Audio lessons (voice messages!)
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
        if (data.startsWith('quiz_')) {
            const parts = data.split('_');
            const questionId = parseInt(parts[1]);
            const answerIndex = parseInt(parts[2]);
            const isCorrect = checkAnswer(questionId, answerIndex);
            
            if (isCorrect) {
                await this.handleQuizCorrect(chatId);
            } else {
                await this.handleQuizWrong(chatId);
            }
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
            const direction = parts[1];
            const category = parts[2];
            let index = parseInt(parts[3]);
            
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
        try {
            // Try to send voice message
            const audioPath = getAudioPath('clip_welcome_en.mp3');
            
            if (audioExists('clip_welcome_en.mp3')) {
                await this.bot.sendVoice(chatId, audioPath, {
                    caption: '🔊 Welcome! (English)',
                    parse_mode: 'Markdown'
                });
            } else {
                // Generate audio on the fly
                await this.bot.sendMessage(chatId, '🎧 Generating audio...');
                const newPath = await generateAudio(AUDIO_CLIPS.welcome.en, 'en-US-AriaNeural', 'temp_en.mp3');
                if (newPath) {
                    await this.bot.sendVoice(chatId, newPath, {
                        caption: '🔊 Welcome! (English)',
                        parse_mode: 'Markdown'
                    });
                }
            }
        } catch (error) {
            console.error('Audio error:', error);
        }
        
        const content = getTTSContent('gyeNyame');
        
        const message = `📝 *Transcript:*\n\n${content.english}`;
        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...listenKeyboard });
    }

    async handleListenTwi(chatId) {
        try {
            // Try to send Twi voice message
            const audioPath = getAudioPath('clip_welcome_tw.mp3');
            
            if (audioExists('clip_welcome_tw.mp3')) {
                await this.bot.sendVoice(chatId, audioPath, {
                    caption: '🔊 Akwaaba! (Twi)',
                    parse_mode: 'Markdown'
                });
            } else {
                // Generate audio on the fly
                await this.bot.sendMessage(chatId, '🎧 Generating Twi audio...');
                const newPath = await generateAudio(AUDIO_CLIPS.welcome.twi, 'en-US-AriaNeural', 'temp_tw.mp3');
                if (newPath) {
                    await this.bot.sendVoice(chatId, newPath, {
                        caption: '🔊 Akwaaba! (Twi)',
                        parse_mode: 'Markdown'
                    });
                }
            }
        } catch (error) {
            console.error('Audio error:', error);
        }
        
        const content = getTTSContent('gyeNyame');
        
        const message = `📝 *Twi Transcript:*\n\n${content.twi}`;
        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...listenKeyboard });
    }

    async handleListenTwiText(chatId) {
        const content = getTTSContent('gyeNyame');
        
        const message = `🇬🇭 *Gye Nyame (Twi)*\n\n${content.twi}\n\n*Translation:*\n${content.english}`;

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
        userStateManager.reset(chatId);
        userStateManager.setState(chatId, UserState.QUIZ);
        userStateManager.setCurrentQuestion(chatId, 1);
        
        const question = getQuizQuestion(1);
        const total = getTotalQuestions();
        
        const message = `🧠 *Quiz Time!*

*Question 1 of ${total}*

${question.question}`;
        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...getQuizKeyboard(question.id) });
    }

    async handleQuizCorrect(chatId) {
        userStateManager.incrementScore(chatId);
        const score = userStateManager.getScore(chatId);
        const currentQ = userStateManager.getCurrentQuestion(chatId);
        const total = getTotalQuestions();
        
        const content = getTTSContent('quizCorrect');
        
        // Try to send voice message
        try {
            const audioPath = getAudioPath('clip_quizCorrect_en.mp3');
            if (audioExists('clip_quizCorrect_en.mp3')) {
                await this.bot.sendVoice(chatId, audioPath);
            }
        } catch (e) {}
        
        // Check if there are more questions
        if (currentQ < total) {
            const nextQ = currentQ + 1;
            const question = getQuizQuestion(nextQ);
            userStateManager.setCurrentQuestion(chatId, nextQ);
            
            const message = `✅ *Correct! 🎉*

${content.english}

*Score: ${score}/${nextQ - 1}*

---

*Question ${nextQ} of ${total}:*

${question.question}`;
            await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...getQuizKeyboard(question.id) });
        } else {
            // Quiz completed - go to password
            const message = `✅ *Correct! 🎉*

${content.english}

*Final Score: ${score}/${total}*

---

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
    }

    async handleQuizWrong(chatId) {
        const currentQ = userStateManager.getCurrentQuestion(chatId);
        const total = getTotalQuestions();
        const content = getTTSContent('quizWrong');
        
        const message = `❌ *Be careful!*

${content.english}

*Twia:* ${content.twi}

_Real companies will never ask you to click links in messages._

---

*Question ${currentQ} of ${total}:*

Try again! What do you do?`;

        const question = getQuizQuestion(currentQ);
        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...getQuizKeyboard(question.id) });
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
        
        // Try to send voice message
        try {
            const audioPath = getAudioPath('clip_congratulations_en.mp3');
            if (audioExists('clip_congratulations_en.mp3')) {
                await this.bot.sendVoice(chatId, audioPath, {
                    caption: '🎉 Congratulations!'
                });
            }
        } catch (e) {}
        
        const message = `🎉 *CONGRATULATIONS!*\n\nYou have completed the Gye Nyame Digital Safety Module!\n\n🏆 *You are now:*\nDigital Protector – Gye Nyame Level 1\n\n🛡️ *Remember:*\n${content.english}\n\n*Twia:* ${content.twi}\n\nType /start to begin again or /help for assistance.`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...mainReplyKeyboard });
    }
}
