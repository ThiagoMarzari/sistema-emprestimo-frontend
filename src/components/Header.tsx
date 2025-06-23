import { Link } from "react-router";
import ufnLogo from "../assets/ufn_logo.png";

export function Header() {
  return (
    <header className="bg-white shadow-md py-2 mb-16">
      <div className="container mx-auto px-4 flex justify-between flex-col sm:flex-row items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={ufnLogo}
            alt="UFN Logo"
            width={50}
            height={50}
          />
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-[#003D7C] font-bold text-lg sm:text-xl">
              UFN - Controle de Itens
            </h1>
          </div>
        </Link>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <Link to="/" className="text-slate-700 hover:text-slate-900 transition-colors">
            Emprestar/Devolver
          </Link>
          <Link to="/logs" className="text-slate-700 hover:text-slate-900 transition-colors">
            Logs
          </Link>
          <Link to="/registerItem" className="text-slate-700 hover:text-slate-900 transition-colors">Registrar</Link>
        </div>
      </div>
    </header >
  );
}