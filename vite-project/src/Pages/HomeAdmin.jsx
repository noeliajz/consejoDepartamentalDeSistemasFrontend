import React from "react";

const HomeAdmin = () => {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Administrador
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            Expedientes
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            Reuniones
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            Consejeros
          </h2>
        </div>

      </div>

    </div>
  );
};

export default HomeAdmin;