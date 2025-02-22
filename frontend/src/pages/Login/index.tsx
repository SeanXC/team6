import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

function Login(): React.ReactElement {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "implicit", // ✅ Ensures the response includes an ID token
    onSuccess: async (tokenResponse) => {
      try {
        console.log("✅ Google Token Received:", tokenResponse);

        // ✅ Send the ID token to backend for authentication
        const res = await axios.post("https://team6-production.up.railway.app/auth/google", {
          token: tokenResponse.access_token, // ✅ Ensure backend verifies ID token, not access token
        });

        console.log("✅ Backend Response:", res.data);

        // ✅ Store token & user details in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ Redirect user to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("❌ Google Login Error:", error);
      }
    },
    onError: (error) => console.log("❌ Login Failed:", error),
  });

  return (
    <section className='h-[100vh] flex justify-center items-center w-'>
      <div className="bg-gray-700 rounded-lg p-6 space-y-4 md:space-y-6 w-sm">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl">
          Sign in
        </h1>
        <div className='flex items-center justify-center'>
          <div className="px-6 sm:px-0 max-w-sm">
            <button
              onClick={() => googleLogin()}
              type="button"
              className="cursor-pointer text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
            >
              <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Sign in with Google
              <div></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;