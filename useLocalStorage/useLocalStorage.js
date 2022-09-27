import { useState } from "react";

const useLocalStorage = ( key , initialValue = "" ) => {
      const [ storedValue , setStoredValue ] = useState ( ( valor ) => {
            try {
                  const value = window.localStorage.getItem ( key );
                  return value ? JSON.parse ( value ) : initialValue;
            } catch ( e ) {
                  console.error ( e )
            }
      } );

      const setValue = ( value ) => {
            try {
                  setStoredValue ( value );
                  window.localStorage.setItem ( key , JSON.stringify ( value ) );
            } catch ( e ) {
                  console.error ( e )
            }
      }

      return [
          storedValue ,
            setValue ]

}

export default useLocalStorage;