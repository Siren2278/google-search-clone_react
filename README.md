# SearchWave - A Google Search Clone

## 🚀 Overview
SearchX is a modern, aesthetically appealing Google Search clone built with React, Bootstrap, and FontAwesome icons. It integrates the Google Search API (via RapidAPI) to fetch search results, images, videos, and news. Unlike the traditional Google Search interface, SearchX features a sleek UI with dark mode support and a category-based search system.

## ✨ Features
- 🔍 **Web Search** - Perform Google-powered searches.
- 🖼️ **Image Search** - Fetch images related to your query.
- 📺 **Video Search** - Search for videos powered by Google.
- 📰 **News Search** - Get the latest news results.
- 🌙 **Dark Mode** - Toggle between light and dark themes.
- 🎨 **Modern UI** - Designed with Bootstrap for responsiveness.
- 🚀 **Fast & Lightweight** - Optimized for speed and usability.

## 🛠️ Tech Stack
- **Frontend:** React, Bootstrap, FontAwesome
- **API:** Google Search API (via RapidAPI)
- **Styling:** CSS, Bootstrap

## 📦 Installation
To set up the project locally, follow these steps:

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/searchx.git
cd searchx
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add your RapidAPI key:
```sh
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key_here
```

### 4️⃣ Run the App
```sh
npm start
```
This will start the development server at `http://localhost:3000/`.

## ⚙️ Configuration
Ensure you have an active RapidAPI account and subscribe to the **Google Search API**.

Update the API endpoints if necessary in `SearchEngine.js`:
```js
const RAPID_API_HOST = 'google-api31.p.rapidapi.com';
const RAPID_API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
```

## 🖥️ Screenshots
![SearchX Screenshot](screenshot.png)

## 📜 License
This project is licensed under the **MIT License**.

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests.

## 🌎 Live Demo
[Check out the live version](https://your-deployment-link.com)

