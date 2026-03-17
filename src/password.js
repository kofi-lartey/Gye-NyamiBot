export const validatePassword = (password) => {
    const errors = [];
    
    if (!password || password.length < 8) {
        errors.push('Must be at least 8 characters');
    }
    
    if (!/\d/.test(password)) {
        errors.push('Must include at least one number');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Must include at least one symbol (!@#$%^&*)');
    }
    
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        errors.push('Must include both uppercase and lowercase letters');
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        strength: calculateStrength(password)
    };
};

const calculateStrength = (password) => {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/\d/.test(password)) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    
    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
};

export const passwordExamples = {
    weak: [
        'password',
        '12345678',
        'ghana2024',
        'qwerty'
    ],
    strong: [
        'Ghana@2024Protect!',
        'MyP@ssw0rd123',
        'Kofi&Secure99',
        'Abena2024!'
    ]
};

export const getPasswordMessage = (validation) => {
    if (validation.isValid) {
        return `✅ *Strong Password!*\n\nYour password meets all requirements:\n✓ At least 8 characters\n✓ Has numbers\n✓ Has symbols\n✓ Has uppercase & lowercase\n\n🏆 You are now a Digital Protector!`;
    }
    
    return `❌ *Weak Password*\n\nRequirements:\n${validation.errors.map(e => `• ${e}`).join('\n')}\n\nTry again!`;
};
