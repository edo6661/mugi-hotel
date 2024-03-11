/**
 * @fileoverview This file contains all the routes and path related constants.
 * @package
 * @module route
 * @preferred
 *
 */
export const publicRoutes = ["/", "/auth/new-verification"];

export const authRoutes = [
  "/auth",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
