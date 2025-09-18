import type { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, type Dispatch } from "react"
import { PencilSquareIcon, XCircleIcon} from '@heroicons/react/24/outline'
import type { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    const categoryName = useMemo( () => 
         (category: Activity['category']) => {
            const cat = categories.find(cat => cat.id === category)
            return cat ? cat.name : 'Sin categoria'
         },[activities] )

    const isEmptyActivities = useMemo( () => activities.length === 0, [activities] )     
  return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center mb-5">Comida y Actividades</h2>
        {isEmptyActivities ? <p className="text-gray-400 text-center my-5">No hay actividades registradas</p> : 

        activities.map( activity => (
            <div key={activity.id} className="bg-white p-5 rounded shadow mb-3 flex justify-between items-center">
              <div className="space-y-2 relative">
                <p className={`absolute top-0 left-0 -translate-y-1/2  text-white px-3 py-1 rounded-full text-sm font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-blue-500'}`}>
                    {categoryName(+activity.category)}
                </p>
                <p className="text-2xl font-bold pt-5">{activity.name}</p>
                <p className="font-black text-4xl text-lime-500">
                    {activity.calories} {''}
                     <span>Calorias</span>
                </p>
              </div>

              <div className="flex gap-5 items-center">
                <button
                  onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id}})}
                >
                    <PencilSquareIcon className="h-7 w-7 text-slate-400 hover:text-slate-600"/>
                </button>

                <button
                  onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}
                >
                    <XCircleIcon className="h-7 w-7 text-red-400 hover:text-red-600"/>
                </button>
              </div>
            </div>
        ))}
    </>
  )
}
