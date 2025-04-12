# ReactMate Chess

<div align="center">
  <img src="public/logo.svg" alt="ReactMate Chess Logo" width="120" />
  <h3>Interactive Chess Learning Platform</h3>
  
  ![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js)
  ![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)
  ![TypeScript](https://img.shields.io/badge/TypeScript-4-3178C6?style=for-the-badge&logo=typescript)
</div>

## 🚀 Overview

ReactMate Chess is an interactive web platform designed to help chess enthusiasts of all levels improve their game through animated lessons, interactive examples, and structured learning paths. From basic piece movement to advanced tactical patterns, ReactMate provides an engaging environment to master the game of chess.

## ✨ Features

- **Interactive Chess Board** - Dynamic, responsive chess board with animated pieces
- **Structured Learning Paths** - Progress from beginner to advanced with organized lessons
- **Tactical Pattern Recognition** - Learn essential chess tactics like pins, forks, skewers, and more
- **Piece Movement Tutorials** - Interactive examples of how chess pieces move and capture
- **Animated Demonstrations** - Visual animations for better conceptual understanding
- **Mobile-Friendly Design** - Learn chess on any device with responsive UI

## 📷 Screenshots

<div align="center">
  <img src="public/screenshots/homepage.png" alt="Homepage" width="45%" />
  <img src="public/screenshots/lesson.png" alt="Chess Lesson" width="45%" />
</div>

## 🛠️ Installation

1. Clone the repository:
   ```
   git clone https://github.com/shashwath1278/ReactMate.git
   cd ReactMate
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧩 Project Structure

```
ReactMate(website)/
├── app/                # Next.js app router pages
│   ├── learn/          # Learning section pages  
│   ├── play/           # Interactive gameplay
│   └── layout.tsx      # Main application layout
├── components/         # Reusable UI components
│   ├── learn/          # Learning-specific components
│   └── ui/             # Shadcn UI components
├── public/             # Static assets
└── styles/             # Global styles
```

## 💻 Technologies

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🌐 Key Components

### Dynamic Chess Animation

Interactive chess board with animated piece movements, highlighting, and effects:

```jsx
<DynamicChessAnimation />
```

### Chess Tactics Lessons

Learn essential chess tactics with interactive examples:

```jsx
<BasicTacticsLesson />
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Chess.com for piece images
- [Shadcn UI](https://ui.shadcn.com/) for component library
- All open source contributors

---

<div align="center">
  Made with ♟️ by ReactMate Team
</div>
