import type { Activity } from "../types"

export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity } } |
    { type: 'set-activeId', payload: { id : Activity['id'] } } |
    { type: 'delete-activity', payload: { id : Activity['id'] } } 

export type ActivityState = {
     activities : Activity[],
     activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
        activities : localStorageActivities(),
        activeId:''
}

export const activityReducer = (
        state : ActivityState = initialState,
        action: ActivityActions
) => {
    if(action.type === 'save-activity') {
        let updatedActivities : Activity[] = []
        if(state.activeId){
          // Si existe un activeId significa que estamos EDITANDO una actividad
          updatedActivities = state.activities.map( activity => 
              activity.id === state.activeId 
                ? action.payload.newActivity  // reemplaza la actividad vieja con la nueva
                : activity // si no coincide, deja la actividad igual
          )
        } else {
            // Si NO hay activeId significa que estamos CREANDO una actividad nueva
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities : updatedActivities,
            activeId: '' // se limpia para que no quede "pegado" el id de la edición
        }
    }

    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id)
        }
    }

    return state
}