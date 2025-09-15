import {  useState } from "react"
import { v4 as uuidv4} from 'uuid'
import type { ChangeEvent, Dispatch, FormEvent } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import type { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
   dispatch: Dispatch<ActivityActions>
}

const initialState : Activity= {
    id: uuidv4(),
    category: 1,
    name: '', 
    calories: 0
}


export default function Form({ dispatch }: FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const {name, calories} = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    dispatch({ type: 'save-activity', payload: {newActivity: activity} })
    setActivity({
      ...initialState,
      id: uuidv4()
    })

  }
  return (
    <form 
        className="space-y-4 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <label htmlFor="category" className="font-bold">Categoria:</label>
          <select 
               className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
               id="category"
               value={activity.category}
               onChange={handleChange}>

                {categories.map(category => (
                  <option 
                     key={category.id}
                     value={category.id}
                     >
                      {category.name}
                     </option>
                ))}
          </select>
         </div>

         <div className="grid grid-cols-1 gap-4">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input 
                  id="name"
                  className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                  type="text"
                  placeholder="Ej. Comida, jugo de naranja, Ensalada, Ejercicio, correr"
                  value={activity.name}
                  onChange={handleChange}
                />
         </div>

         <div className="grid grid-cols-1 gap-4">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input 
                  id="calories"
                  className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                  type="number"
                  placeholder="Ej. 200, 150, 300"
                  value={activity.calories}
                  onChange={handleChange}
                />
         </div>

         <input 
           type="submit"
           className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full cursor-pointer font-bold disabled:opacity-50"
           value={activity.category === 1 ? 'Agregar Comida' : 'Agregar Ejercicio'}
           disabled={!isValidActivity()} />
    </form>
  )
}
