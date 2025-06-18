import { Link } from "react-router";
import ufnLogo from "../assets/ufn_logo.png";

export function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-2 sm:px-6 mb-6">
      <div className="flex justify-between flex-col sm:flex-row items-center gap-2 sm:gap-6 pb-2">
        <Link to="/" className="flex items-center gap-2 sm:gap-4">
          <img
            src={ufnLogo}
            alt="UFN Logo"
            width={50}
            height={50}
          />
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-slate-900 font-bold text-lg sm:text-xl">
              UFN - Controle de Itens
            </h1>
          </div>
        </Link>


        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <Link to="/" className="text-slate-700 hover:text-slate-900 transition-colors">
            Início
          </Link>
          <Link to="/registerItem" className="text-slate-700 hover:text-slate-900 transition-colors">Registrar item</Link>
          <Link to="/registerUser" className="text-slate-700 hover:text-slate-900 transition-colors">Registrar Usuario</Link>
        </div>
      </div>
    </header >
  );
}