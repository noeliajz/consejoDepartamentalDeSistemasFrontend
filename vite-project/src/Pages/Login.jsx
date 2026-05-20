import { useState } from "react";
import axios from "axios";
import { LogIn } from "lucide-react";

import NavbarLateral from "../components/NavbarLateral";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      // guardar token
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario)
      );

      alert("Login exitoso");

      // redireccion
      window.location.href = "/Dashboard";

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <NavbarLateral />

      {/* Contenido */}
      <div className="flex-1 ml-64 flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">

            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <LogIn className="text-blue-700" size={32} />
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Iniciar sesión
            </h1>

            <p className="text-gray-500 mt-2 text-center">
              Ingresá tus credenciales para acceder al sistema
            </p>
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>

              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                required
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-700
                hover:bg-blue-800
                transition-all
                text-white
                py-3
                rounded-xl
                font-semibold
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <LogIn size={18} />

              {loading
                ? "Ingresando..."
                : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}