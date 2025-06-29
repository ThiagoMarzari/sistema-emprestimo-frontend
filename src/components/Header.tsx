import { Link } from "react-router";
import { useState } from "react";
import ufnLogo from "../assets/ufn_logo.png";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky mb-14">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">

          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={ufnLogo}
                alt="UFN Logo"
                className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[#003D7C] font-bold text-lg sm:text-xl leading-tight">
                UFN - Controle de Itens
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">
                Sistema de Empréstimos
              </p>
            </div>
          </Link>

          {/* Desktop  */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-[#003D7C] font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003D7C] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/logs" 
              className="text-gray-700 hover:text-[#003D7C] font-medium transition-colors duration-200 relative group"
            >
              Logs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003D7C] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/registerItem" 
              className="text-gray-700 hover:text-[#003D7C] font-medium transition-colors duration-200 relative group"
            >
              Cadastrar
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003D7C] transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile Menu  btn*/}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile MENU*/}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <nav className="py-4 space-y-3 border-t border-gray-100 mt-3">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-[#003D7C] font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/logs" 
              className="block text-gray-700 hover:text-[#003D7C] font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Logs
            </Link>
            <Link 
              to="/registerItem" 
              className="block text-gray-700 hover:text-[#003D7C] font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cadastrar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}