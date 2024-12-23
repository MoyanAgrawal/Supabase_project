import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Dashboard from "./Dashboard";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/AppSidebar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <SidebarProvider>
      {/* App Sidebar - Will be hidden on mobile */}
      <div className="md:flex ">
        <AppSidebar className="hidden md:block" />
        <main className="w-full md:w-[calc(100%-250px)] bg-[#fff] p-2 rounded ml-20">
          <Dashboard />
        </main>
      </div>

      <SidebarTrigger className="md:hidden fixed top-4 left-4 z-50" />
      {/* Sidebar Trigger - Shows on mobile */}
    </SidebarProvider>
  );
}

export default App;
