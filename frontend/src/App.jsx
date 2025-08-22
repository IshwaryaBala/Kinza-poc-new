import React, { useState, useEffect } from "react";
import SalesDashboard from "./components/pageComponents/SalesDashboard";
import './index.css'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SalesDashboard />
    </div>
  );
};

export default App;
