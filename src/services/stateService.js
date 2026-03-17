export const UserState = {
    START: 'start',
    MENU: 'menu',
    LISTENING: 'listening',
    READING: 'reading',
    QUIZ: 'quiz',
    PASSWORD: 'password',
    CERTIFIED: 'certified'
};

class UserStateManager {
    constructor() {
        this.states = new Map();
        this.scores = new Map();
        this.passwords = new Map();
        this.currentQuestions = new Map();
    }

    getState(chatId) {
        return this.states.get(chatId) || UserState.START;
    }

    setState(chatId, state) {
        this.states.set(chatId, state);
    }

    getScore(chatId) {
        return this.scores.get(chatId) || 0;
    }

    incrementScore(chatId) {
        const current = this.scores.get(chatId) || 0;
        this.scores.set(chatId, current + 1);
        return this.getScore(chatId);
    }

    setCurrentQuestion(chatId, questionId) {
        this.currentQuestions.set(chatId, questionId);
    }

    getCurrentQuestion(chatId) {
        return this.currentQuestions.get(chatId) || 1;
    }

    setPassword(chatId, password) {
        this.passwords.set(chatId, password);
    }

    getPassword(chatId) {
        return this.passwords.get(chatId);
    }

    isCertified(chatId) {
        return this.getState(chatId) === UserState.CERTIFIED;
    }

    reset(chatId) {
        this.states.set(chatId, UserState.START);
        this.scores.set(chatId, 0);
        this.passwords.delete(chatId);
        this.currentQuestions.delete(chatId);
    }

    getUserData(chatId) {
        return {
            state: this.getState(chatId),
            score: this.getScore(chatId),
            password: this.getPassword(chatId),
            certified: this.isCertified(chatId)
        };
    }
}

export const userStateManager = new UserStateManager();
