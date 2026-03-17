const quizQuestions = [
    {
        id: 1,
        question: "You receive a message: 'Your mobile money account is blocked. Click this link.'\n\nWhat do you do?",
        options: [
            { text: 'Click immediately', correct: false },
            { text: 'Ignore and report', correct: true },
            { text: 'Forward to friends', correct: false }
        ],
        correctAnswer: 'Ignore and report',
        explanation: '✅ Correct! Never click unknown links. Real MTN/vodafone will never ask you to click links via SMS!'
    }
];

export const getQuizQuestion = (questionId = 1) => {
    return quizQuestions.find(q => q.id === questionId) || quizQuestions[0];
};

export const handleQuizAnswer = (questionId, answerIndex) => {
    const question = getQuizQuestion(questionId);
    const selectedOption = question.options[answerIndex];
    
    if (selectedOption && selectedOption.correct) {
        return {
            correct: true,
            explanation: question.explanation
        };
    }
    
    return {
        correct: false,
        explanation: '❌ Be careful! Never trust unknown links. Report suspicious messages!'
    };
};

export const getQuizKeyboard = () => {
    return {
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
};

export const getAllQuestions = () => quizQuestions;
