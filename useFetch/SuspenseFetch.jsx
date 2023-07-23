import { Suspense } from "react";

function getSuspender(promise) {
    let status = "pending"
    let result = ""
    const suspender = promise.then(
        (response) => {
            status = "success"
            result = response
        },
        (error) => {
            status = "error"
            result = error
        }
    );

    const read = () => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                throw result;
            default:
                return result;
        }
    }

    return { read }
}

function fetchData(url) {
    // La promesa no esta resuleta
    const promise = fetch(url).then((response) => response.json())
    // Mandamos la respuesta de la respuesta a la funcion getSuspender
    return getSuspender(promise)
}

const apiData = fetchData("https://jsonplaceholder.typicode.com/todos/1")

export default function Main() {
    const data = apiData.read()
    return (
        <>
            <h1>Fetching data</h1>
            <Suspense fallback={<div>Loading ...</div>}>
                <div>{data.title}</div>
            </Suspense>
        </>
    )
}