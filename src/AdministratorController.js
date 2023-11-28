import { get } from "./Api"

export function listVenues() { 
    get('/constants')
        .then(function (response) {

            let str = ''
            for (let c of response.constants) {
                str += c.name + '=' + c.value + '<br>'
            }

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('constant-list')
            cd.innerHTML = str

        })
        .catch(function (error) {
            // not much to do
            console.log(error)
        })
}

export function deleteShow() {
    console.log("Test delete successful")
}