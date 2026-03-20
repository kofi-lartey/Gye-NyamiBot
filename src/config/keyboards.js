export const mainKeyboard = [
    [
        { text: '🎧 Listen', callback_data: 'action_listen' },
        { text: '📖 Read', callback_data: 'action_read' }
    ],
    [
        { text: '🧠 Start Quiz', callback_data: 'action_quiz' }
    ]
];

export const mainReplyKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: '🎧 Listen' }, { text: '📖 Read' }],
            [{ text: '🧠 Start Quiz' }],
            [{ text: '❓ FAQ' }, { text: '🔄 Reset' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
    }
};

export const listenKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔊 Listen in English', callback_data: 'listen_english' }],
            [{ text: '🇬🇭 Listen in Twi', callback_data: 'listen_twi' }],
            [{ text: '⬅️ Back to Menu', callback_data: 'action_back' }]
        ]
    }
};

export const quizKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'Click immediately', callback_data: 'quiz_answer_0' },
                { text: 'Ignore and report', callback_data: 'quiz_answer_1' },
                { text: 'Forward to friends', callback_data: 'quiz_answer_2' }
            ]
        ]
    }
};

export const passwordKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '✅ My password is strong', callback_data: 'password_check' }],
            [{ text: '🔄 Try again', callback_data: 'password_retry' }]
        ]
    }
};

export const faqCategoriesKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🛡️ Digital Safety Tips', callback_data: 'faq_digital_safety' }],
            [{ text: '⚠️ Common Scams', callback_data: 'faq_scams' }],
            [{ text: '📱 Social Media Safety', callback_data: 'faq_social_media' }],
            [{ text: '💰 Mobile Banking', callback_data: 'faq_mobile_banking' }],
            [{ text: '⬅️ Back to Menu', callback_data: 'action_back' }]
        ]
    }
};

export const createInlineKeyboard = (buttons) => {
    return {
        reply_markup: {
            inline_keyboard: buttons
        }
    };
};

export const getFAQPaginationKeyboard = (category, currentIndex, total) => {
    const buttons = [];
    
    if (currentIndex > 0) {
        buttons.push({ text: '⬅️ Previous', callback_data: `faq_prev_${category}_${currentIndex}` });
    }
    
    if (currentIndex < total - 1) {
        buttons.push({ text: 'Next ➡️', callback_data: `faq_next_${category}_${currentIndex}` });
    }
    
    buttons.push({ text: '⬅️ Back to FAQ', callback_data: 'action_faq' });
    
    return {
        reply_markup: {
            inline_keyboard: [buttons]
        }
    };
};

// ========== PATH OF WISDOM KEYBOARDS ==========

// Main menu with Path of Wisdom option
export const pathOfWisdomMenuKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: '🦅 Path of Wisdom' }],
            [{ text: '🎧 Listen' }, { text: '📖 Read' }],
            [{ text: '🧠 Start Quiz' }],
            [{ text: '❓ FAQ' }, { text: '🔄 Reset' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
    }
};

// Level selection keyboard
export const pathOfWisdomKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🦅 Level 1: Sankofa', callback_data: 'level_sankofa' }],
            [{ text: '🔄 Level 2: Nkyinkyim', callback_data: 'level_nkyinkyim' }],
            [{ text: '🕊️ Level 3: Fawohodie', callback_data: 'level_fawohodie' }],
            [{ text: '🏠 Level 4: Eban', callback_data: 'level_eban' }],
            [{ text: '👑 Level 5: Gye Nyame', callback_data: 'level_gye_nyame' }],
            [{ text: '⬅️ Back to Menu', callback_data: 'action_back' }]
        ]
    }
};

// Sankofa module keyboards
export const sankofaKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '✍️ Draft My Post', callback_data: 'sankofa_draft' }],
            [{ text: 'ℹ️ What is Sankofa?', callback_data: 'sankofa_info' }],
            [{ text: '⬅️ Back to Levels', callback_data: 'action_path_menu' }]
        ]
    }
};

export const sankofaPostKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '✅ Post It', callback_data: 'sankofa_post' }],
            [{ text: '✏️ Rewrite', callback_data: 'sankofa_draft' }],
            [{ text: '🗑️ Discard', callback_data: 'action_path_menu' }]
        ]
    }
};

export const sankofaCompleteKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '➡️ Next Level: Nkyinkyim', callback_data: 'level_nkyinkyim' }],
            [{ text: '🏠 Back to Menu', callback_data: 'action_menu' }]
        ]
    }
};

// Nkyinkyim module keyboards
export const nkyinkyimKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📱 MoMo Scam Scenario', callback_data: 'nkyinkyim_momo' }],
            [{ text: '🔗 Link Checker Game', callback_data: 'nkyinkyim_links' }],
            [{ text: '🛒 Fake Vendor Guide', callback_data: 'nkyinkyim_vendor' }],
            [{ text: '⬅️ Back to Levels', callback_data: 'action_path_menu' }]
        ]
    }
};

