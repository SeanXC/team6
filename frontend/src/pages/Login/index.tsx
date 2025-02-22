import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';

function Login(): React.ReactElement {
	const [interest, setInterest] = useState<string>('')
	const [formData, setFormData] = useState<{age: number | '', interests: string[]}>({
		age: '',
		interests: [],
	});

	const interestDelete = (indexToDelete: number): void => {
		setFormData({age: formData.age, interests: formData.interests.filter((_item, index) => index !== indexToDelete)})
	}

	const addInterest = () => {
		if (interest) {
			let newInterests = formData.interests
			newInterests.push(interest)
			setFormData({age: formData.age, interests: newInterests});
			setInterest('')	
		}
	}

	const handleFormSubmit = () => {
		// form submit
	}

	const googlelogin = useGoogleLogin({
		onSuccess: tokenResponse => console.log(tokenResponse),
		onError: error => console.log(error),
	});

	return (
		<section className='h-[100vh] flex justify-center items-center w-'>
			{/* <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
				Sign in
			</h1>
			<div className='flex items-center justify-center'>
				<div className="px-6 sm:px-0 max-w-sm">
					<button onClick={() => googlelogin()} type="button" className="cursor-pointer text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
				</div>
			</div> */}

			<div className="flex flex-col items-center justify-center w-sm px-6 py-8 mx-auto">
				<div className="bg-white rounded-lg w-full">
					<div className="p-6 space-y-4 md:space-y-6">
						<h1 className="text-xl text-center font-bold text-gray-900">
							About you
						</h1>
						<div className='flex items-center justify-center w-full'>
							<form className="flex flex-col w-full" onSubmit={() => handleFormSubmit()}>
								{/* age */}
								<div className='mb-2'>
									<label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Age</label>
									<input type="number" id="age" value={formData.age} onChange={(e) => setFormData({...formData, age: Number(e.target.value)})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
								</div>
								{/* interets */}
								<div className='mb-2'>
									<label htmlFor="interest" className="block mb-2 text-sm font-medium text-gray-900">Your Interests</label>
									<div className='relative'>
										<input type="text" id="interest" value={interest} onChange={(e) => setInterest(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
										<span onClick={() => addInterest()} className="absolute top-0 text-gray-900 cursor-pointer right-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add</span>
									</div>
									{/* list of interest */}
									<div className='flex flex-wrap my-3'>
										{ formData.interests.map((name, index) =>
											<div key={index} className='flex border-gray-500 border mr-2 mb-2 px-2 py-1 rounded'>
												<span className='text-gray-900 text-sm'>{name}</span>
												<p className='cursor-pointer pt-[6px] p-1 flex' onClick={() => interestDelete(index)}><svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" fill="none"><path d="M5 5L19 19M5 19L19 5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></p>
											</div>
										)}
									</div>
								</div>
								{/* submit form */}
								<button type="submit" className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;