# Rental Platform - Frontend

A modern React-based frontend application for a rental property platform, built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Property Browsing**: View and explore rental properties with detailed information
- **Interactive UI**: Property carousel and card-based layouts
- **Chat Interface**: Real-time communication capabilities
- **Rating System**: Property and user rating functionality
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsiveness
- **Type Safety**: Full TypeScript implementation

## 📋 Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

## 🛠️ Installation

1. Navigate to the front directory:
```bash
cd front
```

2. Install dependencies:
```bash
npm install
```

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🏗️ Project Structure

```
front/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ChatInterface.tsx
│   │   ├── Header.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyCarousel.tsx
│   │   ├── PropertyDetails.tsx
│   │   └── RatingForm.tsx
│   ├── pages/              # Page components
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Project dependencies
```

## 🧰 Technologies

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the front directory for environment-specific variables:

```env
VITE_API_URL=http://localhost:3000
```

### Tailwind CSS

Customize the design system in [tailwind.config.js](tailwind.config.js).

### TypeScript

TypeScript configuration can be found in:
- [tsconfig.json](tsconfig.json) - App configuration
- [tsconfig.node.json](tsconfig.node.json) - Node configuration

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## 📄 License

This project is part of a rental platform microservices architecture.

## 🔗 Related

- Backend microservices: See [../microservices](../microservices)
- API Documentation: See [../docs/API_DOCUMENTATION_v1.md](../docs/API_DOCUMENTATION_v1.md)