export const nkyinkyimScenarioKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📞 Call the number', callback_data: 'nkyinkyim_answer_wrong' }],
            [{ text: '🚫 Ignore and block', callback_data: 'nkyinkyim_answer_correct' }],
            [{ text: '💰 Send money back', callback_data: 'nkyinkyim_answer_wrong2' }]
        ]
    }
};

export const nkyinkyimLinksKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔗 bit.ly/momo-win', callback_data: 'nkyinkyim_link_wrong' }],
            [{ text: '🔗 google.com/safety', callback_data: 'nkyinkyim_link_correct' }],
            [{ text: '🔗 whatsapp-secure-login.net', callback_data: 'nkyinkyim_link_wrong2' }]
        ]
    }
};

export const nkyinkyimCompleteKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '➡️ Next Level: Fawohodie', callback_data: 'level_fawohodie' }],
            [{ text: '🏠 Back to Menu', callback_data: 'action_menu' }]
        ]
    }
};

// Fawohodie module keyboards
export const fawohodieKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📜 Terms & Conditions', callback_data: 'fawohodie_terms' }],
            [{ text: '🔐 2FA Setup Guide', callback_data: 'fawohodie_2fa' }],
            [{ text: '✅ Fact-Check Protocol', callback_data: 'fawohodie_factcheck' }],
            [{ text: '⬅️ Back to Levels', callback_data: 'action_path_menu' }]
        ]
    }
};

export const fawohodieCompleteKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '➡️ Next Level: Eban', callback_data: 'level_eban' }],
            [{ text: '🏠 Back to Menu', callback_data: 'action_menu' }]
        ]
    }
};

// Eban module keyboards
export const ebanKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '👨‍👩‍👧‍👦 Parental Controls', callback_data: 'eban_controls' }],
            [{ text: '💬 Online Strangers Chat', callback_data: 'eban_strangers' }],
            [{ text: '📢 Reporting Channels', callback_data: 'eban_reporting' }],
            [{ text: '⬅️ Back to Levels', callback_data: 'action_path_menu' }]
        ]
    }
};

export const ebanCompleteKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '👑 Proceed to Gye Nyame', callback_data: 'level_gye_nyame' }],
            [{ text: '🏠 Back to Menu', callback_data: 'action_menu' }]
        ]
    }
};

// Gye Nyame Grand Master keyboards
export const gyeNyameKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🏆 Take Grand Master Challenge', callback_data: 'gye_nyame_challenge' }],
            [{ text: '📜 View Philosophy', callback_data: 'gye_nyame_philosophy' }],
            [{ text: '⬅️ Back to Levels', callback_data: 'action_path_menu' }]
        ]
    }
};

export const gyeNyameChallengeKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '✅ Complete Challenge', callback_data: 'gye_nyame_complete' }],
            [{ text: '❓ Need Help', callback_data: 'gye_nyame_help' }]
        ]
    }
};

export const gyeNyameCompleteKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🎉 Get My Certificate', callback_data: 'gye_nyame_certificate' }],
            [{ text: '🔄 Start Over', callback_data: 'action_reset' }]
        ]
    }
};

// Utility function to get level keyboard with completion status
export const getPathOfWisdomKeyboard = (completedLevels = []) => {
    const buttons = [];
    
    // Level 1: Sankofa
    const sankofaStatus = completedLevels.includes('sankofa') ? ' ✅' : '';
    buttons.push([{ text: `🦅 Level 1: Sankofa${sankofaStatus}`, callback_data: 'level_sankofa' }]);
    
    // Level 2: Nkyinkyim
    const nkyinkyimStatus = completedLevels.includes('nkyinkyim') ? ' ✅' : '';
    buttons.push([{ text: `🔄 Level 2: Nkyinkyim${nkyinkyimStatus}`, callback_data: 'level_nkyinkyim' }]);
    
    // Level 3: Fawohodie
    const fawohodieStatus = completedLevels.includes('fawohodie') ? ' ✅' : '';
    buttons.push([{ text: `🕊️ Level 3: Fawohodie${fawohodieStatus}`, callback_data: 'level_fawohodie' }]);
    
    // Level 4: Eban
    const ebanStatus = completedLevels.includes('eban') ? ' ✅' : '';
    buttons.push([{ text: `🏠 Level 4: Eban${ebanStatus}`, callback_data: 'level_eban' }]);
    
    // Level 5: Gye Nyame
    const gyeNyameStatus = completedLevels.includes('gye_nyame') ? ' 👑' : '';
    buttons.push([{ text: `👑 Level 5: Gye Nyame${gyeNyameStatus}`, callback_data: 'level_gye_nyame' }]);
    
    buttons.push([{ text: '⬅️ Back to Menu', callback_data: 'action_back' }]);
    
    return {
        reply_markup: {
            inline_keyboard: buttons
        }
    };
};
