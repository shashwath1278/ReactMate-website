# ReactMate Chess

ReactMate is a modern chess platform built with React, designed for developers and chess enthusiasts alike. This web application provides a beautiful and feature-rich interface for playing chess in various modes, learning chess concepts, and improving your skills.

## Features

- **Multiple Game Modes**: Play against AI, play locally with a friend, or challenge players online
- **Beautiful UI**: Clean, responsive design with animations and transitions
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Learning Resources**: Comprehensive chess learning materials for all skill levels
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Game Modes

### AI Mode
Challenge our sophisticated chess engine at various difficulty levels:
- Multiple difficulty settings
- Instant play with no waiting
- Move evaluation and analysis
- Perfect for practice and learning

### Local Mode
Play chess with a friend on the same device:
- No account required
- Pass-and-play format
- Auto-flip board option
- Great for teaching chess

### Online Mode
Challenge players from around the world:
- Quick matchmaking
- Live chess ratings
- Chat with opponents
- Save and share games

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shashwath1278/ReactMate.git
cd ReactMate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

```
ReactMate/
├── app/                  # Next.js app directory
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── learn/            # Chess learning resources
│   ├── play/             # Game mode selection
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   ├── game-features.tsx # Chess game feature components
│   └── navbar.tsx        # Navigation component
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Technologies Used

- **Next.js**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Shadcn UI**: UI component library
- **Chess.js**: Chess logic
- **Stockfish**: Chess engine (for AI)

## Deployment

The application is deployed on Vercel:

- **Main Website**: [https://react-mate.vercel.app](https://react-mate.vercel.app)
- **Game Modes**:
  - AI Mode: [https://react-mate--two.vercel.app/play/ai](https://react-mate--two.vercel.app/play/ai)
  - Local Mode: [https://react-mate--two.vercel.app/play/offline](https://react-mate--two.vercel.app/play/offline)
  - Online Mode: [https://react-mate--two.vercel.app/play/online](https://react-mate--two.vercel.app/play/online)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Chess pieces designed by [Colin M.L. Burnett](https://en.wikipedia.org/wiki/User:Cburnett)
- Stockfish chess engine
- All the amazing contributors to open-source chess libraries
