// Free Twi/English Text-to-Speech Service
// Uses gtts (Google TTS) - Free, no API key!

import gtts from 'gtts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { Readable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create audio directory
const AUDIO_DIR = path.join(__dirname, '../../audio');
if (!fs.existsSync(AUDIO_DIR)){
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

// Generate audio using gtts
const generateWithGtts = async (text, lang = 'en', filename) => {
    return new Promise((resolve, reject) => {
        try {
            const audioPath = path.join(AUDIO_DIR, filename);
            
            const speech = new gtts(text, lang);
            speech.save(audioPath, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(audioPath);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

// Alternative: Download directly from Google TTS
const downloadAudio = (text, lang = 'en') => {
    return new Promise((resolve, reject) => {
        const encodedText = encodeURIComponent(text);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodedText}&tl=${lang}`;
        
        const audioPath = path.join(AUDIO_DIR, `temp_${Date.now()}.mp3`);
        const file = fs.createWriteStream(audioPath);
        
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(audioPath);
            });
        }).on('error', (err) => {
            fs.unlink(audioPath, () => {});
            reject(err);
        });
    });
};

// Generate audio file and return path
export const generateAudio = async (text, lang = 'en', filename = null) => {
    try {
        if (!filename) {
            filename = `audio_${Date.now()}.mp3`;
        }
        
        // Try gtts first
        try {
            return await generateWithGtts(text, lang, filename);
        } catch (e) {
            // Fallback to direct download
            return await downloadAudio(text, lang);
        }
    } catch (error) {
        console.error('TTS Error:', error);
        return null;
    }
};

// Generate Twi/English audio for a message
export const generateLessonAudio = async (text, lang = 'en') => {
    const filename = `lesson_${lang}_${Date.now()}.mp3`;
    return await generateAudio(text, lang, filename);
};

// Pre-defined audio clips
export const AUDIO_CLIPS = {
    welcome: {
        en: "Welcome! Thank you! Welcome to Gye Nyame Digital Protection Module!",
        twi: "Akwaaba! Meda woase! Woakyɛ! Welcome to Gye Nyame Digital Protection Module!"
    },
    gyeNyame: {
        en: "Gye Nyame is an Akan symbol meaning Except God. It represents supreme protection.",
        twi: "Gye Nyame yɛ Akan symbol bi a ɛkyerɛ Gyen Nyame. Ɔno ne ahyeƐ a atwam wɔ nyansa nyinaa anam."
    },
    quizCorrect: {
        en: "Correct! You did well! Congratulations!",
        twi: "Daabi! Woayɛ no yie! Woaprom!"
    },
    quizWrong: {
        en: "Wrong! Be careful next time!",
        twi: "Mber! Ehia sɛ woganyan!"
    },
    congratulations: {
        en: "Congratulations! You have completed the module! Thank you!",
        twi: "Akwaaba woakyɛ! Woadwene sɛ woaprom! Asante!"
    },
    digitalSafety: {
        en: "Digital safety tip: Keep your password secret. Never share your PIN.",
        twi: "AhyeƐ a ɛwɔ intanƐ no ho: Ma Wo password yɛ pẽ. Mma mpɛson nnsa Wo PIN."
    }
};

// Generate all audio clips (call this once at startup)
export const generateAllAudioClips = async () => {
    console.log('🎧 Generating audio clips...');
    
    for (const [key, text] of Object.entries(AUDIO_CLIPS)) {
        // Generate English
        try {
            const enFile = `clip_${key}_en.mp3`;
            await generateAudio(text.en, 'en', enFile);
            console.log(`✅ Generated: ${key} (English)`);
        } catch (e) {
            console.log(`⚠️ Failed: ${key} (English)`);
        }
        
        // Generate Twi (using English voice as fallback)
        try {
            const twiFile = `clip_${key}_tw.mp3`;
            await generateAudio(text.twi, 'en', twiFile);
            console.log(`✅ Generated: ${key} (Twi)`);
        } catch (e) {
            console.log(`⚠️ Failed: ${key} (Twi)`);
        }
    }
    
    console.log('🎧 Audio clips generation complete!');
};

// Get audio file path
export const getAudioPath = (filename) => {
    return path.join(AUDIO_DIR, filename);
};

// Check if audio file exists
export const audioExists = (filename) => {
    return fs.existsSync(path.join(AUDIO_DIR, filename));
};

export default {
    generateAudio,
    generateLessonAudio,
    generateAllAudioClips,
    getAudioPath,
    audioExists,
    AUDIO_CLIPS
};

// Twi text for display (non-audio)
export const twiPhrases = {
    welcome: {
        twi: 'Akwaaba! Meda woaseɛ!',
        english: 'Welcome! Thank you very much!'
    },
    gyeNyame: {
        twi: 'Gye Nyame yɛ Akan symbol bi a ɛkyerɛ "Gyen Nyame" - Onyankopɔn nko na Ɛma ahyeƐ.',
        english: 'Gye Nyame is an Akan symbol meaning "Except God" - only God gives true protection.'
    },
    digitalSafety: {
        twi: 'AhyeƐ a ɛwɔ intanƐ no ho: ma Wo password yɛ pẽ. Mma mpɛson nnsa Wo PIN.',
        english: 'Digital safety tip: keep your password secret. Never share your PIN.'
    },
    quizCorrect: {
        twi: 'Daabi! Woayɛ no yie!',
        english: 'Correct! You did well!'
    },
    quizWrong: {
        twi: 'Mber! Ehia sɛ woganyan!',
        english: 'Wrong! You need to learn more!'
    },
    strongPassword: {
        twi: 'Wo password no yɛ den!',
        english: 'Your password is strong!'
    },
    weakPassword: {
        twi: 'Wo password no yɛ awk!',
        english: 'Your password is weak!'
    },
    congratulations: {
        twi: 'Akwaaba woakyɛ! Woadwene sɛ woaprom! Asante!',
        english: 'Congratulations! You have completed the module! Thank you!'
    }
};

export const getTTSContent = (type) => {
    return twiPhrases[type] || twiPhrases.welcome;
};
