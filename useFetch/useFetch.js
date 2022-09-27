import { useEffect , useState } from "react";

export const useFetch = ( url ) => {

      const [ data , setData ] = useState ( { data : null , isLoading : true , hasError : null } );

      const getInformation = async () => {

            setData ( { ...data , isLoading : true } );

            const response = await fetch ( url );

            const urlData = await response.json ();
            console.log (urlData)
            setData ( { ...data ,isLoading : false , data : urlData} );

            //Quotes API
            // setData ( { ...data ,isLoading : false , data : urlData.urlData  } );

      }
      //every time the Url changes Useeffect is executed again
      useEffect ( () => {

            getInformation ();
            // return () => {
            //       setData ( [] );
            // };
      } , [ url ] );

      return {
            data : data.data ,
            isLoading : data.isLoading ,
            hasError : data.hasError
      };
}