import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
    email: string;
    password: string;
};

type AuthContextType = {
    loggedUser: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    register: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOGGED_USER_KEY = "loggedUser";

/**
 * Retrieve a user by email.
 */
function getUser(email: string): User | null {
    const userData = localStorage.getItem(email);
    return userData ? JSON.parse(userData) : null;
}

/**
 * Check if the entered password matches the stored password.
 */
function checkPassword(email: string, password: string): boolean {
    const user = getUser(email);
    return user ? user.password === password : false;
}

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [loggedUser, setLoggedUser] = useState<string | null>(
        localStorage.getItem(LOGGED_USER_KEY)
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedUser(localStorage.getItem(LOGGED_USER_KEY));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    /**
     * Register a new user.
     */
    function register(user: User) {
        if (localStorage.getItem(user.email)) {
            throw new Error("Такой пользователь уже зарегистрирован");
        }

        localStorage.setItem(user.email, JSON.stringify(user));
        localStorage.setItem(LOGGED_USER_KEY, user.email);
        setLoggedUser(user.email);
    }

    /**
     * Log in a user.
     */
    function login(email: string, password: string) {
        if (!checkPassword(email, password)) {
            throw new Error("Неверный email или пароль");
        }

        localStorage.setItem(LOGGED_USER_KEY, email);
        setLoggedUser(email);
    }

    /**
     * Log out the user.
     */
    function logout() {
        localStorage.removeItem(LOGGED_USER_KEY);
        setLoggedUser(null);
    }

    return (
        <AuthContext.Provider value={{ loggedUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to use authentication context.
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
