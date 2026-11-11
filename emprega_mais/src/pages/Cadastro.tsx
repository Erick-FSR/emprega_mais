import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { GoogleButton } from "../components/GoogleButton";
import { useApp } from "../context/AppContext";

export const Cadastro: React.FC = () => {
  const { navigateTo, updateUser } = useApp();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome || email) {
      updateUser({
        name: nome || "Novo Usuário",
        email: email || "usuario@email.com.br",
      });
    }
    navigateTo("vagas");
  };

  const handleGoogleLogin = () => {
    updateUser({
      name: "Usuário Google",
      email: "usuario.google@gmail.com",
    });
    navigateTo("vagas");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5 text-neutral-900">
        {/* Heading */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Bem vindo(a)
          </h1>
          <p className="mt-2 text-sm sm:text-base font-normal text-neutral-900">
            Insira os seus dados para se cadastrar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Nome field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="text-base sm:text-lg font-medium text-neutral-900">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="seu nome aqui"
              className="w-full bg-[#dcdcdc] text-neutral-800 placeholder:text-neutral-500 rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black/20 transition-all"
              required
            />
          </div>

          {/* E-mail field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-base sm:text-lg font-medium text-neutral-900">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com.br"
              className="w-full bg-[#dcdcdc] text-neutral-800 placeholder:text-neutral-500 rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black/20 transition-all"
              required
            />
          </div>

          {/* Senha field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-base sm:text-lg font-medium text-neutral-900">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="digite sua senha"
                className="w-full bg-[#dcdcdc] text-neutral-800 placeholder:text-neutral-500 rounded-xl px-4 py-2.5 sm:py-3 pr-11 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-700 hover:text-black transition-colors cursor-pointer p-0.5"
                title={showPassword ? "Ocultar senha" : "Ver senha"}
                aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="submit"
              className="w-full bg-black hover:bg-neutral-900 active:scale-[0.99] text-white rounded-full py-2.5 sm:py-3 font-semibold text-base transition-all shadow-sm cursor-pointer"
            >
              Cadastrar
            </button>

            <GoogleButton onClick={handleGoogleLogin} />
          </div>

          {/* Footer link */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigateTo("login")}
              className="text-xs sm:text-sm font-medium text-neutral-900 hover:underline cursor-pointer"
            >
              Já tem uma conta? Acesse clicando aqui
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
