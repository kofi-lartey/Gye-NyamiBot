import { userStateManager, UserState, LevelNames, LevelSymbols } from '../services/stateService.js';
import { getQuizQuestion, getRandomQuestion, getNextQuestion, getTotalQuestions, handleQuizAnswer, checkAnswer, getQuizKeyboard, getAllQuestions } from '../services/quizService.js';
import { validatePassword, getPasswordMessage } from '../services/passwordService.js';
import { getFAQByCategory, faqCategories } from '../services/faqService.js';
import { getTTSContent, generateAudio, AUDIO_CLIPS, getAudioPath, audioExists } from '../services/ttsService.js';
import { mainReplyKeyboard, listenKeyboard, faqCategoriesKeyboard, getFAQPaginationKeyboard, pathOfWisdomMenuKeyboard, pathOfWisdomKeyboard, sankofaKeyboard, sankofaPostKeyboard, sankofaCompleteKeyboard, nkyinkyimKeyboard, nkyinkyimScenarioKeyboard, nkyinkyimLinksKeyboard, nkyinkyimCompleteKeyboard, fawohodieKeyboard, fawohodieCompleteKeyboard, ebanKeyboard, ebanCompleteKeyboard, gyeNyameKeyboard, gyeNyameChallengeKeyboard, gyeNyameCompleteKeyboard, getPathOfWisdomKeyboard } from '../config/keyboards.js';
import fs from 'fs';
import path from 'path';

export class BotController {
    constructor(bot) {
        this.bot = bot;
    }

    async handleStart(msg) {
        const chatId = msg.chat.id;
        userStateManager.reset(chatId);
        
        const welcomeMessage = `Akwaaba! 🌍✨

🐦 *The Adinkra Digital Mentor*

I am your guide on the *Path of Wisdom* - a journey through five levels of digital mastery, inspired by Ghana's sacred Adinkra symbols.

*Choose your path:*`;

        await this.bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown', ...pathOfWisdomMenuKeyboard });
        userStateManager.setState(chatId, UserState.MENU);
    }

    async handleReset(msg) {
        const chatId = msg.chat.id;
        userStateManager.reset(chatId);
        
        await this.bot.sendMessage(chatId, '🔄 Reset complete! Starting fresh...', pathOfWisdomMenuKeyboard);
        await this.handleStart(msg);
    }

