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
    },
    {
        id: 2,
        question: "A stranger on Facebook messages you: 'Congratulations! You've won $10,000! Send your bank details to receive the money.'\n\nWhat do you do?",
        options: [
            { text: 'Send bank details', correct: false },
            { text: 'Delete and block', correct: true },
            { text: 'Share with friends', correct: false }
        ],
        correctAnswer: 'Delete and block',
        explanation: '✅ Correct! This is a classic scam. Never share bank details with strangers online!'
    },
    {
        id: 3,
        question: "You're using public WiFi at a café. What should you do?",
        options: [
            { text: 'Check bank account', correct: false },
            { text: 'Use VPN or wait', correct: true },
            { text: 'Share passwords', correct: false }
        ],
        correctAnswer: 'Use VPN or wait',
        explanation: '✅ Correct! Public WiFi is not secure. Wait for home network or use a VPN!'
    },
    {
        id: 4,
        question: "Your friend sends you a link: 'Click here to see who viewed your profile!' What do you do?",
        options: [
            { text: 'Click the link', correct: false },
            { text: 'Ignore it', correct: true },
            { text: 'Send to everyone', correct: false }
        ],
        correctAnswer: 'Ignore it',
        explanation: '✅ Correct! These are fake apps that steal your data. Social media apps do NOT show who viewed your profile!'
    },
    {
        id: 5,
        question: "Someone calls saying they're from your bank: 'We need to verify your account. Give us your PIN.' What do you do?",
        options: [
            { text: 'Give the PIN', correct: false },
            { text: 'Hang up and call bank', correct: true },
            { text: 'Give half', correct: false }
        ],
        correctAnswer: 'Hang up and call bank',
        explanation: '✅ Correct! Banks NEVER ask for your PIN over the phone. Hang up and call the official number!'
    },
    {
        id: 6,
        question: "What's the strongest password?",
        options: [
            { text: '123456', correct: false },
            { text: 'MyName123', correct: false },
            { text: 'GyeNyame@2024!', correct: true }
        ],
        correctAnswer: 'GyeNyame@2024!',
        explanation: '✅ Correct! Use mix of uppercase, lowercase, numbers, and symbols. At least 8 characters!'
    },
    {
        id: 7,
        question: "You find a USB drive in the parking lot. What do you do?",
        options: [
            { text: 'Plug it in to find owner', correct: false },
            { text: 'Leave it or give to security', correct: true },
            { text: 'Take it home', correct: false }
        ],
        correctAnswer: 'Leave it or give to security',
        explanation: '✅ Correct! Unknown USB drives can contain viruses or malware. Never plug in found devices!'
    },
    {
        id: 8,
        question: "A website asks: 'Allow notifications from this site?' What do you do?",
        options: [
            { text: 'Always allow', correct: false },
            { text: 'Block or deny', correct: true },
            { text: 'Allow all', correct: false }
        ],
        correctAnswer: 'Block or deny',
        explanation: '✅ Correct! Unwanted notifications can be annoying and sometimes malicious. Only allow from trusted sites!'
    },
    {
        id: 9,
        question: "Your phone shows a pop-up: 'Virus detected! Download now!' What do you do?",
        options: [
            { text: 'Download immediately', correct: false },
            { text: 'Close and ignore', correct: true },
            { text: 'Call the number', correct: false }
        ],
        correctAnswer: 'Close and ignore',
        explanation: '✅ Correct! These are FAKE alerts. Close the pop-up and run a real antivirus if concerned!'
    },
    {
        id: 10,
        question: "What's the safest way to shop online?",
        options: [
            { text: 'Use any website', correct: false },
            { text: 'Check for HTTPS lock', correct: true },
            { text: 'Share card PIN', correct: false }
        ],
        correctAnswer: 'Check for HTTPS lock',
        explanation: '✅ Correct! Look for 🔒 and HTTPS in the URL. Only shop on trusted, secure websites!'
    }
];

export const getQuizQuestion = (questionId = 1) => {
    return quizQuestions.find(q => q.id === questionId) || quizQuestions[0];
};

export const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    return quizQuestions[randomIndex];
};

export const getNextQuestion = (currentId) => {
    const currentIndex = quizQuestions.findIndex(q => q.id === currentId);
    const nextIndex = (currentIndex + 1) % quizQuestions.length;
    return quizQuestions[nextIndex];
};

export const getTotalQuestions = () => quizQuestions.length;

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

export const checkAnswer = (questionId, answerIndex) => {
    const question = getQuizQuestion(questionId);
    const selectedOption = question.options[answerIndex];
    return selectedOption ? selectedOption.correct : false;
};

export const getQuizKeyboard = (questionId = 1) => {
    const question = getQuizQuestion(questionId);
    return {
        reply_markup: {
            inline_keyboard: question.options.map((opt, idx) => [
                { text: opt.text, callback_data: `quiz_${questionId}_${idx}` }
            ])
        }
    };
};

export const getAllQuestions = () => quizQuestions;
