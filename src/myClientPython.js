const apiUrl = import.meta.env.VITE_API_URL;

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