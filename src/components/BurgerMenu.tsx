import { useState } from 'react';
import { motion } from 'framer-motion';

interface BurgerMenuProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'interactive', label: '🏠 Home', icon: '🏠' },
  { id: 'overview', label: '📊 Economic Overview', icon: '📊' },
  { id: 'data360', label: '🌐 Data360', icon: '🌐' },
  { id: 'perspective', label: '📄 Perspective', icon: '📄' },
  { id: 'policies', label: '📋 Economic Policies', icon: '📋' },
  { id: 'analysis', label: '🎯 Investment Analysis', icon: '🎯' },
  { id: 'labour', label: '👷 Labour Data', icon: '👷' },
  { id: 'convergence', label: '🚀 EU Convergence', icon: '🚀' },
];

export default function BurgerMenu({ currentView, onViewChange }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleItemClick = (viewId: string) => {
    onViewChange(viewId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Burger Button */}
      <motion.button
        onClick={toggleMenu}
        className="fixed top-6 left-6 z-[100] w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <motion.div
            className="w-full h-0.5 bg-black rounded"
            animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-full h-0.5 bg-black rounded"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="w-full h-0.5 bg-black rounded"
            animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-b from-black to-dark-green border-r border-lime-400/30 z-[95] overflow-y-auto"
          >
              <div className="p-8 pt-24">
                {/* Logo/Title */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-lime-400 mb-2">
                    Perspective for Bulgaria
                  </h2>
                  <p className="text-sm text-gray-400">Iliya & Martin</p>
                </div>

                {/* Menu Items */}
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        currentView === item.id
                          ? 'bg-lime-400 text-black font-semibold'
                          : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-3 text-xl">{item.icon}</span>
                      {item.label.replace(/^[^\s]+\s/, '')}
                    </motion.button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    Data sources: NSI, World Bank, Eurostat
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    © 2024 Perspective for Bulgaria
                  </p>
                </div>
              </div>
            </motion.div>
        </>
      )}
    </>
  );
}