    async handleHelp(msg) {
        const chatId = msg.chat.id;
        const helpMessage = `🆘 *Help*

/START - Start the bot
/RESET - Reset your progress
/HELP - Show this help message

*Path of Wisdom Levels:*
🦅 Sankofa - Digital Footprint
🔄 Nkyinkyim - Fraud Detection  
🕊️ Fawohodie - Digital Rights
🏠 Eban - Family Safety
👑 Gye Nyame - Grand Master

*Features:*
• 🦅 Path of Wisdom - Complete all 5 levels!
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

        if (data === 'action_path_menu') {
            await this.handlePathOfWisdom(chatId);
            return;
        }

        if (data === 'action_reset') {
            await this.handleReset({ chat: { id: chatId } });
            return;
        }

        if (data === 'action_faq') {
            await this.handleFAQ(chatId);
            return;
        }

        // ========== PATH OF WISDOM LEVELS ==========
        
        // Level 1: Sankofa
        if (data === 'level_sankofa') {
            await this.handleSankofa(chatId);
            return;
        }
        
        if (data === 'sankofa_info') {
            await this.handleSankofaInfo(chatId);
            return;
        }
        
        if (data === 'sankofa_draft') {
            await this.handleSankofaDraft(chatId);
            return;
        }
        
        if (data === 'sankofa_post') {
            await this.handleSankofaPost(chatId);
            return;
        }

        // Level 2: Nkyinkyim
        if (data === 'level_nkyinkyim') {
            await this.handleNkyinkyim(chatId);
            return;
        }
        
        if (data === 'nkyinkyim_momo') {
            await this.handleNkyinkyimMoMo(chatId);
            return;
        }
        
        if (data === 'nkyinkyim_links') {
            await this.handleNkyinkyimLinks(chatId);
            return;
        }
        
        if (data === 'nkyinkyim_vendor') {
            await this.handleNkyinkyimVendor(chatId);
            return;
        }
        
        if (data === 'nkyinkyim_answer_correct') {
            await this.handleNkyinkyimCorrect(chatId);
            return;
        }
        
        if (data === 'nkyinkyim_answer_wrong' || data === 'nkyinkyim_answer_wrong2') {
            await this.handleNkyinkyimWrong(chatId);
            return;
        }
        
        if (data === 'nkyinkyim_link_correct') {
            await this.handleNkyinkyimLinkCorrect(chatId);
            return;
        }
        
        if (data === 'nkyinkyim_link_wrong' || data === 'nkyinkyim_link_wrong2') {
            await this.handleNkyinkyimLinkWrong(chatId);
            return;
        }

        // Level 3: Fawohodie
        if (data === 'level_fawohodie') {
            await this.handleFawohodie(chatId);
            return;
        }
        
        if (data === 'fawohodie_terms') {
            await this.handleFawohodieTerms(chatId);
            return;
        }
        
        if (data === 'fawohodie_2fa') {
            await this.handleFawohodie2FA(chatId);
            return;
        }
        
        if (data === 'fawohodie_factcheck') {
            await this.handleFawohodieFactCheck(chatId);
            return;
        }

        // Level 4: Eban
        if (data === 'level_eban') {
            await this.handleEban(chatId);
            return;
        }
        
        if (data === 'eban_controls') {
            await this.handleEbanControls(chatId);
            return;
        }
        
        if (data === 'eban_strangers') {
            await this.handleEbanStrangers(chatId);
            return;
        }
        
        if (data === 'eban_reporting') {
            await this.handleEbanReporting(chatId);
            return;
        }

        // Level 5: Gye Nyame
        if (data === 'level_gye_nyame') {
            await this.handleGyeNyame(chatId);
            return;
        }
        
        if (data === 'gye_nyame_challenge') {
            await this.handleGyeNyameChallenge(chatId);
            return;
        }
        
        if (data === 'gye_nyame_philosophy') {
            await this.handleGyeNyamePhilosophy(chatId);
            return;
        }
        
        if (data === 'gye_nyame_complete') {
            await this.handleGyeNyameComplete(chatId);
            return;
        }
        
        if (data === 'gye_nyame_certificate') {
            await this.handleGyeNyameCertificate(chatId);
            return;
        }
        
        if (data === 'gye_nyame_help') {
            await this.handleGyeNyameHelp(chatId);
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

        if (text === '🦅 Path of Wisdom') {
            await this.handlePathOfWisdom(chatId);
        } else if (text === '🎧 Listen') {
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
        } else if (userStateManager.getState(chatId) === UserState.SANCOFA_POST) {
            await this.handleSankofaPostInput(chatId, text);
        }
    }

    // ========== PATH OF WISDOM HANDLERS ==========

    async handlePathOfWisdom(chatId) {
        const completedLevels = userStateManager.getCompletedLevels(chatId);
        const canAccessGyeNyame = userStateManager.canAccessGyeNyame(chatId);
        
        const message = `🦅 *THE PATH OF WISDOM*

Your journey through five levels of digital mastery, guided by Ghana's sacred Adinkra symbols.

*Current Progress:*
${completedLevels.includes('sankofa') ? '✅' : '⬜'} Sankofa - Digital Footprint
${completedLevels.includes('nkyinkyim') ? '✅' : '⬜'} Nkyinkyim - Fraud Detection
${completedLevels.includes('fawohodie') ? '✅' : '⬜'} Fawohodie - Digital Rights
${completedLevels.includes('eban') ? '✅' : '⬜'} Eban - Family Safety
${canAccessGyeNyame ? '👑' : '🔒'} Gye Nyame - Grand Master${!canAccessGyeNyame ? ' (Complete other levels first!)' : ''}

*Select a level to begin:*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...getPathOfWisdomKeyboard(completedLevels) });
        userStateManager.setState(chatId, UserState.PATH_WISDOM);
    }

    // ========== SANCOFA (LEVEL 1) - DIGITAL FOOTPRINT ==========

    async handleSankofa(chatId) {
        userStateManager.setCurrentLevel(chatId, UserState.SANCOFA);
        
        const message = `🦅 *LEVEL 1: SANCOFA*
*"Learn from the past to build the future"*

In Akan tradition, Sankofa is depicted as a bird looking backward - reminding us that we must learn from the past to build a better future.

*In the Digital World:*
Every post you make today becomes your digital footprint. Recruiters, universities, and even scammers can see what you posted years ago!

*Today's Lesson:*
Let's simulate how a careless social media post can affect your future.

---

*Scenario:* It's been a tough day at work. You want to vent on Facebook about your frustrating boss...

What would you post?`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...sankofaKeyboard });
        userStateManager.setState(chatId, UserState.SANCOFA);
    }

    async handleSankofaInfo(chatId) {
        const message = `🦅 *What is Sankofa?*

Sankofa is an Adinkra symbol from Ghana that represents the importance of learning from the past.

*The Digital Connection:*
Just as our ancestors taught us to remember our history, we must remember that everything we post online stays online forever.

*Key Lesson:*
Before posting, ask yourself:
1. Would I be comfortable if my grandmother saw this?
2. Would a future employer see this?
3. Will this post still be relevant in 5 years?

*3-Point Privacy Checklist:*
✅ Review who can see your posts (Friends Only?)
✅ Check what information is publicly visible
✅ Remove old posts that might be embarrassing`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...sankofaKeyboard });
    }

    async handleSankofaDraft(chatId) {
        const message = `✍️ *Draft Your Post*

Share your frustrations about your workday. What would you post?

*(Type your post and send it to me)*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        userStateManager.setState(chatId, UserState.SANCOFA_POST);
    }

    async handleSankofaPostInput(chatId, text) {
        userStateManager.setModuleData(chatId, 'draftPost', text);
        
        const message = `📝 *Your Post:*
"${text}"

⚠️ *5-YEAR FUTURE REVEAL* 🔮

*Year 1:* Your post gets shared by "friends of friends." Your boss somehow sees it.

*Year 3:* You apply for a new job. The recruiter does a background check and finds this post. They see someone who complains about work.

*Year 5:* You're called for an interview but... they went with another candidate. They found your " venting" post and decided you have a "negative attitude."

---

*🎯 The Lesson:*
What you post online can and will be used against you. Always think before you post!

*Options:*
• Post it anyway (not recommended!)
• Rewrite with a better approach
• Discard and keep it to yourself`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...sankofaPostKeyboard });
    }

    async handleSankofaPost(chatId) {
        const draftPost = userStateManager.getModuleData(chatId, 'draftPost');
        
        const message = `⚠️ *You Posted It!*

Your post: "${draftPost}"

*What just happened:*
• Your employer might see it
• Future recruiters WILL find it
• It could affect job opportunities
• Once posted, it's forever

---

*🛡️ SANCOFA WISDOM:*

*Before you post, use the SANKOFA TEST:*
1. **S**afe - Is this safe to share?
2. **A**ppropriate - Is this appropriate for everyone?
3. **N**ecessary - Do I really need to post this?
4. **K**ind - Is this kind?
5. **O**wn - Would I own this in 5 years?

---

*✅ CONGRATULATIONS!*

You have completed **Sankofa - Digital Footprint**! 

You've learned to think before you post and consider your digital legacy.`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...sankofaCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'sankofa');
        userStateManager.setState(chatId, UserState.SANCOFA_COMPLETE);
    }

    // ========== NKYINKYIM (LEVEL 2) - FRAUD DETECTION ==========

    async handleNkyinkyim(chatId) {
        // Check if previous levels are complete
        if (!userStateManager.isLevelCompleted(chatId, 'sankofa')) {
            await this.bot.sendMessage(chatId, `⚠️ *Access Denied!*

"One must look back to Sankofa before they can navigate the twists of Nkyinkyim."

Please complete Level 1 (Sankofa) first.`, { parse_mode: 'Markdown', ...pathOfWisdomKeyboard });
            return;
        }
        
        userStateManager.setCurrentLevel(chatId, UserState.NKYINKYIM);
        
        const message = `🔄 *LEVEL 2: NKYINKYIM*
*"Navigating life's complexities with alertness"*

Nkyinkyim represents the twists and turns of life, teaching us to be alert and adaptable.

*In the Digital World:*
The internet is full of twists and turns - scams, fake links, and fraudsters waiting to trap the unwary.

*Choose a lesson:*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...nkyinkyimKeyboard });
        userStateManager.setState(chatId, UserState.NKYINKYIM);
    }

    async handleNkyinkyimMoMo(chatId) {
        const message = `📱 *MoMo Scam Scenario*

*Scenario:* You receive a WhatsApp message:

*"Hello, I mistakenly sent you GHS 500 via Mobile Money. Please send it back to 024XXXXXXX. This is urgent!"*

*What do you do?*

🕵️ *Think carefully! This is a common scam!*

The scammer sends you a fake notification that looks like a real MoMo transfer. If you "send money back," you're actually sending YOUR money to the scammer!

*Red Flags:*
⚠️ Unexpected "mistaken" transfers
⚠️ Pressure to send money quickly
⚠️ Unknown numbers asking for money
⚠️ Too-good-to-be-true situations`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...nkyinkyimScenarioKeyboard });
        userStateManager.setState(chatId, UserState.NKYINKYIM_SCENARIO);
    }

    async handleNkyinkyimCorrect(chatId) {
        const message = `✅ *EXCELLENT CHOICE!*

You chose to IGNORE and BLOCK! 👏

*Here's what a Wise Digital Citizen would do:*
1. ❌ Don't respond to the message
2. 🚫 Block the number immediately
3. 📞 If genuinely concerned, call your mobile network's official customer service line to verify
4. 🔒 Never send money to unknown numbers

*🦅 Sankofa Wisdom Applied:*
You looked back at past lessons and recognized the scam pattern!

*🔄 Nkyinkyim Applied:*
You navigated the twist successfully by staying alert!

---

*✅ CONGRATULATIONS!*

You have completed **Nkyinkyim - Fraud Detection** (Part 1)!`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...nkyinkyimCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'nkyinkyim');
        userStateManager.setState(chatId, UserState.NKYINKYIM_COMPLETE);
    }

    async handleNkyinkyimWrong(chatId) {
        const message = `❌ *BE CAREFUL!*

This is exactly what scammers want you to do!

*What really happens:*
The "GHS 500" never existed. It's a fake notification. When you "send money back," you're sending YOUR hard-earned money to the scammer.

*🔄 The Nkyinkyim Twist:*
Scammers count on your honesty and eagerness to help. They twist your good intentions against you!

*Remember:*
🛡️ Real MoMo transfers don't work this way
🛡️ Banks/MoMo services have official channels
🛡️ When in doubt, don't act - ask first!

*Try again - What would you do?*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...nkyinkyimScenarioKeyboard });
    }

    async handleNkyinkyimLinks(chatId) {
        const message = `🔗 *LINK CHECKER GAME*

*Test your scam-detection skills!*

Which of these URLs is SAFE to click?

🔗 \`bit.ly/momo-win\` - "You've won a GHS 10,000 MoMo prize!"
🔗 \`google.com/safety\` - Google's official safety page
🔗 \`whatsapp-secure-login.net\` - "Verify your WhatsApp account"

*Think carefully...*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...nkyinkyimLinksKeyboard });
    }

    async handleNkyinkyimLinkCorrect(chatId) {
        const message = `✅ *CORRECT!*

\`google.com/safety\` is the only safe URL!

*Why the others are dangerous:*
❌ \`bit.ly/momo-win\` - Shortened link hiding a scam site
❌ \`whatsapp-secure-login.net\` - Fake domain pretending to be WhatsApp

*🔗 Link Safety Rules:*
✅ Check the actual domain (the part before .com/.net)
✅ Be suspicious of shortened links (bit.ly, tinyurl)
✅ Look for misspellings (whatsapp vs whatsapp)
✅ When in doubt, search for the real website directly

---

*✅ CONGRATULATIONS!*

You have mastered the **Link Checker**!`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...nkyinkyimCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'nkyinkyim');
        userStateManager.setState(chatId, UserState.NKYINKYIM_COMPLETE);
    }

    async handleNkyinkyimLinkWrong(chatId) {
        const message = `❌ *THAT LINK IS DANGEROUS!*

*Why this is a scam:*
❌ \`bit.ly/momo-win\` - Shortened link hiding malicious site
❌ \`whatsapp-secure-login.net\` - Fake domain

*🔗 Remember:*
✅ Check the REAL domain (before .com/.net)
✅ Shortened links (bit.ly) hide the true destination
✅ Fake domains often look similar to real ones
✅ When in doubt, search for the real website

*Try again - Which is safe?*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...nkyinkyimLinksKeyboard });
    }

    async handleNkyinkyimVendor(chatId) {
        const message = `🛒 *FAKE INSTAGRAM VENDOR GUIDE*

*3 Signs of a Fake Online Vendor:*

1️⃣ **No Physical Address**
Real businesses have a location. Fake vendors hide behind WhatsApp numbers only.

2️⃣ **Comments Disabled**
If you can't see customer complaints, something is wrong. Legitimate sellers welcome feedback.

3️⃣ **Price Too Good to Be True**
If it's 70% cheaper than everywhere else, it's probably fake. Quality has a price.

*🛡️ Protection Checklist:*
✅ Search for reviews of the vendor
✅ Ask for physical business location
✅ Use payment methods with buyer protection
✅ Trust your instincts - if it feels off, it probably is

---

*🔄 Nkyinkyim Wisdom:*
Navigate the complex online marketplace with alertness!`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...nkyinkyimCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'nkyinkyim');
        userStateManager.setState(chatId, UserState.NKYINKYIM_COMPLETE);
    }

    // ========== FAWOHODIE (LEVEL 3) - DIGITAL RIGHTS ==========

    async handleFawohodie(chatId) {
        // Check if previous levels are complete
        if (!userStateManager.isLevelCompleted(chatId, 'sankofa') || !userStateManager.isLevelCompleted(chatId, 'nkyinkyim')) {
            await this.bot.sendMessage(chatId, `⚠️ *Access Denied!*

"One must navigate the twists of Nkyinkyim before understanding the responsibilities of Fawohodie."

Please complete previous levels first.`, { parse_mode: 'Markdown', ...pathOfWisdomKeyboard });
            return;
        }
        
        userStateManager.setCurrentLevel(chatId, UserState.FAWOHODIE);
        
        const message = `🕊️ *LEVEL 3: FAWOHODIE*
*"With freedom comes responsibility"*

Fawohodie represents independence and freedom, but reminds us that with freedom comes the responsibility to use it wisely.

*In the Digital World:*
The internet gives us amazing freedom - but we must use it responsibly. Your data, your privacy, your digital identity - these are your rights!

*Choose a lesson:*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...fawohodieKeyboard });
        userStateManager.setState(chatId, UserState.FAWOHODIE);
    }

    async handleFawohodieTerms(chatId) {
        const message = `📜 *TERMS & CONDITIONS EXPLAINED*

*What they DON'T tell you:*

When an app says "Free," they usually mean:
📊 "We will collect your data"
📍 "We will track your location"
👤 "We will sell your information to advertisers"

*🔍 Plain Language Translation:*

❌ "We may share your information with partners" 
   → We're selling your data to advertisers

❌ "We use cookies to improve your experience"
   → We're tracking everything you do

❌ "You agree to our terms"
   → You've signed away your privacy

*🕊️ FAWOHODIE WISDOM:*

*With freedom (free apps) comes responsibility (your data):*
✅ Read at least the summary of terms
✅ Question why something is free
✅ Use privacy settings to limit data sharing
✅ Consider paid alternatives if privacy matters

*Remember: If you're not paying for the product, YOU are the product!*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...fawohodieCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'fawohodie');
        userStateManager.setState(chatId, UserState.FAWOHODIE_COMPLETE);
    }

    async handleFawohodie2FA(chatId) {
        const message = `🔐 *2FA SETUP GUIDE*

*Two-Factor Authentication - Your Digital Shield!*

**WhatsApp 2FA:**
1. Open WhatsApp → Settings
2. Tap Account → Two-step verification
3. Tap "Enable"
4. Enter a 6-digit PIN (remember this!)
5. Add your email for backup
6. Done! ✅

**Telegram 2FA:**
1. Open Telegram → Settings
2. Tap Privacy and Security
3. Tap Two-Step Verification
4. Create a password
5. Add a hint (only you should understand)
6. Set a recovery email
7. Done! ✅

*🕊️ FAWOHODIE WISDOM:*
With the freedom of messaging apps comes the responsibility to protect your account!

*Why 2FA matters:*
🛡️ Even if someone gets your password, they can't get in
🛡️ Your account is 99% safer
🛡️ It takes 1 minute to set up, saves hours of trouble`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...fawohodieCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'fawohodie');
        userStateManager.setState(chatId, UserState.FAWOHODIE_COMPLETE);
    }

    async handleFawohodieFactCheck(chatId) {
        const message = `✅ *FACT-CHECK PROTOCOL*

*"Search Before You Share"*

*📱 The Golden Rule:*
If you didn't create it, verify it before sharing!

*🔍 The SIFT Method:*

**S**top - Don't share immediately
**I**nvestigate the source - Who posted this?
**F**ind better coverage - Search for other sources
**T**race claims - Check the original context

*🕊️ FAWOHODIE WISDOM:*
With freedom of speech comes the responsibility to not spread lies!

*Before sharing, ask:*
1. Is this from a trusted news source?
2. Can I find this on multiple websites?
3. Is this trying to make me angry?
4. Does it sound too unbelievable?

*Remember:* False information travels 6x faster than truth. Be part of the solution!`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...fawohodieCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'fawohodie');
        userStateManager.setState(chatId, UserState.FAWOHODIE_COMPLETE);
    }

    // ========== EBAN (LEVEL 4) - FAMILY SAFETY ==========

    async handleEban(chatId) {
        // Check if previous levels are complete
        if (!userStateManager.isLevelCompleted(chatId, 'sankofa') || 
            !userStateManager.isLevelCompleted(chatId, 'nkyinkyim') ||
            !userStateManager.isLevelCompleted(chatId, 'fawohodie')) {
            await this.bot.sendMessage(chatId, `⚠️ *Access Denied!*

"One must understand freedom and responsibility before protecting the home."

Please complete previous levels first.`, { parse_mode: 'Markdown', ...pathOfWisdomKeyboard });
            return;
        }
        
        userStateManager.setCurrentLevel(chatId, UserState.EBAN);
        
        const message = `🏠 *LEVEL 4: EBAN*
*"Protection and security within the home"*

Eban represents the security of the home - a safe haven where family is protected.

*In the Digital World:*
Our homes are connected to the internet. We must protect our families, especially children, from digital dangers.

*Choose a lesson:*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...ebanKeyboard });
        userStateManager.setState(chatId, UserState.EBAN);
    }

    async handleEbanControls(chatId) {
        const message = `👨‍👩‍👧‍👦 *PARENTAL CONTROLS SETUP*

*🛡️ Google Family Link (For Android):*

1. Download "Google Family Link" from Play Store
2. Create a family group
3. Link your child's device
4. Set screen time limits
5. Approve apps before download
6. See their location (optional)

*🛡️ YouTube Kids:*

1. Download "YouTube Kids" app
2. Select your child's age
3. Choose content settings:
   • Younger (ages 4 and under)
   • Older (ages 5-8)
   • Oldest (ages 9-12)
4. Set a parent password
5. Review watch history regularly

*🏠 EBAN WISDOM:*
Protect your digital home like you protect your physical home!

*Additional Tips:*
✅ Keep devices in common areas
✅ Talk to children about online safety
✅ Set rules for screen time
✅ Be involved in their online activities`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...ebanCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'eban');
        userStateManager.setState(chatId, UserState.EBAN_COMPLETE);
    }

    async handleEbanStrangers(chatId) {
        const message = `💬 *ONLINE STRANGERS CONVERSATION*

*The "Fence" Metaphor:*

*Parent:* "Imagine your phone is like a house with a fence around it. The fence keeps you safe."

*Child:* "Okay..."

*Parent:* "Strangers on the internet are like people you don't know who want to come into your fence. They might seem nice, but we don't let strangers in, right?"

*Child:* "Right!"

*Parent:* "If someone you don't know tries to talk to you online, that's them trying to climb over the fence. What do you do?"

*Child:* "Tell you!"

*Parent:* "Exactly! You come tell me or a grown-up, and we'll handle it together. That's being smart, not tattling."

---

*🏠 EBAN WISDOM:*
Build a digital fence around your family and teach your children to recognize when someone tries to cross it!

*Red Flags to Teach Kids:*
⚠️ Strangers wanting to chat privately
⚠️ Asking for photos
⚠️ Wanting to meet in person
⚠️ Giving gifts or money online
⚠️ Asking to keep secrets from parents`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...ebanCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'eban');
        userStateManager.setState(chatId, UserState.EBAN_COMPLETE);
    }

    async handleEbanReporting(chatId) {
        const message = `📢 *DIGITAL REPORTING CHANNELS*

*Where to Report Digital Problems in Ghana:*

**📱 Social Media Reporting:**
• Facebook: Settings → Report → Follow instructions
• Instagram: Report button on profile/content
• TikTok: Report button → Select reason
• WhatsApp: Block → Report

**🚨 For Serious Issues:**
• Ghana Police Service Cyber Unit: 0302-760381
• National Communications Authority: 0302-776100
• e-Crime Bureau: info@e-crimebureau.com

**🛡️ What to Report:**
• Online harassment
• Child exploitation
• Scams and fraud
• Identity theft
• Hate speech and bullying

*🏠 EBAN WISDOM:*
Protection within the home extends to the digital home. Know where to turn for help!

*Evidence to Save:*
📸 Screenshot the offense
📅 Note the date and time
👤 Save the username/profile
📞 Document any contact`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...ebanCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'eban');
        userStateManager.setState(chatId, UserState.EBAN_COMPLETE);
    }

    // ========== GYE NYAME (LEVEL 5) - GRAND MASTER ==========

    async handleGyeNyame(chatId) {
        // Check if all previous levels are complete
        if (!userStateManager.canAccessGyeNyame(chatId)) {
            const message = `🔒 *GYE NYAME IS LOCKED!*

*"One must look back to Sankofa and navigate the twists of Nkyinkyim before they can stand in the presence of Gye Nyame."*

*Your Progress:*
${userStateManager.isLevelCompleted(chatId, 'sankofa') ? '✅' : '⬜'} Sankofa - Digital Footprint
${userStateManager.isLevelCompleted(chatId, 'nkyinkyim') ? '✅' : '⬜'} Nkyinkyim - Fraud Detection
${userStateManager.isLevelCompleted(chatId, 'fawohodie') ? '✅' : '⬜'} Fawohodie - Digital Rights
${userStateManager.isLevelCompleted(chatId, 'eban') ? '✅' : '⬜'} Eban - Family Safety

*Complete all levels to unlock the Grand Master level!*`;

            await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...pathOfWisdomKeyboard });
            return;
        }
        
        userStateManager.setCurrentLevel(chatId, UserState.GYE_NYAME);
        
        const message = `👑 *LEVEL 5: GYE NYAME*
*"Except God - Digital Supremacy"*

🦅 *Sankofa* taught you about your digital footprint
🔄 *Nkyinkyim* taught you to detect fraud
🕊️ *Fawohodie* taught you about digital rights
🏠 *Eban* taught you to protect your family

Now you stand at the threshold of *Digital Supremacy*...

*The Philosophy:*
Gye Nyame represents the highest level of digital mastery - where you are no longer just a "user" of technology, but a master of your digital environment.

*What this means:*
🛡️ You fear no scam because you can spot one from afar
🛡️ You leave no reckless digital footprint
🛡️ You protect not just yourself, but your family
🛡️ You are a digital sovereign

*Are you ready for the final challenge?*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...gyeNyameKeyboard });
        userStateManager.setState(chatId, UserState.GYE_NYAME);
    }

    async handleGyeNyamePhilosophy(chatId) {
        const message = `👑 *THE GYE NYAME PHILOSOPHY*

