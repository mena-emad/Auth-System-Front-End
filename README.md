# 🛠️ Profile Management Dashboard (MERN Stack)

This project features an advanced, high-performance Profile Page designed for a modern user experience. It integrates seamless responsiveness with custom brand aesthetics inspired by the "Cukur" identity, specifically tailored for full-stack developers.

## 🚀 Technology Stack
*   **Frontend**: React.js & Vite
*   **UI Framework**: Material UI (MUI)
*   **Animations**: Framer Motion
*   **Icons**: Lucide-React
*   **Styling**: Glassmorphism & Neon Glow Aesthetics

## ✨ Key Features

### 1. 📱 Fully Responsive Design (Mobile-First)
The UI is meticulously optimized for all screen sizes:
*   **Text Wrapping**: Prevents long strings (like email addresses) from breaking the layout using `word-break: break-all`.
*   **Dynamic Padding**: Automatically adjusts spacing and margins based on screen breakpoints.
*   **Adaptive Layout**: Fluidly transitions from multi-column grids to single-stack layouts on mobile devices.

### 2. ⚡ Advanced "Cukur" Logo Component
A custom SVG component that replicates the iconic "Cukur" symbol with high-fidelity animations:
*   **Draw & Erase Animation**: A continuous loop that draws the logo path and erases it dynamically using `pathLength`.
*   **Neon Pulse Effect**: A soft blue neon glow that pulses rhythmically to create a "living" UI element.
*   **SVG-Based Rendering**: Ensures crystal-clear resolution at any scale, from mobile headers to desktop backgrounds.

### 3. 🛡️ User Experience (UX)
*   **Loading States**: Utilizes MUI Skeletons to provide a smooth visual experience while data is being fetched.
*   **Glassmorphism**: Implements semi-transparent surfaces with `backdropFilter` for a premium, deep-layered look.
*   **Security Context**: Fully integrated with `AuthContext` to display real-time user data and manage secure logout sessions.

## 📂 Project Structure
```text
src/
 ├── components/
 │    └── CukurLogo.jsx     # Custom animated SVG component
 ├── pages/
 │    └── ProfilePage.jsx   # Main Profile view with responsive logic
 ├── hooks/
 │    └── useAuth.js        # Authentication state management
 └── App.js
```
 ## 🛠️ Installation & Setup
 1. **Clone the repository:**
```bash
git clone [https://github.com/mena-emad/Auth-System-Front-End.git](https://github.com/mena-emad/Auth-System-Front-End.git)
```

2. **Install dependencies:**
```bash
npm install
```
3. **Configure Environment Variables:**
* Create a ```.env ``` file in the root directory:
  ```Plaintext
  VITE_API_URL=your_backend_api_url
  ```
 4. **Run the development server:**
```bash
npm run dev
```
### 👤 Developer
Mena Emad Sawares
* Full Stack Developer
* Portfolio: [menaemad.netlify.app](https://menaemad.netlify.app)
