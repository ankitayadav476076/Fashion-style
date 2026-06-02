import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  // Google Login Function
  const googleLogin = () => {

    window.open(
      "http://localhost:5000/auth/google",
      "_self"
    );
  };

  return (

    <section className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-5">

      {/* Logo */}
      <div className="w-full max-w-md mb-4">

        <h1 className="text-[#d4a63c] text-lg font-['Cormorant_Garamond']">
          ✨ Maison AI
        </h1>

      </div>

      {/* Login Card */}
      <div className="w-full max-w-md border border-[#161616] px-5 py-6 bg-black">

        {/* Heading */}
        <h1 className="font-['Cormorant_Garamond'] text-2xl text-[#f5eee6] mb-1">
          Welcome back
        </h1>

        <p className="text-zinc-500 text-sm mb-6">
          Your stylist is waiting.
        </p>

        {/* Google Button */}
        <button
          onClick={googleLogin}
          className="w-full border border-[#161616] py-2.5 text-sm font-medium hover:border-zinc-700 transition mb-6"
        >
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">

          <div className="flex-1 h-px bg-[#1b1b1b]"></div>

          <p className="text-zinc-500 text-xs">
            OR
          </p>

          <div className="flex-1 h-px bg-[#1b1b1b]"></div>

        </div>

        {/* Email */}
        <div className="mb-4">

          <label className="block text-xs mb-2 text-zinc-400">
            Email
          </label>

          <input
            type="email"
            autoComplete="off"
            placeholder="Enter email"
            className="w-full bg-transparent border border-[#161616] py-2.5 px-3 text-sm outline-none"
          />

        </div>

        {/* Password */}
        <div className="mb-4">

          <label className="block text-xs mb-2 text-zinc-400">
            Password
          </label>

          <input
            type="password"
            autoComplete="off"
            placeholder="Enter password"
            className="w-full bg-transparent border border-[#161616] py-2.5 px-3 text-sm outline-none"
          />

        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-5">

          <p className="text-zinc-500 text-xs cursor-pointer hover:text-zinc-300 transition">
            Forgot password?
          </p>

        </div>

        {/* Sign In */}
        <button className="w-full bg-[#e0b84f] text-black py-2.5 text-sm font-semibold hover:bg-[#d4a63c] transition mb-6">
          Sign in
        </button>

        {/* Signup */}
        <p className="text-center text-zinc-500 text-xs">

          No account?{" "}

          <span
            onClick={() => navigate("/signup")}
            className="text-zinc-300 cursor-pointer"
          >
            Create one →
          </span>

        </p>

      </div>

    </section>
  );
}

export default Login;