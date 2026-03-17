# 🌟 Gye Nyame – Protect Your Digital Life

## A Fun Project for Young Coders!

### Welcome to Your First Telegram Bot Project! 🚀

Hey there, young coder! 🎉 In this exciting project, you're going to build a **Telegram bot** that teaches people in Ghana how to stay safe online. We'll use the amazing **Gye Nyame** symbol from Ghana to help people remember to protect themselves!

> **What is Gye Nyame?**  
> Gye Nyame means "Except God" in the Akan language. It reminds us that we need protection and guidance. Just like we pray for protection in real life, we also need to protect ourselves online!

---

## 📋 What Are We Building?

We're creating a **micro-learning module** – that's a small, fun lesson that fits on your phone! Here's what our bot will have:

1. 🖐️ **Welcome Screen** – A friendly greeting
2. 📖 **Cultural Story** – The meaning of Gye Nyame
3. 💻 **Digital Safety Lesson** – How to spot mobile money scams
4. ❓ **Quiz Time** – Test what you learned
5. 🔐 **Skill Builder** – Create strong passwords
6. 🏆 **Reward** – Get a cool digital badge!
7. 📱 **Telegram Messages** – How the bot talks to people

Let's start building! 💪

---

## 🛠️ What Do You Need?

Before we start, make sure you have:

