export function authenticateUser (model, name) {
    let authenticateToken = document.getElementById("authenticatePageID").value
    let payload = {"authToken": authenticateToken}
    const response = fetch(
        {method: "POST", 
        body: JSON.stringify(payload)}).then((response) => response)

        const fetchResult = async() => {
            let val = await response
            let result = await val.json()
            document.getElementByld("result").value = result.body
        }
        fetchResult() 
}
