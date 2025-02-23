import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router';
import Login from '@pages/Login';
import Dashboard from '@/pages/Dashboard';
import SummaryPage from '@/pages/Summary';
import UpdateProfile from '@/pages/UpdateProfile';

function AppRouter(): React.ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/update-profile' element={<UpdateProfile/>}/>
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/summary/:id' element={<SummaryPage />} />
				<Route path='*' element={<Navigate to='/login' />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;