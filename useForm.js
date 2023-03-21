import { useEffect , useMemo , useState } from "react";

/* +++++++++++++++++++++++++++++++++++
@initialState: useForm({
      attributes that the form is going to work with
})


const formValidations = {
      name : [ ( value ) => nameRegExp.test ( value ) , "Name must be only letters" ] ,
      email : [ ( value ) => emailRegex.test ( value ) , "Your email must contain .com and @" ] ,
      password : [ ( value ) => passwordRegExp.test ( value ) , "Password must be at least 8 characters and maximum 15" ] ,
}


++++++++++++++++++++++++++++++++++++*/
export const useForm = ( initialFormStatus = {} , formValidations = {} ) => {
      const [ formState , setFormState ] = useState ( initialFormStatus );
      const [ formValidaton , setFormValidaton ] = useState ( {} );

      useEffect ( () => {
            createValidators ();
      } , [ formState ] );

      useEffect ( () => {
            setFormState ( initialFormStatus )
      } , [ initialFormStatus ] );


      const isFormValid = useMemo ( () => {
            for ( const formValidatonElement of Object.keys ( formValidaton ) ) {
                  if ( formValidaton[ formValidatonElement ] !== null ) return false;
            }
            return true;
      } , [ formValidaton ] );

      function handleChange ( { target } ) {
            const { name , value } = target;
            setFormState ( {
                  ...formState ,
                  [ name ] : value
            } );
      }

      function onResetForm ( e ) {
            // e.preventDefault ();
            setFormState ( initialFormStatus );
      }

      const createValidators = () => {
            const formCheckedValues = {};
            for ( const formValidation of Object.keys ( formValidations ) ) {
                  const [ checkFunction , errorMessage ] = formValidations[ formValidation ];
                  formCheckedValues[ `${ formValidation }Valid` ] = checkFunction ( formState[ formValidation ] ) ? null : errorMessage;
            }
            setFormValidaton ( formCheckedValues )
      }

      return {
            ...formState ,
            formState ,
            handleChange ,
            onResetForm ,
            isFormValid ,
            ...formValidaton ,
      };
}