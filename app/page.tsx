"use client";
import { useState } from "react";

import Dropdown from "@/components/common/dropdown";

function App() {
  const [selectedValue, setSelectedValue] = useState("");

  function handleSelect(value: string) {
    setSelectedValue(value);
    console.log("선택된 값:", value);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>드롭다운 컴포넌트</h1>
      <Dropdown options={["Apple", "Banana", "Cherry", "Date", "Grapes", "Mango", "Orange"]} onSelect={handleSelect} />
      <p>선택된 값: {selectedValue}</p>
    </div>
  );
}

export default App;
