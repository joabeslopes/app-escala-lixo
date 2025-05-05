const protocol = window.location.protocol;
const hostname = window.location.hostname;
const apiUrl = protocol + '//' + hostname + ':5000' + '/api';

export async function post(path, requestBody) {

    let apiResponse = await fetch(apiUrl + path,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody
        }
        ).then(response => response.json()
        ).catch(error => undefined);

    return apiResponse;
};

export async function get(path) {

    let apiResponse = await fetch(apiUrl + path,
        ).then(response => response.json()
        ).catch(error => undefined);

    return apiResponse;
};