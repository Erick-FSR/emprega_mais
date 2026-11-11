import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#37bf36]">
      {/* Left panel: Green Form Container */}
      <div className="w-full md:w-[480px] lg:w-[520px] bg-[#37bf36] p-6 sm:p-8 md:p-12 flex flex-col justify-center shrink-0 z-10">
        <div className="max-w-md w-full mx-auto">{children}</div>
      </div>

      {/* Right panel: Illustration Container */}
      <div className="flex-1 bg-[#c9dac8] relative overflow-hidden flex items-center justify-center p-4 sm:p-8 min-h-[260px] md:min-h-screen">
        {/* Background glow / soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c8d9c7] via-[#c2d5c1] to-[#b3c9b2]" />

        {/* The illustration */}
        <div className="relative z-10 w-full max-w-2xl flex items-center justify-center">
          <img
            src="/illustration.png"
            alt="Ilustração de profissional conectado"
            className="w-full max-h-[85vh] object-contain drop-shadow-md select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};
