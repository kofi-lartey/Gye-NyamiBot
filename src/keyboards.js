import TelegramBot from 'node-telegram-bot-api';

export const mainKeyboard = [
    [
        { text: '🎧 Listen', callback_data: 'action_listen' },
        { text: '📖 Read', callback_data: 'action_read' }
    ],
    [
        { text: '🧠 Start Quiz', callback_data: 'action_quiz' }
    ]
];

export const quizKeyboard = [
    [
        { text: 'Click immediately', callback_data: 'quiz_wrong_1' },
        { text: 'Ignore and report', callback_data: 'quiz_correct_1' },
        { text: 'Forward to friends', callback_data: 'quiz_wrong_2' }
    ]
];

export const passwordKeyboard = [
    [
        { text: '✅ My password is strong', callback_data: 'password_check' },
        { text: '🔄 Try again', callback_data: 'password_retry' }
    ]
];

export const mainReplyKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: '🎧 Listen' }, { text: '📖 Read' }],
            [{ text: '🧠 Start Quiz' }],
            [{ text: '🔄 Reset' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
    }
};

export const createInlineKeyboard = (buttons) => {
    return {
        reply_markup: {
            inline_keyboard: buttons
        }
    };
};
