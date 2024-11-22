# 🤖 Swinburne Discord Bot

A Discord bot designed to help track and manage units for students.

## ✨ Features

- 📚 Unit tracking and management
- 🔔 Notifications and reminders
- 💬 Interactive Discord commands
- 🗃️ Database integration with MongoDB

## 🚀 Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org) (version 18 or higher) 📦
- [npm](https://www.npmjs.com/) (comes with Node.js) 🏃‍♂️

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/SanukaE/Swinburne-Discord
cd Swinburne-Discord
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory (see Environment Variables section)

## 🔐 Environment Variables

Add these environment variables to your `.env` file:

```env
#For Application
APP_TOKEN = "YOUR_APP_TOKEN"

#For Setup
APP_ID = "YOUR_APP_ID"
GUILD_ID = "YOUR_GUILD_ID"
SELECTION_CHANNEL = "YOUR_SELECTION_CHANNEL_ID"
REQUEST_CHANNEL = "YOUR_REQUEST_CHANNEL_ID"
APP_OWNER_ID = "YOUR_USER_ID"
GUILD_OWNER_ID = "YOUR_GUILD_OWNER_USER_ID"

#For Database
MONGO_URL = "YOUR_MONGO_CONNECTION_STRING"
```

## 💻 Development

Compile TypeScript and deploy slashcommands:

```bash
npm run build
```

To run the bot:

```bash
npm start
```

## 🏗️ Building for Production

Compile TypeScript and deploy slashcommands:

```bash
npm run build
```

## 📸 ScreenShots

![menu message](https://github.com/user-attachments/assets/478a8220-e87e-4678-8544-f07785db65d0)
![request message](https://github.com/user-attachments/assets/1cd31b79-c044-4de8-a83e-520604677898)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🛠️ Built With

- [Discord.js](https://discord.js.org) - Powerful JavaScript library for interacting with Discord API
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## 📄 License

This project is licensed under the [ISC License](https://choosealicense.com/licenses/isc/).

## 🚨 Disclaimer

This project is not associated with, endorsed by, or officially connected to Swinburne University of Technology. It is an independent project created by students and developers.

## 👏 Acknowledgements

Created with ❤️ by [ItzSanuka](https://github.com/SanukaE)
