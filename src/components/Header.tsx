import { FaGithub, FaFileInvoice } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-2">
            <FaFileInvoice className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">InvoiceCraft</h1>
            <p className="opacity-75">Gerador de Faturas Profissionais</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com/luccagoltzman/invoice-craft" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-all"
            title="Ver código no GitHub"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header; 