*"Except God" - In the digital realm, you are your own protector.*

*What is Digital Sovereignty?*

It means taking complete control of your digital life:

🎯 **You control your data** - Not the apps, not the companies
🎯 **You control your identity** - Who you are online is your choice
🎯 **You control your security** - No one else will protect you better
🎯 **You control your legacy** - What you leave behind matters

*From the wisdom of our ancestors:*
Just as the Akan people believed that only Onyame (God) has ultimate power, in the digital world, we must recognize that we have ultimate power over our own digital destiny.

*But with great power comes great responsibility:*
👁️ Stay vigilant (Nkyinkyim)
📜 Know your rights (Fawohodie)
🏠 Protect your home (Eban)
🔙 Learn from the past (Sankofa)

*Gye Nyame is not the end - it's the beginning of being a digital protector for others!*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...gyeNyameKeyboard });
    }

    async handleGyeNyameChallenge(chatId) {
        const message = `🏆 *GRAND MASTER CHALLENGE*

*Test your knowledge from all levels!*

---

*SCENARIO:*
You receive a WhatsApp message from an unknown number:

"Hi! I'm Sarah, a friend of your cousin. She's in trouble and needs GHS 200 urgently. Please send to 055XXXXXXX. She's hospitalized and needs help fast!"

*What do you do?*

🧠 *Think about what you've learned:*
1. Sankofa - What would a careless response reveal about you?
2. Nkyinkyim - Does this smell like a scam? What are the red flags?
3. Fawohodie - What are your rights and responsibilities here?
4. Eban - How would you explain this to a family member?

*The Wise Response:*
1. ⏸️ STOP - Don't act immediately (Sankofa wisdom)
2. 🔍 VERIFY - Call your cousin directly or ask a family member (Nkyinkyim)
3. 🛡️ PROTECT - Don't send money to unknown numbers (Fawohodie)
4. 🏠 SHARE - Tell family members about this scam (Eban)

*Ready to complete your journey?*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...gyeNyameChallengeKeyboard });
        userStateManager.setState(chatId, UserState.GYE_NYAME_CHALLENGE);
    }

    async handleGyeNyameHelp(chatId) {
        const message = `❓ *GRAND MASTER CHALLENGE HELP*

*Hint: Think about each level's wisdom:*

🦅 **Sankofa** - Would posting/sending money carelessly create a bad digital footprint?

🔄 **Nkyinkyim** - This is a classic "emergency scam"! Red flags:
- Unknown number claiming to be a "friend"
- Urgency ("in trouble", "hospitalized")
- Requests for money via mobile money
- No way to verify the story

🕊️ **Fawohodie** - You have the right to verify before acting. No one can pressure you into quick decisions.

🏠 **Eban** - Share this knowledge with family! These scams often target vulnerable family members.

*The correct response:*
✅ Do NOT send money
✅ Do NOT engage further
✅ Verify by calling your cousin directly
✅ Report the number to your network
✅ Block the scammer

*Choose your action wisely...*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...gyeNyameChallengeKeyboard });
    }

    async handleGyeNyameComplete(chatId) {
        const message = `👑 *CORRECT!*

*You have demonstrated Digital Mastery!*

*Your response showed:*
✅ Sankofa wisdom - You didn't act recklessly
✅ Nkyinkyim wisdom - You spotted the scam red flags
✅ Fawohodie wisdom - You knew to verify before acting
✅ Eban wisdom - You'll protect your family from this

*You are now a DIGITAL GRAND MASTER!*

---

*🦅🔄🕊️🏠👑*

*SANKOFA → NKYINKYIM → FAWOHODIE → EBAN → GYE NYAME*

*You have completed the full Path of Wisdom!*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...gyeNyameCompleteKeyboard });
        userStateManager.completeLevel(chatId, 'gye_nyame');
        userStateManager.setState(chatId, UserState.GYE_NYAME_COMPLETE);
    }

    async handleGyeNyameCertificate(chatId) {
        const message = `🎉 *DIGITAL WISDOM CERTIFICATE*

╔══════════════════════════════════════╗
║                                      ║
║     🦅 🔄 🕊️ 🏠 👑 🦅 🔄 🕊️ 🏠     ║
║                                      ║
║     ADINKRA DIGITAL MENTOR          ║
║     CERTIFICATE OF MASTERY           ║
║                                      ║
║          ╭──────────────╮            ║
║          │   GYE NYAME  │            ║
║          ╰──────────────╯            ║
║                                      ║
║  This certifies that                ║
║                                      ║
║  YOU have successfully completed    ║
║  the Path of Wisdom:                ║
║                                      ║
║  ✅ Sankofa - Digital Footprint     ║
║  ✅ Nkyinkyim - Fraud Detection     ║
║  ✅ Fawohodie - Digital Rights      ║
║  ✅ Eban - Family Safety             ║
║  ✅ Gye Nyame - Digital Supremacy    ║
║                                      ║
║  ─────────────────────────────     ║
║  Heritage in the Digital Age         ║
║  Project                            ║
║                                      ║
╚══════════════════════════════════════╝

*🦅🔄🕊️🏠👑*

*You are now a Digital Grand Master!*

Share your wisdom with others. Protect your family. Stay vigilant.

*Type /start to begin again or /help for assistance.*`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...pathOfWisdomMenuKeyboard });
        userStateManager.setState(chatId, UserState.CERTIFIED);
    }

    // ========== LEGACY HANDLERS (Original Features) ==========

    async handleListen(chatId) {
        userStateManager.setState(chatId, UserState.LISTENING);
        
        const message = `🎧 *Listen to the Story*

Choose your language:`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...listenKeyboard });
    }

    async handleListenEnglish(chatId) {
        try {
            const audioPath = getAudioPath('clip_welcome_en.mp3');
            
            if (audioExists('clip_welcome_en.mp3')) {
                await this.bot.sendVoice(chatId, audioPath, {
                    caption: '🔊 Welcome! (English)',
                    parse_mode: 'Markdown'
                });
            } else {
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
            const audioPath = getAudioPath('clip_welcome_tw.mp3');
            
            if (audioExists('clip_welcome_tw.mp3')) {
                await this.bot.sendVoice(chatId, audioPath, {
                    caption: '🔊 Akwaaba! (Twi)',
                    parse_mode: 'Markdown'
                });
            } else {
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

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...pathOfWisdomMenuKeyboard });
    }

    async handleFAQ(chatId) {
        userStateManager.setState(chatId, 'faq');
        
        const message = `❓ *Frequently Asked Questions*

Learn more about staying safe online!

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
        
        const message = `❓ *${faq.question}*

*Answer:*
${faq.answer}

*Twi:*
${faq.twiAnswer}`;

        await this.bot.sendMessage(
            chatId, 
            message, 
            { parse_mode: 'Markdown', ...getFAQPaginationKeyboard(category, index, faqs.length) }
        );
    }

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
        
        try {
            const audioPath = getAudioPath('clip_quizCorrect_en.mp3');
            if (audioExists('clip_quizCorrect_en.mp3')) {
                await this.bot.sendVoice(chatId, audioPath);
            }
        } catch (e) {}
        
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

    async handlePasswordPrompt(chatId) {
        const message = `🔐 *Create a Strong Password*

Rules:
• At least 8 characters
• At least 1 number
• At least 1 symbol (!@#$%^&*)
• Uppercase & lowercase

Type your password below:`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        userStateManager.setState(chatId, UserState.PASSWORD);
    }

    async handlePasswordRetry(chatId) {
        const message = `🔐 *Try Again!*

Create a strong password with:
• At least 8 characters
• At least 1 number  
• At least 1 symbol
• Uppercase & lowercase

Type your password:`;

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
        const content = getTTSContent('congratulations');
        
        try {
            const audioPath = getAudioPath('clip_congratulations_en.mp3');
            if (audioExists('clip_congratulations_en.mp3')) {
                await this.bot.sendVoice(chatId, audioPath, {
                    caption: '🎉 Congratulations!'
                });
            }
        } catch (e) {}
        
        const message = `🎉 *CONGRATULATIONS!*

You have completed the Gye Nyame Digital Safety Module!

🏆 *You are now:*
Digital Protector – Gye Nyame Level 1

🛡️ *Remember:*
${content.english}

*Twia:* ${content.twi}

Type /start to begin again or /help for assistance.`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...pathOfWisdomMenuKeyboard });
    }
}
