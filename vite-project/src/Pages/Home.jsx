import React, { useState } from "react";

import NavbarHorizontalAdmin from "../Components/NavbarHorizontalAdmin";

import HomeAdmin from "./HomeAdmin";
import HomePublic from "./HomePublic";

const Home = () => {
  // CAMBIAR PARA PROBAR

  // Usuario NO logueado
  // const [user] = useState(null);

  // Usuario admin
  const [user] = useState({
    name: "Admin",
    role: "admin",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarHorizontalAdmin user={user} />

      <main className="ml-64 p-10">
        {!user && <HomePublic />}

        {user?.role === "admin" && <HomeAdmin />}
      </main>
    </div>
  );
};

export default Home;
