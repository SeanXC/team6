export interface User {
    googleId: string;
    name: string;
    email: string;
    age: number | 0;
    interests: string[];
    token?: string;
}