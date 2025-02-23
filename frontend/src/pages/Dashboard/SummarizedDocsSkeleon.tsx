export default function SumerizedDocsSkeleton() {
	return (
		<ul className="space-y-6">
			{[...Array(5)].map((_, index) => (
				<li key={index} className="bg-gray-800 p-4 rounded-lg shadow-md animate-pulse list-none">
					<div className="h-6 bg-gray-600 rounded w-1/2 mb-4"></div>
					<div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
					<div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
					<div className="h-4 bg-gray-600 rounded w-3/4"></div>
				</li>
			))}
		</ul>
	);
}