import {React} from "react"
import Person from "./components/person";
import { useItems } from "./utils/ItemContext";

function App() {
  
  const {sum, pax, changeCount} = useItems()

  const personElem = Array(pax).fill(0).map((_,i) => <Person key={i+1} number={i+1}/>)

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="m-4 text-3xl">Lunch Calculator 1.0</p>
      <h1>Total: {sum}</h1>
      <div className="flex flex-row p-2 space-x-6">
        <p>No. of pax:</p>
        <button onClick={() => changeCount(1)}>+</button>
        <p>{pax}</p>
        {pax > 0 && <button onClick={() => changeCount(-1)}>-</button>}
      </div>
      <div className="grid grid-cols-4">
      {personElem}
      </div>
    </div>
  );
}

export default App;
