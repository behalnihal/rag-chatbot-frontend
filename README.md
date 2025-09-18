# RAG News Chatbot Frontend

A modern, responsive React-based frontend for a RAG (Retrieval-Augmented Generation) news chatbot. This application provides an intuitive chat interface for users to ask questions about the latest news and receive AI-powered responses.

## 🚀 Features

### 💬 Chat Interface

- **Real-time Chat**: Interactive chat interface with message history
- **Message Timestamps**: Each message displays when it was sent
- **Typing Indicators**: Visual feedback when the bot is processing
- **Message Bubbles**: Modern speech bubble design with user/bot differentiation
- **Auto-scroll**: Automatically scrolls to latest messages

### 📱 Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Adaptive Layout**: Responsive breakpoints for desktop, tablet, and mobile
- **Touch-Friendly**: Large touch targets and optimized spacing
- **Full-Screen Mobile**: Uses full viewport on mobile devices

### 🔄 Session Management

- **Persistent Sessions**: Chat history maintained across page refreshes
- **Session Indicators**: Visual display of current session ID
- **Reset Functionality**: Easy session reset with confirmation
- **Loading States**: Visual feedback during history loading

### 🎨 Modern UI/UX

- **Clean Design**: Minimalist, professional interface
- **Smooth Animations**: Subtle transitions and hover effects
- **Custom Scrollbar**: Styled scrollbar matching the theme
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Sass** - CSS preprocessor for enhanced styling
- **Axios** - HTTP client for API communication
- **ESLint** - Code linting and quality assurance

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ChatWindow.jsx      # Main chat component
│   └── ChatWindow.scss     # Chat styling
├── App.jsx                 # Main application component
├── App.scss               # Global app styling
├── index.scss             # Global styles and resets
└── main.jsx               # Application entry point
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001
```

### API Endpoints

The application expects the following backend endpoints:

- `GET /api/history/:sessionId` - Fetch chat history
- `POST /api/chat` - Send message and get response
- `POST /api/clear/:sessionId` - Clear session history

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **AWS S3**: Upload the `dist` folder to an S3 bucket
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent indentation (2 spaces)

### CSS Guidelines

- Use BEM methodology for class naming
- Keep styles modular and component-specific
- Use CSS custom properties for theming
- Follow mobile-first responsive design

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Build errors:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API connection issues:**

- Ensure backend server is running
- Check API base URL in environment variables
- Verify CORS settings on backend

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- All contributors and open source libraries used

---

**Happy Chatting! 🤖💬**
