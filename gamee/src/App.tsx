import {Route, Routes} from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/login";
import MapPage from "./pages/map";
import {AuthContext} from "./context/AuthContext";
import {useState} from "react";
import {BaseUser} from "./hooks/useUser";
import TeamManagementPage from "./pages/TeamManagement";
import ShopPage from "./pages/shop";
import QuestPage from "./pages/quest";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [user, setUser] = useState<BaseUser | null>(null);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<MapPage />} path="/map" />
        <Route element={<TeamManagementPage />} path="/admin/manage" />
        <Route element={<ShopPage />} path="/shop" />
        <Route element={<QuestPage />} path="/quests" />
      </Routes>
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
