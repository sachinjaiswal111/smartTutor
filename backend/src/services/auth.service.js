import { eq } from "drizzle-orm";
import "dotenv/config";


import {db } from "../config/db.js"

import { users } from "../db/schema/index.js";

import { hashPassword ,comparePassword} from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = async ({ username, email, password, role }) => {
    // Check username
    const existingUsername = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);
    // console.log(' i am heree -----')

  if (existingUsername.length > 0) {
    throw new ApiError(409, "Username already exists");
  }
  

  // Check email
  const existingEmail = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingEmail.length > 0) {
    throw new ApiError(409, "Email already exists");
  }
  

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const [newUser] = await db
    .insert(users)
    .values({
      username,
      email,
      passwordHash,
      role,
    })
    .returning();

  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }

  // Generate JWT
  const token = generateToken({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });

  return {
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      description: newUser.description,
      createdAt: newUser.createdAt,
    },
    token,
  };
};

export const loginUser = async ({ email, password }) => {

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);


  const user = result[0];


  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }


  const isPasswordValid = await comparePassword(
    password,
    user.passwordHash
  );


  if (!isPasswordValid) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }


  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });


  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      description: user.description,
      createdAt: user.createdAt,
    },
    token,
  };
};



export const getCurrentUser = async (userId) => {
  const result = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role,
      description: users.description,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const user = result[0];

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};


export const logoutUser = async () => {
  return true;
};