// replace with your own URL based on deployed API stage
const url = 'https://k60w2rdui3.execute-api.us-east-1.amazonaws.com/intialStage'

// Assume resource always starts with a "/"
function api(resource) {
    return url + resource
}

// Details on Fetch can be found here:
//
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

// 
// resource is a string like "/calc" or "/constants/delete"
export async function post(resource, data, handler) {
    fetch(api(resource), {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)   // Stringify into string for request
    })
    .then((response) => response.json())
    .then((responseJson) => handler(responseJson))
    .catch((err) => handler(err))
}

// resource is a string like "/constants"
export async function get(resource) {
    const response = await fetch(api(resource), {
        method: "GET"
    })

    return response.json()    // extract as native JavaScript object
}
