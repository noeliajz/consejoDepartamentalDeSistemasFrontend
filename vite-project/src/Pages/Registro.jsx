
import { useState } from "react";
import axios from "axios";
import { UserPlus } from "lucide-react";

import NavbarLateral from "../components/NavbarLateral";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/register",
        {
          nombre,
          email,
          password,
          rol: "usuario",
        }
      );

      console.log(response.data);

      alert("Usuario registrado correctamente");

      // redireccionar al login
      window.location.href = "/Login";

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error al registrarse"
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
              <UserPlus className="text-blue-700" size={32} />
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Crear cuenta
            </h1>

            <p className="text-gray-500 mt-2 text-center">
              Registrate para acceder al sistema
            </p>
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleRegistro}
            className="space-y-5"
          >

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>

              <input
                type="text"
                placeholder="Juan Perez"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
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
              <UserPlus size={18} />

              {loading
                ? "Registrando..."
                : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

