import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { GoogleButton } from "../components/GoogleButton";
import { useApp } from "../context/AppContext";

export const Login: React.FC = () => {
  const { navigateTo, updateUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      updateUser({ email });
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
      <div className="flex flex-col gap-6 text-neutral-900">
        {/* Heading */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Bem vindo(a) de
            <br />
            volta
          </h1>
          <p className="mt-2 text-sm sm:text-base font-normal text-neutral-900">
            Insira os seus dados para se reconectar conosco
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {/* Esqueci minha senha link */}
            <div className="text-center pt-0.5">
              <button
                type="button"
                onClick={() => setForgotPasswordMsg(true)}
                className="text-xs sm:text-sm font-medium text-neutral-900 hover:underline cursor-pointer"
              >
                Esqueci minha senha
              </button>
            </div>
          </div>

          {forgotPasswordMsg && (
            <div className="bg-black/80 text-white text-xs p-2.5 rounded-lg text-center animate-fade-in">
              Um link de recuperação foi enviado para seu e-mail caso cadastrado.
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="submit"
              className="w-full bg-black hover:bg-neutral-900 active:scale-[0.99] text-white rounded-full py-2.5 sm:py-3 font-semibold text-base transition-all shadow-sm cursor-pointer"
            >
              Login
            </button>

            <GoogleButton onClick={handleGoogleLogin} />
          </div>

          {/* Footer link */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigateTo("cadastro")}
              className="text-xs sm:text-sm font-medium text-neutral-900 hover:underline cursor-pointer"
            >
              Não tem uma conta? cadastre-se gratuitamente
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
