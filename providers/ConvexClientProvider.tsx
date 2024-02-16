"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const CONVEXURL = process.env.NEXT_PUBLIC_CONVEX_URL!;

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const convex = new ConvexReactClient(CONVEXURL);

if (!PUBLISHABLE_KEY || !CONVEXURL) {
  throw new Error("Missing Publishable Key & Convex URL ");
}

export default function ConvexClientProvider({
  children,
}: ConvexClientProviderProps) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {/* <Authenticated>{children}</Authenticated> */}
        {children}
        <AuthLoading>
          {/* when logged in */}
          <p>test loading</p>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
