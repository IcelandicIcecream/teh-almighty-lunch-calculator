import {React} from "react"
import Person from "./components/person";
import { useItems } from "./utils/ItemContext";
import SetFees from "./components/extraFees";

function App() {
  
  const {sum, pax, changeCount} = useItems()

  const personElem = Array(pax).fill(0).map((_,i) => <Person key={i+1} number={i+1}/>)

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="py-2 m-4 text-3xl">Split The Bill ⚡</p>
      <h1 className="pb-2 text-xl font-semibold">Total: RM {sum}</h1>
      <SetFees/>
      <div className="flex flex-row items-center justify-center p-2 space-x-6">
        <p>No. of pax:</p>
        {pax > 0 && <button className="px-3 py-1 text-xl rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100" onClick={() => changeCount(-1)}>-</button>}
        <p>{pax}</p>
        <button className="px-3 py-1 text-xl rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100" onClick={() => changeCount(1)}>+</button>
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
      {personElem}
      </div>
    </div>
  );
}

export default App;
