import asyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";


import { registerUser,loginUser,getCurrentUser,logoutUser } from "../services/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  return res
    .status(201)
    .cookie("accessToken", result.token, cookieOptions)
    .json(
      new ApiResponse(
        201,
        result.user,
        "User registered successfully"
      )
    );
});


export const login = asyncHandler(async (req, res) => {

  const result = await loginUser(req.body);

  return res
    .status(200)
    .cookie("accessToken", result.token, cookieOptions)
    .json(
      new ApiResponse(
        200,
        result.user,
        "Login successful"
      )
    );
});


export const me = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Current user fetched successfully"
    )
  );
});


export const logout = asyncHandler(async (req, res) => {
  await logoutUser();

  return res
    .clearCookie("accessToken")
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "Logged out successfully"
      )
    );
});


