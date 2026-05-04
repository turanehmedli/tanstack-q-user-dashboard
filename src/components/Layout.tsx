import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  activeItem: string;
  onItemClick: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeItem, onItemClick }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem={activeItem} onItemClick={onItemClick} />
      <main className="flex-1 overflow-auto lg:ml-0 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