- ✅ A computer (Windows, Mac, or Linux)
- ✅ Internet connection
- ✅ A text editor (like VS Code – it's free!)
- ✅ A Telegram account (ask your parent to help you get one)

Don't worry if you don't have everything yet! We'll go step by step together.

---

## 📝 Step 1: Setting Up Your Project

### Creating Your Project Folder

First, let's create a folder to store all our files:

```bash
# Open your terminal/command prompt and type:
mkdir gye-nyame-bot
cd gye-nyame-bot
```

### Creating Your First File

Now let's create a file called `bot.py`. This is where our bot's brain will live!

```python
# bot.py
# Our Gye Nyame Telegram Bot 🛡️

print("🎉 Hello! Welcome to Gye Nyame Bot!")
print("I'm here to teach you about digital safety!")
```

**Try it:** Save the file and run it with `python bot.py`

---

## 📱 Step 2: Understanding the Bot Structure

Let's plan what our bot will say! We'll create a simple structure:

```python
# bot.py - Complete Bot Structure

def show_welcome():
    """Show the welcome screen to users"""
    message = """
🌟 **Welcome to Gye Nyame!**

Protect your digital life with wisdom from Ghana!

**Gye Nyame** means "Except God" - a symbol that reminds us 
we need protection in everything we do.

Choose what you want to do:
🎧 Listen - Hear the story
📖 Read - Read the lesson  
🧠 Start Quiz - Test yourself!
    """
    return message

def show_cultural_story():
    """Tell the Gye Nyame story"""
    story = """
📖 **The Story of Gye Nyame**

Long ago in Ghana, our ancestors created symbols to teach 
important lessons. Gye Nyame reminds us that just like we 
need protection from danger in the real world, we also need 
protection in the digital world!

Every time you protect your password or think before clicking 
a link, you're being like Gye Nyame - wise and protected!
    """
    return story

print(show_welcome())
print("\n" + "="*50 + "\n")
print(show_cultural_story())
```

---

## 💡 Step 3: Digital Safety Lesson

Now let's teach about a real danger - **Mobile Money Scams**! This is very important in Ghana!

```python
def show_safety_lesson():
    """Teach about mobile money scams"""
    lesson = """
💰 **Lesson: Spot the Mobile Money Scam!**

📍 **The Scenario:**
You're on WhatsApp and someone sends you a message:
"Congratulations! You've won GH₵500! Send your mobile 
money number to claim your prize!"

⚠️ **Wrong Behavior:**
- ❌ Sending your number immediately
- ❌ Believing every message that says you won
- ❌ Clicking unknown links

✅ **Correct Behavior:**
- ✅ Think first! Did you enter a competition?
- ✅ Check if the message is from someone you know
- ✅ Never share your mobile money PIN

🛡️ **Remember:**
"If it's too good to be true, it's probably a scam!"
    """
    return lesson
```

---

## ❓ Step 4: The Quiz

Let's make a fun quiz with 3 questions!

```python
def show_quiz():
    """Interactive quiz for users"""
    quiz = """
🧠 **Quiz Time!**

**Question 1:**
Someone messages you "You won GH₵1000! Send your number!"
What do you do?

A) Send my number quickly! 💸
B) Ignore it - it's a scam! 🛡️
C) Share it with all my friends

**Answer: B** 🛡️
Always be careful of messages that seem too good to be true!

---

**Question 2:**
What makes a strong password?

A) Your birthday
B) "password123"
C) Mix of letters, numbers, and symbols like @Ghana2024!

**Answer: C** 🔐
A strong password has numbers, symbols, and capital letters!

---

**Question 3:**
Who should you tell if someone online asks for your password?

A) No one
B) Your best friend
C) A trusted adult (parent, teacher)

**Answer: C** 👨‍👩‍👧
Always tell a trusted adult if someone asks for your password!
    """
    return quiz
```

---

## 🔐 Step 5: Skill Builder - Create Strong Passwords

Let's teach users how to make unbreakable passwords!

```python
def show_password_tips():
    """Password strength guide"""
    tips = """
🔐 **Skill Builder: Create a Strong Password!**

📋 **Rules for a Strong Password:**
1. At least 8 characters long
2. Include at least one number (0-9)
3. Include at least one symbol (!@#$%^&*)
4. Include capital and small letters

❌ **Weak Passwords:**
- password123
- Ghana2024
- your name

✅ **Strong Passwords:**
- Ghan@2024Protect!
- MyP@ssw0rd123
- Kofi&Secure99

💡 **Tip:** Use the first letters of a sentence!
Example: "My Ghana School Has 4 Great Teachers"
→ MGHS4GT!

Let's practice making one now!
    """
    return tips
```

---

## 🏆 Step 6: The Reward

Everyone needs encouragement! Let's create a digital badge!

```python
def show_reward():
    """Congratulate the user"""
    reward = """
🏆 **CONGRATULATIONS! 🎉**

You have completed the Gye Nyame Digital Safety Module!

🛡️ **You are now a Digital Protector!**

Your Badge: **Gye Nyame Level 1**

Remember: Just like the Gye Nyame symbol protects us in Ghana,
you now have the power to protect yourself online!

Keep learning, stay safe, and share your knowledge with others!

Asante! (Thank you!) 🙏
    """
    return reward
```

---

## 📱 Step 7: Telegram Bot Setup

Now let's make this work on Telegram! We'll use Python and a library called `python-telegram-bot`.

### Installing the Library

```bash
# Open your terminal and type:
pip install python-telegram-bot
```

### Creating the Actual Bot

```python
# main.py - The Real Telegram Bot!

from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler

# Your bot token from BotFather
TOKEN = "YOUR_BOT_TOKEN_HERE"

async def start(update, context):
    """Handle /start command"""
    keyboard = [
        [InlineKeyboardButton("🎧 Listen", callback_data="listen")],
        [InlineKeyboardButton("📖 Read", callback_data="read")],
        [InlineKeyboardButton("🧠 Start Quiz", callback_data="quiz")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "🌟 **Welcome to Gye Nyame!**\n\n"
        "Protect your digital life with wisdom from Ghana!\n\n"
        "Choose what you want to do:",
        reply_markup=reply_markup
    )

async def button_click(update, context):
    """Handle button clicks"""
    query = update.callback_query
    await query.answer()
    
    if query.data == "listen":
        text = "🎧 Audio coming soon!\n\n"
        text += "Me da woase! (Thank you for listening!)\n"
        text += "Twitwa nsem no ase! (Listen to the story!)"
        
    elif query.data == "read":
        text = """📖 **The Gye Nyame Story**

Gye Nyame means "Except God" in Twi language.

Our ancestors used symbols to teach important lessons.
Gye Nyame reminds us we need protection in all things.

Just like you pray for protection in real life,
you must also protect yourself online!

📱 Stay smart. Stay safe. Stay protected! 🛡️"""
        
    elif query.data == "quiz":
        text = """🧠 **Quiz Time!**

**Q1:** Someone says you won money. What do you do?

A) Send my number - I won! 💸
B) Ignore it - probably a scam 🛡️
C) Share with friends

Answer: **B** 🛡️
Scams promise free money to trick you!

Choose: A, B, or C"""
    
    await query.edit_message_text(text)

# Main function to run the bot
def main():
    app = Application.builder().token(TOKEN).build()
    
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(button_click))
    
    print("🤖 Bot is running! Press Ctrl+C to stop")
    app.run_polling()

if __name__ == "__main__":
    main()
```

---

## 🎯 Step 8: Running Your Bot

### Getting Your Bot Token

1. Open Telegram and search for **@BotFather**
2. Type `/newbot` to create a new bot
3. Give your bot a name (like "Gye Nyame Bot")
4. BotFather will give you a **token** (a special code)
5. Copy that token and replace `"YOUR_BOT_TOKEN_HERE"` in the code

### Starting Your Bot

```bash
# Run your bot!
python main.py
```

Your bot is now live on Telegram! 🎉

---

## 📦 Complete Project Structure

Your project should look like this:

```
gye-nyame-bot/
├── bot.py          # Simple version (for testing)
├── main.py         # Real Telegram bot
├── lesson.py       # All the lessons
├── quiz.py         # Quiz logic
├── requirements.txt # List of packages
└── README.md       # Instructions
```

### requirements.txt

```
python-telegram-bot==20.*
```

---

## 🎓 What You Learned!

Great job, young coder! You've built:

1. ✅ A welcome message with Ghanaian culture
2. ✅ A cultural story about Gye Nyame
3. ✅ A digital safety lesson about scams
4. ✅ An interactive quiz
5. ✅ Password safety tips
6. ✅ A reward system
7. ✅ A working Telegram bot!

---

## 🚀 Next Steps

Want to make your bot even better? Try:

- 🎙️ Add real audio recordings
- 🌐 Add Twi language support
- 📊 Track how many people complete the quiz
- 🎮 Add more levels and badges

---

## 📖 Quick Reference

### Useful Telegram Bot Commands

| Command | What it does |
|---------|--------------|
| `/start` | Begin the bot |
| `/help` | Get help |
| `/quiz` | Start the quiz |
| `/story` | Read the story |

### Twi Phrases to Know

| Twi | English |
|-----|---------|
| Gye Nyame | Except God |
| Me da woase | Thank you |
| Asante | Thanks |
| Akwaaba | Welcome |

---

## 🎉 Congratulations!

You've completed the Gye Nyame Bot lesson! 

You're now a **Digital Protector** just like the Gye Nyame symbol protects us in Ghana!

Remember: Stay smart, stay safe, and keep coding! 💪🏴󠁧󠁢󠁥󠁮󠁧󠁿

**Asante ne kɔ fi! (Thank you and goodbye!)** 🙏

---

*Created with ❤️ for the young coders of Ghana*
*From the Gye Nyame Project* 🛡️
