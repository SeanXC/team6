export default function UploadListItemsSkeleton() {
	return (
		[...Array(5)].map((_, index) => 
		<div key={index} className="flex flex-col w-full p-4 border-b-[1px] border-white last:border-0 hover:bg-gray-600 transition-colors duration-150">
			<span className='bg-gray-400 w-8/12 h-[1rem] mb-4 rounded-full'></span>
			<span className='bg-gray-500 w-6/12 h-[1rem] rounded-full'></span>
		</div>
		)
	);
}