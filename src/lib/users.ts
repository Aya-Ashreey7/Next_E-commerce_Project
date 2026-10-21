import fs from "fs";
import path from "path";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const filePath = process.env.VERCEL
  ? path.join("/tmp", "nextshop-users.json")
  : path.join(process.cwd(), "data", "users.json");

function readUsers(): User[] {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export function addUser(user: User) {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
}

export function findUserByEmail(email: string): User | undefined {
  const normalized = email.trim().toLowerCase();
  return readUsers().find((user) => user.email.toLowerCase() === normalized);
}

export function findUserById(id: string): User | undefined {
  return readUsers().find((user) => user.id === id);
}
