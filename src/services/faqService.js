export const faqCategories = {
    DIGITAL_SAFETY: 'digital_safety',
    SCAMS: 'scams',
    SOCIAL_MEDIA: 'social_media',
    MOBILE_BANKING: 'mobile_banking'
};

export const faqData = {
    [faqCategories.DIGITAL_SAFETY]: [
        {
            id: 'ds1',
            question: 'What is digital safety?',
            answer: 'Digital safety means protecting yourself and your information when using the internet, phones, and other digital devices. Just like you lock your door at home, you need to protect your digital life too!',
            twiAnswer: 'AhyeƐ a ɛwɔ intanƐ no ne kwan a wode bo abɔ Wo haw a ɛwɔ intanƐ no mu. Sɛ wode kwan bi to Wo fie no, enti ɛno nko ara na wobetumi aka Wo ahyeƐ a ɛwɔ intanƐ no mu.'
        },
        {
            id: 'ds2',
            question: 'Why is digital safety important in Ghana?',
            answer: 'More Ghanaians are using mobile money and the internet every day. Scammers know this and try to trick people. By learning digital safety, you protect your money and personal information!',
            twiAnswer: 'Ɛnyɛ Ghanafo no awo wo daa intanƐ ne mobile money no. Mugufo no te sɛ wo awo no ma wo haw. Sɛ woreko sikasɛm a, ɛbo Wo ahyeƐ!'
        },
        {
            id: 'ds3',
            question: 'What are the basic digital safety rules?',
            answer: '1. Keep your passwords secret\n2. Think before clicking links\n3. Never share your PIN with anyone\n4. Only download apps from official stores\n5. Update your phone regularly',
            twiAnswer: '1. Ma Wo password yɛ pẽ\n2. Gyina mu ansa na wo click link bi\n3. Mma mpɛson nnsa Wo PIN koraa\n4. Sika app fika a ɛwɔ official store no mu wɔadownload\n5. Hu mobile Wo daa'
        },
        {
            id: 'ds4',
            question: 'How do I know if a website is safe?',
            answer: 'Look for "https://" at the beginning of the website address. Also look for a lock icon 🔒. If these are missing, be careful!',
            twiAnswer: 'Hwɛ "https://" a ɛwɔ website address no anim. Hwɛ ook lock icon no. Sɛ wo hwee nkotua yi, ɛson!'
        },
        {
            id: 'ds5',
            question: 'What should I do if I think I was scammed?',
            answer: '1. Contact your bank or mobile money provider immediately\n2. Change your passwords\n3. Report to the police\n4. Tell your family and friends so they dont get scammed too',
            twiAnswer: '1. Kɔ bu bank anaa mobile money provider no fo\n2. Change Wo password fii\n3. Kɔ ko police no ho hwee\n4. Ka kyerɛ Wo mfuofo ne wo nuafo sɛ mma woannohu no'
        }
    ],
    [faqCategories.SCAMS]: [
        {
            id: 'sc1',
            question: 'What is a scam?',
            answer: 'A scam is when someone tries to trick you into giving them money or personal information by lying or making false promises.',
            twiAnswer: 'Mugu no ne ogya a obi de ahone bo wo sɛ wode sika anaa wo ahofadi no ma no.'
        },
        {
            id: 'sc2',
            question: 'What are common scams in Ghana?',
            answer: 'Common scams include:\n• "You won lottery" messages\n• Fake MTN/Vodafone messages asking for PINs\n• Romance scams on social media\n• Fake job offers\n• WhatsApp lottery scams',
            twiAnswer: 'Mugu a ɛda woammu Ghana mu:\n• "Woayɛ lottery" messages\n• MTN/Vodafone anom messages a ɛka Wo PIN\n• Romance scams wɔ social media mu\n• Fake job offers\n• WhatsApp lottery scams'
        },
        {
            id: 'sc3',
            question: 'How do I spot a scam message?',
            answer: 'Look for these warning signs:\n• Claims you won money you didnt enter\n• Asks for your PIN or password\n• Has spelling mistakes\n• Creates urgency ("Act now!")\n• Too good to be true',
            twiAnswer: 'Hwɛ nhwehwɛmu yi:\n• Ɛka sɛ woayɛ lottery a wonni\n• Ɛka Wo PIN anaa password\n• Wɔatwerɛ hwee\n• Ɛhyeɛ wo ("Yɛ ete!")\n• Ɛyɛ pii paa'
        },
        {
            id: 'sc4',
            question: 'What is the "Mum scamming" trend?',
            answer: 'This is when scammers pretend to be your family member in distress, asking for urgent money transfers. Always verify by calling them directly!',
            twiAnswer: 'Eyi ne ogya a mugufo no hwɛ sɛ wo family bi a ɛwɔ ahwe mu, ɛka sɛ wode sika ma. Ɛho hia sɛ wo frɛ wɔn ansa!'
        },
        {
            id: 'sc5',
            question: 'Can scammers hack my phone by just clicking a link?',
            answer: 'Yes! Clicking malicious links can install viruses or steal your information. Never click links from unknown numbers!',
            twiAnswer: 'Enya! Clicking mugu links betumi de virus ba anaa ɛfa Wo information no. Mma click link bi firi numbers a wontiw!'
        },
        {
            id: 'sc6',
            question: 'What is SIM swapping?',
            answer: 'SIM swapping is when a scammer tricks your mobile network into transferring your number to their SIM card. They can then access your bank accounts!',
            twiAnswer: 'SIM swapping ne ogya a mugufo no bu Wo network fo sɛ wode Wo number tranfer to Wo SIM card. Ɛno na wobetumi aka Wo bank account!'
        },
        {
            id: 'sc7',
            question: 'How do I protect myself from mobile money scams?',
            answer: '1. Never share your PIN with anyone\n2. MTN and Vodafone will NEVER ask for your PIN\n3. Verify all transactions\n4. Use your own phone for transactions\n5. Check your balance regularly',
            twiAnswer: '1. Mma mpɛson nnsa Wo PIN\n2. MTN ne Vodafone rensaanhwɛ Wo PIN\n3. Verify mmara nyinaa\n4. Use Wo phone ankasa ma mmara\n5. Check Wo balance daa'
        }
    ],
    [faqCategories.SOCIAL_MEDIA]: [
        {
            id: 'sm1',
            question: 'What information should I NOT share on social media?',
            answer: 'Never share:\n• Your home address\n• Phone number\n• Bank details\n• ID card numbers\n• Your daily routine\n• Photos of your children',
            twiAnswer: 'Mma kyerɛ:\n• Wo fie address\n• Phone number\n• Bank details\n• ID card number\n• Wo daa routine\n• Wo ba no foto'
        },
        {
            id: 'sm2',
            question: 'How do I make my social media accounts private?',
            answer: 'Go to Settings > Privacy on Facebook, Instagram, WhatsApp, etc. Set your account to "Private" so only friends can see your posts.',
            twiAnswer: 'Kɔ Settings > Privacy wɔ Facebook, Instagram, WhatsApp mu. Ma Wo account yɛ "Private" sɛ mfuofo ankasa na wobetumi hwe Wo posts.'
        },
        {
            id: 'sm3',
            question: 'Is it safe to use public WiFi?',
            answer: 'Be careful! Public WiFi can be hacked. Avoid banking or entering passwords when using public WiFi. Wait until you are on your own data.',
            twiAnswer: 'Hwɛ! Public WiFi betumi awohwe. Mma kɔ bank anaa wo password wɔ public WiFi mu. Te wɔ Wo data.'
        },
        {
            id: 'sm4',
            question: 'What is phishing on social media?',
            answer: 'Phishing is when scammers create fake login pages that look real. They try to steal your username and password. Always check the URL!',
            twiAnswer: 'Phishing ne ogya a mugufo no siesie fake login pages a ɛhohora. Wɔtry steal Wo username ne password. Ɛho hia sɛ check URL!'
        },
        {
            id: 'sm5',
            question: 'Should I accept friend requests from strangers?',
            answer: 'No! Strangers may be scammers. Only accept requests from people you know in real life.',
            twiAnswer: 'Mma! Mugufo betumi aba. Sika requests firi mfuofo a wote wo ho wɔ nyankopɔn mu.'
        },
        {
            id: 'sm6',
            question: 'How do I create a strong social media password?',
            answer: 'Use at least 8 characters with mix of letters, numbers and symbols. Example: Kwame@2024Secure!',
            twiAnswer: 'Use 8 characters anaa增产, ne letters, numbers ne symbols. Template: Kwame@2024Secure!'
        }
    ],
    [faqCategories.MOBILE_BANKING]: [
        {
            id: 'mb1',
            question: 'How do I keep my mobile banking safe?',
            answer: '1. Use a strong PIN\n2. Never share your PIN\n3. Cover your screen when entering PIN\n4. Log out after each session\n5. Enable transaction notifications',
            twiAnswer: '1. Use strong PIN\n2. Mma mpɛson nnsa Wo PIN\n3. Cover Wo screen bere a ɛwɔ PIN mu\n4. Log out afi session anim\n5. Enable transaction notifications'
        },
        {
            id: 'mb2',
            question: 'What is two-factor authentication?',
            answer: 'Two-factor authentication (2FA) adds an extra layer of security. After entering your password, you also need a code sent to your phone. Always enable 2FA!',
            twiAnswer: 'Two-factor authentication (2FA) na ɛma Wo security yɛ stronger. Afi a wode password ba no, ɛho hia sɛ code a ɛba Wo phone no. Ɛho hia sɛ enable 2FA!'
        },
        {
            id: 'mb3',
            question: 'Can I use mobile banking on someone elses phone?',
            answer: 'No! Never do banking on someone elses phone. They could see your PIN or save your details. Use only your personal device.',
            twiAnswer: 'Mma! Mma bank wɔ obi phone. Wobetumi hwe Wo PIN anaa save Wo details. Use Wo phone ankasa.'
        },
        {
            id: 'mb4',
            question: 'What should I do if I lose my phone?',
            answer: '1. Call your bank immediately\n2. Lock or wipe your phone remotely\n3. Change all your passwords\n4. Report to the police\n5. Get a new SIM with same number',
            twiAnswer: '1. Kɔ bu bank fo ara\n2. Lock anaa wipe Wo phone remotely\n3. Change Wo passwords nyinaa\n4. Kɔ ko police no ho\n5. Get new SIM ne same number'
        },
        {
            id: 'mb5',
            question: 'Is it safe to save my bank card on apps?',
            answer: 'Be careful! Only save card details on trusted apps. Avoid saving on unknown or untrusted apps. Use mobile banking apps instead.',
            twiAnswer: 'Hwɛ! Sika card details fika wɔ trusted apps mu. Mma save wɔ unknown apps mu. Use mobile banking apps.'
        },
        {
            id: 'mb6',
            question: 'How do I verify a mobile banking message is real?',
            answer: 'Real banks will never ask for your PIN or password via message. If you receive such a message, it is fake! Call your bank to verify.',
            twiAnswer: 'Bank nyinaa rensaanhwɛ Wo PIN anaa password wɔ message mu. Sɛ wo received message a ɛka eyi, ɛfase! Kɔ bu bank fo.'
        },
        {
            id: 'mb7',
            question: 'What is the daily transaction limit?',
            answer: 'Most banks in Ghana have daily limits. Check with your bank and set a lower limit for extra security. This protects you if someone gets your card.',
            twiAnswer: 'Bank Ghana mu no wɔ daily limits. Kɔ hwee ne Wo bank ma set lower limit. Eyi bo Wo ahyeƐ sɛ obi get Wo card.'
        }
    ]
};

export const getFAQByCategory = (category) => {
    return faqData[category] || [];
};

export const getAllFAQs = () => {
    return Object.values(faqData).flat();
};

export const getFAQById = (id) => {
    return getAllFAQs().find(faq => faq.id === id);
};

export const getFAQCategories = () => [
    { id: faqCategories.DIGITAL_SAFETY, name: '🛡️ Digital Safety Tips', icon: '🛡️' },
    { id: faqCategories.SCAMS, name: '⚠️ Common Scams', icon: '⚠️' },
    { id: faqCategories.SOCIAL_MEDIA, name: '📱 Social Media Safety', icon: '📱' },
    { id: faqCategories.MOBILE_BANKING, name: '💰 Mobile Banking', icon: '💰' }
];
