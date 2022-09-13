import {React} from "react"
import Person from "./components/person";
import { useItems } from "./utils/ItemContext";
import SetFees from "./components/extraFees";

function App() {
  
  const {sum, pax, changeCount, round} = useItems()
  const personElem = Array(pax).fill(0).map((_,i) => <Person key={i+1} number={i+1}/>)

  return (
    <div className="flex flex-col items-center justify-center h-full lg:flex-row lg:items-start">
      <div className={`w-full h-full p-6 mb-3 shadow-md ${pax > 0 ? "lg:w-fit" : "lg:w-full"} min-w-min lg:min-h-screen`}>
      <div className="flex flex-col items-center justify-center px-3 lg:left-10 lg:sticky lg:top-6">
        <p className="py-2 m-4 text-3xl font-bold">Split The Bill ⚡</p>
        <div className="flex flex-col items-center justify-center px-6 py-2 rounded-md">
        <h1 className="text-3xl font-semibold text-gray-600">RM {sum}</h1>
        <p className={`pb-2 text-sm ${round > 0 ? "text-green-600" : "text-red-600"}`}>Rounding: {round}</p>
        </div>
        <SetFees/>
        <div className="flex flex-row items-center justify-center p-2 space-x-6">
          <p>No. of pax:</p>
          {pax > 0 && <button className="px-3 py-1 text-xl rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100" onClick={() => changeCount(-1)}>-</button>}
          <p>{pax}</p>
          <button className="px-3 py-1 text-xl rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100" onClick={() => changeCount(1)}>+</button>
        </div>
      </div>
      </div>
      <div className="grid mx-2 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-3">
      {personElem}
      </div>
    </div>
  );
}

export default App;
