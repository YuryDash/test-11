type ActionType = AddTagAT
type AddTagAT = ReturnType<typeof addTagAC>


const initialState: Array<any> = []

export const tagsReducer = (state: Array<any> = initialState, action: ActionType): Array<any> => {
  switch (action.type) {
    case "ADD-TAG" :
      return [...state, action.payload.tag]
    default :
      return state
  }
}

export const addTagAC = (tag: any) => {
  return {
    type: "ADD-TAG",
    payload: {
      tag
    }
  }
}