import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-main">
        {children}
      </main>
      <footer className="py-6 border-t layout-footer">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0">
              InvoiceCraft © {new Date().getFullYear()} - Um gerador de faturas simples e elegante
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary text-sm">
                Sobre
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary text-sm">
                Privacidade
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary text-sm">
                Termos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 