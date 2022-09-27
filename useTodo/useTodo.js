/* +++++++++++++++++++++++++++++++++++
dispatch -> Cuando solamente tenemos un Reducer
dispatchToDo -> En caso de que tuviéramos más Reducers para no confundir
++++++++++++++++++++++++++++++++++++*/
import { useEffect , useMemo , useReducer } from "react";
import { todoReducer } from "./todoReducer";

function init () {
      /* +++++++++++++++++++++++++++++++++++
      Function inicializadora de nuestro todos (estado del Reducer)
      ++++++++++++++++++++++++++++++++++++*/
      return JSON.parse ( localStorage.getItem ( 'todoList' ) ) || [];
}

export const useTodo = ( initialState = [] ) => {

      const [ todos , dispatch ] = useReducer ( todoReducer , initialState , init );

      useEffect ( () => {
            /* +++++++++++++++++++++++++++++++++++
            Se ejecuta cada que el componente se monta
            Se ejecuta cuando los todos son modificados
            ++++++++++++++++++++++++++++++++++++*/
            console.log ('Hello')
            localStorage.setItem ( 'todoList' , JSON.stringify ( todos ) || [] );

            return () => {
                  console.log ( 'Component Unmounted ' )
            }
      } , [ todos ] );

      const handleOnNewTodo = ( todoValue ) => {
            const action = {
                  type : '[TODO] Add' ,
                  payload : todoValue
            };
            /* +++++++++++++++++++++++++++++++++++
            Funcion que debemos utilizar para poder mandar la
            información
            ++++++++++++++++++++++++++++++++++++*/
            dispatch ( action );
      }

      const handleDeleteToDo = ( id ) => {
            dispatch ( {
                  type : '[TODO] Delete' ,
                  payload : id
            } )
      }

      const handleCompleteToDo = ( id ) => {
            dispatch ( {
                  type : '[TODO] Complete' ,
                  payload : id
            } )
      }

      const handleEditToDo = ( todoEdited ) => {
            console.log ( {
                  type : '[TODO] Edit' ,
                  payload : todoEdited
            } );

            dispatch ( {
                  type : '[TODO] Edit' ,
                  payload : todoEdited
            } )
      }

      const pendingTasks = useMemo ( () => {
            console.log ( 'Filter' )
            return todos.filter ( todo => !todo.done ).length
      } , [ todos ] );

// const pendingTasks =() => {
//       console.log ('Filter')
//       return todos.filter ( todo => !todo.done ).length
// };



      return {
            todos ,
            handleCompleteToDo ,
            handleOnNewTodo ,
            handleDeleteToDo ,
            handleEditToDo ,
            pendingTasks,
            totalTodos : todos.length
      }

}