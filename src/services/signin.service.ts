const login = (email: string, password: string) => {
    return fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(async response => {
        return await response.json();
    }).catch(error => {
        console.error(error.message);
        return null;
    })
}

export default login;