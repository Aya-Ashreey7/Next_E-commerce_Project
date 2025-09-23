import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail, users } from "@/lib/users";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        console.log("Validate endpoint called with:", { email });
        console.log("Current users in store:", users.map(u => ({ id: u.id, email: u.email, name: u.name })));

        if (!email || !password) {
            console.log("Missing email or password");
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = findUserByEmail(email);
        console.log("User found:", user ? { id: user.id, email: user.email, name: user.name } : "No user found");

        if (!user) {
            console.log("User not found for email:", email);
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log("Password validation result:", isValidPassword);

        if (!isValidPassword) {
            console.log("Invalid password for user:", email);
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // ✅ Return user without password (manual object, no ESLint warning)
        const { id, name, email: userEmail } = user;
        const userWithoutPassword = { id, name, email: userEmail };

        console.log("Returning user:", userWithoutPassword);

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("Validation error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
