import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.tsx'

// Aplica estilos globais para garantir que a aplicação funcione
// mesmo que o Tailwind não esteja funcionando corretamente
document.documentElement.style.setProperty('--tailwind-blue-600', '#2563eb');
document.documentElement.style.setProperty('--tailwind-blue-700', '#1d4ed8');
document.documentElement.style.setProperty('--tailwind-gray-50', '#f9fafb');
document.documentElement.style.setProperty('--tailwind-gray-100', '#f3f4f6');
document.documentElement.style.setProperty('--tailwind-gray-200', '#e5e7eb');
document.documentElement.style.setProperty('--tailwind-gray-300', '#d1d5db');
document.documentElement.style.setProperty('--tailwind-gray-500', '#6b7280');
document.documentElement.style.setProperty('--tailwind-gray-600', '#4b5563');
document.documentElement.style.setProperty('--tailwind-gray-700', '#374151');
document.documentElement.style.setProperty('--tailwind-gray-800', '#1f2937');
document.documentElement.style.setProperty('--tailwind-gray-900', '#111827');
document.documentElement.style.setProperty('--tailwind-red-600', '#dc2626');
document.documentElement.style.setProperty('--tailwind-white', '#ffffff');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
