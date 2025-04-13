import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">InvoiceCraft</h1>
          <p className="ml-2 text-gray-500 text-sm">Gerador de Faturas</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com/seu-usuario/invoice-craft" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header; 