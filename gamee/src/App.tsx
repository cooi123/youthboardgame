import {Route, Routes} from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import LoginPage from "./pages/login";
import MapPage from "./pages/map";
import {AuthContext} from "./context/AuthContext";
import {useState} from "react";
import {BaseUser} from "./hooks/useUser";
import TeamManagementPage from "./pages/TeamManagement";
function App() {
  const [user, setUser] = useState<BaseUser | null>(null);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/docs" />
        <Route element={<PricingPage />} path="/pricing" />
        <Route element={<BlogPage />} path="/blog" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<MapPage />} path="/map" />
        <Route element={<TeamManagementPage />} path="/admin/manage" />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
