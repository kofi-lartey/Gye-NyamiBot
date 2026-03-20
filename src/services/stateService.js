export const UserState = {
    START: 'start',
    MENU: 'menu',
    LISTENING: 'listening',
    READING: 'reading',
    QUIZ: 'quiz',
    PASSWORD: 'password',
    CERTIFIED: 'certified',
    // Path of Wisdom Levels
    PATH_WISDOM: 'path_wisdom',
    SANCOFA: 'sankofa',           // Level 1: Digital Footprint
    SANCOFA_POST: 'sankofa_post', // User drafts post
    SANCOFA_REVEAL: 'sankofa_reveal', // 5-year reveal
    SANCOFA_COMPLETE: 'sankofa_complete',
    NKYINKYIM: 'nkyinkyim',       // Level 2: Fraud Detection
    NKYINKYIM_SCENARIO: 'nkyinkyim_scenario',
    NKYINKYIM_COMPLETE: 'nkyinkyim_complete',
    FAWOHODIE: 'fawohodie',       // Level 3: Digital Rights
    FAWOHODIE_COMPLETE: 'fawohodie_complete',
    EBAN: 'eban',                 // Level 4: Family Safety
    EBAN_COMPLETE: 'eban_complete',
    GYE_NYAME: 'gye_nyame',       // Level 5: Grand Master
    GYE_NYAME_CHALLENGE: 'gye_nyame_challenge',
    GYE_NYAME_COMPLETE: 'gye_nyame_complete'
};

export const LevelOrder = [
    UserState.SANCOFA,
    UserState.NKYINKYIM,
    UserState.FAWOHODIE,
    UserState.EBAN,
    UserState.GYE_NYAME
];

export const LevelNames = {
    [UserState.SANCOFA]: 'Sankofa - Digital Footprint',
    [UserState.NKYINKYIM]: 'Nkyinkyim - Fraud Detection',
    [UserState.FAWOHODIE]: 'Fawohodie - Digital Rights',
    [UserState.EBAN]: 'Eban - Family Safety',
    [UserState.GYE_NYAME]: 'Gye Nyame - Grand Master'
};

export const LevelSymbols = {
    [UserState.SANCOFA]: '🦅 Sankofa - "Learn from the past to build the future"',
    [UserState.NKYINKYIM]: '🔄 Nkyinkyim - "Navigating life\'s complexities with alertness"',
    [UserState.FAWOHODIE]: '🕊️ Fawohodie - "With freedom comes responsibility"',
    [UserState.EBAN]: '🏠 Eban - "Protection and security within the home"',
    [UserState.GYE_NYAME]: '👑 Gye Nyame - "Except God - Digital Supremacy"'
};

class UserStateManager {
    constructor() {
        this.states = new Map();
        this.scores = new Map();
        this.passwords = new Map();
        this.currentQuestions = new Map();
        // New: Level progression tracking
        this.completedLevels = new Map();
        this.currentLevel = new Map();
        this.moduleData = new Map();
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

    // Level Progression Methods
    getCurrentLevel(chatId) {
        return this.currentLevel.get(chatId) || UserState.SANCOFA;
    }

    setCurrentLevel(chatId, level) {
        this.currentLevel.set(chatId, level);
    }

    getCompletedLevels(chatId) {
        return this.completedLevels.get(chatId) || [];
    }

    completeLevel(chatId, level) {
        const completed = this.getCompletedLevels(chatId);
        if (!completed.includes(level)) {
            completed.push(level);
            this.completedLevels.set(chatId, completed);
        }
    }

    isLevelCompleted(chatId, level) {
        const completed = this.getCompletedLevels(chatId);
        return completed.includes(level);
    }

    canAccessGyeNyame(chatId) {
        const completed = this.getCompletedLevels(chatId);
        return (
            completed.includes(UserState.SANCOFA) &&
            completed.includes(UserState.NKYINKYIM) &&
            completed.includes(UserState.FAWOHODIE) &&
            completed.includes(UserState.EBAN)
        );
    }

    getNextLevel(chatId) {
        const current = this.getCurrentLevel(chatId);
        const currentIndex = LevelOrder.indexOf(current);
        
        if (currentIndex === -1 || currentIndex >= LevelOrder.length - 1) {
            return null; // No more levels
        }
        
        return LevelOrder[currentIndex + 1];
    }

    setModuleData(chatId, key, value) {
        const data = this.moduleData.get(chatId) || {};
        data[key] = value;
        this.moduleData.set(chatId, data);
    }

    getModuleData(chatId, key) {
        const data = this.moduleData.get(chatId) || {};
        return data[key];
    }

    reset(chatId) {
        this.states.set(chatId, UserState.START);
        this.scores.set(chatId, 0);
        this.passwords.delete(chatId);
        this.currentQuestions.delete(chatId);
        // Reset level progression
        this.completedLevels.set(chatId, []);
        this.currentLevel.set(chatId, UserState.SANCOFA);
        this.moduleData.delete(chatId);
    }

    getUserData(chatId) {
        return {
            state: this.getState(chatId),
            score: this.getScore(chatId),
            password: this.getPassword(chatId),
            certified: this.isCertified(chatId),
            currentLevel: this.getCurrentLevel(chatId),
            completedLevels: this.getCompletedLevels(chatId),
            canAccessGyeNyame: this.canAccessGyeNyame(chatId)
        };
    }
}

export const userStateManager = new UserStateManager();
