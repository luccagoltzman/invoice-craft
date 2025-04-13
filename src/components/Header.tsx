import { FaGithub, FaFileInvoice, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <nav className="nav-container">
          <motion.div 
            className="brand"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="logo-wrapper"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaFileInvoice className="logo-icon" />
            </motion.div>
            
            <div className="brand-text">
              <h1 className="brand-name">InvoiceCraft</h1>
              <p className="brand-tagline">Gerador de Faturas Profissionais</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="nav-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.a 
              href="#" 
              className="nav-link"
              title="Sobre o InvoiceCraft"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInfoCircle />
              <span className="nav-link-text">Sobre</span>
            </motion.a>
            
            <motion.a 
              href="https://github.com/luccagoltzman" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
              title="Ver código no GitHub"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
              <span className="nav-link-text">GitHub</span>
            </motion.a>
          </motion.div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 