import React from "react";
import "./App.css";
import Month from "./components/Month";

function App() {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return (
    <div>
      {months.map((month) => {
        return <Month key={month} month={month} />;
      })}
    </div>
  );
}

export default App;
