import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://team6-production.up.railway.app';

export default function sendAuthedAxios(pathname: string, config: AxiosRequestConfig<unknown>, token: string | null) {
	if (!token || token === null) {
		throw new Error('Unable to send authed request: no user token found.');
	}

	const configHeaders = config.headers ?? {};

	config.url = `${BASE_URL}${pathname}`;

	config.headers = {
		...configHeaders,
		Authorization: `Bearer ${token}`
	};

	return axios(config);
}