import { useState } from "react";
import LibraryButton from "./LibraryButton.jsx";

function LibraryMain() {
  const [count, setCount] = useState(0);

  function incrementNumber() {
    setCount(count + 1);
  }

  return (
    <main>
      <h2>WELCOMING PAGE</h2>
      <LibraryButton buttonLabel="Increment" onClickButton={incrementNumber} />
      <div>Increment value is {count}</div>
    </main>
  );
}

export default LibraryMain;