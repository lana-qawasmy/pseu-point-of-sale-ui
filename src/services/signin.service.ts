const login = (email: string, password: string) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
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
    });
};

export default login;