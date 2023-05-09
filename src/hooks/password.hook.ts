import { useState, useEffect } from 'react';

const usePassword = () => {
    const [showpassword, setShowPassword] = useState<boolean>();
    const [value, setValue] = useState<string>('');
    const [status, setStatus] = useState<string>();
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    function password_validate(p: string) {
        return strongRegex.test(p);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (value === '')
            setStatus('none');
        else if (password_validate(value))
            setStatus('valid');
        else
            setStatus('invalid');
    }, [value]);
    return {
        showpassword, setShowPassword,
        value, setValue,
        status
    };
};
export default usePassword;