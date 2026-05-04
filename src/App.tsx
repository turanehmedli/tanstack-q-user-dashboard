import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";

const App = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const renderPage = () => {
    switch (activeItem) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <Users />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeItem={activeItem} onItemClick={setActiveItem}>
      {renderPage()}
    </Layout>
  );
};

export default App;
