export const todoReducer = ( initialState = [] , action ) => {
      switch ( action.type ) {
            case '[TODO] Add':
                  //Debemos evitar mutar el arreglo (initialState)
                  if ( initialState.length !== 0 ) {
                        const temporal = initialState.filter ( todo => todo.description.toLowerCase() !== action.payload.description.toLowerCase() )
                        return [ ...temporal , action.payload ];
                  }
                  return [ ...initialState , action.payload ];
          // throw new Error ( 'Action.type === ABC has not been implemented yet' );
            case '[TODO] Delete':
                  return initialState.filter ( todo => todo.id !== action.payload );
            case '[TODO] Complete':
                  return initialState.map ( todo => {
                        if ( todo.id === action.payload ) {
                              todo.done = !todo.done;
                              return todo;
                        }
                        return todo
                  } );
          //      payload : {id: # , description : String}
            case '[TODO] Edit':
                  const { id , description } = action.payload;
                  return initialState.map ( todo => {
                        if ( todo.id === id ) {
                              todo.description = description;
                              return todo;
                        }
                        return todo
                  } );
            default:
                  return initialState;
      }
};