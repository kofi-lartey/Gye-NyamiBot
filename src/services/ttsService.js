// Free Twi Text-to-Speech Service
// Uses Microsoft Edge TTS (free, no API key needed)

import https from 'https';

// Language codes
export const LanguageCodes = {
    TWI: 'ak-GH',
    EN: 'en-US'
};

// Free TTS using Microsoft Edge (no API key required)
export const synthesizeSpeech = async (text, language = 'en-US') => {
    return new Promise((resolve, reject) => {
        const encodedText = encodeURIComponent(text);
        
        // Microsoft Edge TTS endpoint (free)
        const url = `https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voice/v1?TrustedClientToken=56A4A1D2-1E61-4466-9935-86A2811B3E2B&DeploymentId=4c5626b1-66b4-4e98-af3a-52b28cf11a8c&Provider=Microsoft&VoiceAgent=read&MessageId=[uuid]&Text=${encodedText}&TextType=full&SessionId=[uuid]&Opcode=opus-128&Format=audio-24khz-48kbitrate-mono-mp3`;
        
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'audio/mp3',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };

        const req = https.request(url, options, (res) => {
            if (res.statusCode !== 200) {
                // Fallback: return text for display instead
                resolve({ 
                    text, 
                    error: null,
                    fallback: true 
                });
                return;
            }

            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const audioBuffer = Buffer.concat(chunks);
                resolve({
                    audioContent: audioBuffer,
                    text: text,
                    fallback: false
                });
            });
        });

        req.on('error', (error) => {
            resolve({ 
                text, 
                error: error.message,
                fallback: true 
            });
        });

        req.end();
    });
};

// Alternative: Web Speech API for PWA/Web version
export const getWebSpeechScript = (text, language = 'en-GB') => {
    return `
<script>
    function speakText(lang = '${language}') {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('${text.replace(/'/g, "\\'")}');
            utterance.lang = lang;
            utterance.rate = 0.9;
            utterance.pitch = 0;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
        } else {
            alert('Speech synthesis not supported in this browser');
        }
    }
    
    function stopSpeaking() {
        speechSynthesis.cancel();
    }
</script>`;
};

// Pre-recorded Twi phrases (phonetic representation for display)
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

// Get content for audio
export const getTTSContent = (type) => {
    return twiPhrases[type] || twiPhrases.welcome;
};

// Get lesson audio content
export const getLessonAudioContent = {
    gyeNyame: twiPhrases.gyeNyame,
    digitalSafety: twiPhrases.digitalSafety,
    welcome: twiPhrases.welcome,
    congratulations: twiPhrases.congratulations
};

export default {
    LanguageCodes,
    synthesizeSpeech,
    getWebSpeechScript,
    twiPhrases,
    getTTSContent,
    getLessonAudioContent
};
