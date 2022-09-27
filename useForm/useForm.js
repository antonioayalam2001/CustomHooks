import { useState } from "react";


/* +++++++++++++++++++++++++++++++++++
@initialState: useForm({
      attributes that the form is going to work with
})
++++++++++++++++++++++++++++++++++++*/
export const useForm = ( initialFormStatus = {} ) => {
      const [ formField , setformField ] = useState ( initialFormStatus );

      function handleChange ( { target } ) {
            const { name , value } = target;
            setformField ( current => ({
                  ...current ,
                  [ name ] : value
            } ));
      }

      function onResetForm ( e ) {
            // e.preventDefault ();
            setformField ( initialFormStatus );
      }

      return {
            formField ,
            handleChange ,
            onResetForm ,
            ...formField
      };
}