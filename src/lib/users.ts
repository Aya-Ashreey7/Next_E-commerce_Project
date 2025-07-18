
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export const users: User[] = [];

export function addUser(user: User) {
    users.push(user);
}

export function findUserByEmail(email: string): User | undefined {
    return users.find(user => user.email === email);
}

export function findUserById(id: string): User | undefined {
    return users.find(user => user.id === id);
} 