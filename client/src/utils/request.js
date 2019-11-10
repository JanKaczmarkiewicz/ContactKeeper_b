export default (input, init = {}) =>
fetch(input, setAdditionalHeaders(init))
    .then(res => res.json())
    .then(data => data.err 
        ?Promise.reject(data.err) //cut-through to .catch case
        :data
    )



const setAdditionalHeaders = init => {
    const extendedInit = {
        ...init
    };

    if (!extendedInit.headers) {
        extendedInit.headers = {}
    }

    const authToken = localStorage.getItem('token')
    if (authToken) {
        Object.assign(extendedInit.headers, {
            'Authorization': `Brearer ${authToken}`
        })
    }

    if (extendedInit.body) {
        Object.assign(extendedInit.headers, {
            'Content-Type': 'application/json'
        })
    }
    return extendedInit;
}
