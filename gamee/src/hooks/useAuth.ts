import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { LoginUser, RegisterUser, useUser } from './useUser'
const BACKENDURL = import.meta.env.VITE_BACKENDURL as string;
const AUTHURL = BACKENDURL + '/auth';
const UPDATEUSERURL = BACKENDURL + '/user';
export const useAuth = () => {
    const { user, addUser, removeUser, setUser } = useUser();
    const { getItem } = useLocalStorage();

    const fetchUser = useCallback(async () => {
        const storedUser = getItem('user');

        if (storedUser) {
            addUser(JSON.parse(storedUser));
            const updatedUser = await fetch(UPDATEUSERURL + '/' + JSON.parse(storedUser).id);
            if (updatedUser.ok) {
                const data = await updatedUser.json();
                addUser(data);
            }

        }
    }, [addUser, getItem]); // Only re-run if `addUser` or `getItem` changes

    useEffect(() => {
        fetchUser(); // Fetch user once when the component mounts
    }, [fetchUser]);

    const login = async (user: LoginUser) => {
        const url = AUTHURL + '/login';

        const body = new URLSearchParams();
        body.append('name', user.name);
        body.append('password', user.password);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });


        if (response.ok) {
            const data = await response.json();

            addUser(data);
        } else {
            throw new Error('Login Failed');
        }
    };

    const signUp = async (user: RegisterUser) => {
        const url = AUTHURL + '/register';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const data = await response.json();

        } else {
            throw new Error('Signup Failed');
        }
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout, setUser, signUp };
};
