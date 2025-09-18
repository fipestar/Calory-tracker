  import Form from "./components/Form"
  import { useEffect, useReducer } from "react"
  import { activityReducer, initialState } from "./reducers/activity-reducer"
  import  ActivityList from "./components/ActivityList"

  function App() {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    useEffect( () => {
      localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    return (
      <>
        <header className="bg-lime-600 py-3">
          <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-4xl text-center font-bold text-white uppercase">Contador de Calorias</h1>
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
