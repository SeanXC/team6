import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface EnsureLoggedInParams {
	navToLoginOnUnauthed: boolean;
}

/**
 * Checks if use is logged in or not
 * @param options Options for hook.
 * @param options.navToLoginOnUnauthed Whether the user should be redirected to `/login` if there is no token.
 * @returns Token if authenticated, if `navToLoginOnUnauthed` is enabled, navigates to login, otherwise throws error.
 */
function useAuthenticated({navToLoginOnUnauthed}: EnsureLoggedInParams): string | null {
	const [token, setToken] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const storedToken = localStorage.getItem('token');

		if (storedToken) {
			setToken(storedToken);
		} else {
			if (navToLoginOnUnauthed) {
			  	navigate('/login'); // Redirect to login screen
			} else {
			  	throw new Error('User is not authenticated');
			}
		}
	}, [navToLoginOnUnauthed, navigate]);

	return token;
}

export default useAuthenticated;