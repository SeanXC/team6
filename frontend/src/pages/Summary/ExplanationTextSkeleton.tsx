export default function ExplanationTextSkeleton() {
	return (
		[...Array(5)].map(() => <div
			className="flex flex-col w-full py-4 transition-colors duration-150 animate-pulse">
			<span className='bg-gray-400 w-full h-[1rem] mb-4 rounded-full'></span>
			<span className='bg-gray-400 w-8/12 h-[1rem] mb-4 rounded-full'></span>
			<span className='bg-gray-500 w-10/12 h-[1rem] rounded-full'></span>
		</div>
		)
	);
}