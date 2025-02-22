import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

// Axios instance
const api = axios.create({
	baseURL: 'https://team6-production.up.railway.app/',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Axios api hook
function useAxios<T>(url: string, method: Method, options: AxiosRequestConfig = {}) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<AxiosError | null>(null);

	// try to fetch data
	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await api.request({
				url,
				method,
				...options,
			});

			setData(response.data);
			return response.data;
		} catch (err) {
			setError(err as AxiosError);
		} finally {
			setLoading(false);
		}
	};

	// fetch
	useEffect(() => {
		fetchData();
	}, [url]);

	return {
		data,
		loading,
		error,
	};
};

export default useAxios;