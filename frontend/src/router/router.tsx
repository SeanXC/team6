import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router';
import Login from '@pages/Login';
import UploadPage from '@/pages/Upload';
import Dashboard from '@/pages/Dashboard';
import SummaryPage from '@/pages/Summary';

function AppRouter(): React.ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/upload' element={<UploadPage />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/summary/:id' element={<SummaryPage />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;