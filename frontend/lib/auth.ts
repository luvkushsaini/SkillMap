export const setToken = (token: string) => {
    if (typeof window !== 'undefined') localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') return localStorage.getItem('token');
    return null;
};

export const removeToken = () => {
    if (typeof window !== 'undefined') localStorage.removeItem('token');
};

export const isLoggedIn = (): boolean => !!getToken();

export const saveUser = (user: object) => {
    if (typeof window !== 'undefined') localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
    if (typeof window !== 'undefined') {
        const u = localStorage.getItem('user');
        return u ? JSON.parse(u) : null;
    }
    return null;
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};
