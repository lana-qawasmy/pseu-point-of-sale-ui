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
        try {
            return { state: response.status === 200, value: await response.json() };
        } catch (error) {
            console.error(error);
            return { state: false, value: {} };
        }
    }).catch(error => {
        console.error(error.message);
        return { state: false, value: {} };
    });
};

export default login;