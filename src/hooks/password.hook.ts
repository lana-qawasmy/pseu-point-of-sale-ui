import { useState, useEffect } from 'react';

const usePassword = () => {
    const [showPassword, setShowPassword] = useState<boolean>();
    const [value, setValue] = useState<string>('');
    const [status, setStatus] = useState<'valid' | 'invalid' | 'none'>();
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"); // eslint-disable-line

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
        showPassword, setShowPassword,
        value, setValue,
        status
    };
};
export default usePassword;