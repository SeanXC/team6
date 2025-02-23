import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router';
import Login from '@pages/Login';
import Dashboard from '@/pages/Dashboard';
import SummaryPage from '@/pages/Summary';
import UpdateProfile from '@/pages/UpdateProfile';
import LandingPage from '@/pages/Landing';

function AppRouter(): React.ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingPage />} />
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