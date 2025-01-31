import { JWT_SECRET } from "@/utils/constants";
import { jwtVerify } from 'jose'
import { NextRequest } from "next/server";


interface JwtPayload {
    role: string;
    id?: string;
    iat: number;
    exp: number;
}

// export const tokenVerify = async (userToken: string, req: NextRequest): Promise<string | null> => {
//     const secret = JWT_SECRET
//     const token = req.cookies.get(userToken)
    
//     if (!token?.value) {
//         return null
//     }

//     try {
//         const { payload } = await jwtVerify(token.value, new TextEncoder().encode(secret));
//         // console.log(payload,"payload")
//         const data = payload as unknown as JwtPayload
//         return data.role
//     } catch (error) {
//         console.error('Token verification failed:', error);
//         return null;
//     }
// }


// export const tokenVerify = async (userToken: string, req: NextRequest): Promise<string | null> => {
//     const secret = new TextEncoder().encode(JWT_SECRET);

//     // Check for access token
//     const accessToken = req.cookies.get("accessToken")?.value;

//     if (accessToken) {
//         try {
//             // Verify the access token
//             const { payload } = await jwtVerify(accessToken, secret);
//             const data = payload as unknown as { role: string };
//             console.log(data.role)
//             console.log(data.role)
//             return data.role; // Return the role from the access token

//         } catch (error) {
//             console.error("Access token verification failed:", error);
//             // Access token is invalid, proceed to check refresh token
//         }
//     }

//     // If access token is not available or invalid, check for refresh token
//     const refreshToken = req.cookies.get("refreshToken")?.value;

//     if (!refreshToken) {
//         console.error("No refresh token available");
//         return null; // No refresh token available
//     }

//     try {
//         // Verify the refresh token
//         const { payload } = await jwtVerify(refreshToken, secret);
//         const data = payload as unknown as { role: string };

//         // Use the refresh token to get a new access token
//         const response = await fetch("/api/refresh-token", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ refreshToken }),
//         });

//         if (!response.ok) {
//             console.error("Failed to refresh access token");
//             return null; // Failed to refresh access token
//         }

//         const { accessToken: newAccessToken } = await response.json();

//         // Verify the new access token
//         const { payload: newPayload } = await jwtVerify(newAccessToken, secret);
//         const newData = newPayload as unknown as { role: string };

//         // Set the new access token in cookies (optional)
//         req.cookies.set("accessToken", newAccessToken);

//         return newData.role; // Return the role from the new access token
//     } catch (error) {
//         console.error("Refresh token verification or refresh failed:", error);
//         return null; // Refresh token is invalid or refresh failed
//     }
// };


// interface JwtPayload extends JWTPayload {
//     role: string;
// }

export const tokenVerify = async (userToken: string, req: NextRequest): Promise<string | null> => {
    const secret = new TextEncoder().encode(JWT_SECRET);

    // Function to verify a JWT token
    const verifyToken = async (token: string | undefined) => {
        if (!token) return null;
        try {
            const { payload } = await jwtVerify(token, secret);
            return payload as unknown as JwtPayload;
        } catch (error) {
            console.error("Token verification failed:", error);
            return null;
        }
    };

    // Step 1: Verify Access Token
    const accessToken = req.cookies.get("accessToken")?.value;
    let tokenData = await verifyToken(accessToken);

    if (tokenData) {
        return tokenData.role; // Access token is valid, return the role
    }

    // Step 2: If Access Token is expired or missing, verify Refresh Token
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
        console.error("No refresh token available");
        return null;
    }

    tokenData = await verifyToken(refreshToken);
    if (!tokenData) {
        return null; // Refresh token is also invalid
    }

    // Step 3: Request new access token
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            console.error("Failed to refresh access token");
            return null;
        }

        const { accessToken: newAccessToken } = await response.json();
        const newTokenData = await verifyToken(newAccessToken);
        if (!newTokenData) {
            return null;
        }

        // Step 4: Return the role from the new access token
        return newTokenData.role;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return null;
    }
};
