import { ReactNode, useEffect } from 'react';
import Header from './Header';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Configuração correta de rolagem - apenas no #root
  useEffect(() => {
    // HTML: rolagem vertical permitida, mas sem barras
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.documentElement.style.overflowY = 'auto';
    
    // BODY: sem rolagem vertical
    document.body.style.minHeight = '100%';
    document.body.style.width = '100%';
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';
    
    // ROOT: única rolagem vertical
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.style.minHeight = '100vh';
      rootEl.style.width = '100%';
      rootEl.style.display = 'flex';
      rootEl.style.flexDirection = 'column';
      rootEl.style.overflowY = 'auto';
      rootEl.style.overflowX = 'hidden';
    }
    
    // Remover overflow de outros containers
    const containers = document.querySelectorAll('.app-container, .main-content, .card, .preview-card');
    containers.forEach(container => {
      if (container instanceof HTMLElement) {
        container.style.overflow = 'visible';
        container.style.maxHeight = 'none';
      }
    });
    
    return () => {
      document.documentElement.style.height = '';
      document.documentElement.style.width = '';
      document.documentElement.style.overflowY = '';
      
      document.body.style.minHeight = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      document.body.style.overflowX = '';
      
      if (rootEl) {
        rootEl.style.minHeight = '';
        rootEl.style.width = '';
        rootEl.style.display = '';
        rootEl.style.flexDirection = '';
        rootEl.style.overflowY = '';
        rootEl.style.overflowX = '';
      }
      
      containers.forEach(container => {
        if (container instanceof HTMLElement) {
          container.style.overflow = '';
          container.style.maxHeight = '';
        }
      });
    };
  }, []);

  return (
    <div className="app-container">
      <div className="background-gradient"></div>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <Header />
      
      <motion.main 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.main>
      
      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="copyright">InvoiceCraft © {new Date().getFullYear()}</span>
              <span className="tagline">Um gerador de faturas simples e elegante</span>
            </div>
            
            <div className="footer-links">
              {['Sobre', 'Privacidade', 'Termos'].map((item, index) => (
                <motion.a 
                  key={item}
                  href="#" 
                  className="footer-link"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 