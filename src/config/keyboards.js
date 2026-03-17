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

export const getQuizKeyboard = () => quizKeyboard;

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
