import { useEffect, useState } from "react";

export const useFetch = (url) => {

      const [data, setData] = useState({ data: null, isLoading: true, hasError: null });
      const [abortController, setAbortController] = useState(null)

      const getInformation = async () => {

            setData({ ...data, isLoading: true });
            try {
                  const response = await fetch(url, { signal: abortController.signal });
                  const urlData = await response.json();
                  console.log(urlData)
                  setData({ ...data, isLoading: false, data: urlData });

            } catch (error) {
                  if (error.name === 'AbortError') {
                        setData({ ...data, isLoading: false, hasError: "Request Cancelled" });
                  }
                  setData({ ...data, isLoading: false, hasError: error });
            } finally {
                  console.log("Finally");
            }
      }
      //every time the Url changes Useeffect is executed again
      useEffect(() => {
            // Para cancelar la peticion
            const abortController = new AbortController();
            setAbortController(abortController);
            getInformation(); 
            //Cuando el componente se desmonte se cancela la peticion
            return () => abortController.abort();
      }, [url]);

      const handleCancelRequest = () => {
            if (abortController) {
                  abortController.abort();
            }
            setData({ ...data, isLoading: false, hasError: "Request Cancelled" });
      }

      return {
            data: data.data,
            isLoading: data.isLoading,
            hasError: data.hasError,
            handleCancelRequest
      };
}