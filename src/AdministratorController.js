import { get } from "./Api"

export function listVenues() { 
    get('/listVenues')
        .then(function (response) {

            let str = ''
            for (let c of response.constants) {
                str += c.venueName + '<br>'
            }

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('flex column scroll list1 pad')
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