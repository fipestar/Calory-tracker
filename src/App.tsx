  import Form from "./components/Form"
  import { useEffect,  useReducer } from "react"
  import { activityReducer, initialState } from "./reducers/activity-reducer"
  import  ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

  function App() {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    useEffect( () => {
      localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    const canRestartApp = state.activities.length > 0

    return (
      <>
        <header className="bg-lime-600 py-3">
          <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-4xl text-center font-bold text-white uppercase">Contador de Calorias</h1>
            <button 
               className="bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-900 uppercase font-bold disabled:opacity-30"
               disabled={!canRestartApp}
               onClick={() =>dispatch({type: 'restart-app'})}>
              Reiniciar App
            </button>
          </div>
        </header>

        <section className="bg-lime-500 py-20 px-5">
          <div className="max-w-5xl mx-auto">
            <Form 
              dispatch={dispatch}
              state={state}
            />  
          </div>
        </section>

        <section className="bg-gray-800 py-10 px-5 text-center text-white">
          <div className="max-w-5xl mx-auto">
           <CalorieTracker 
             activities = {state.activities}
           />
          </div>
        </section>

        <section className="p-10 mx-auto max-w-5xl">
          <ActivityList 
            activities={state.activities}
            dispatch={dispatch}
          />
        </section>
      </>
    )
  }

  export default App
