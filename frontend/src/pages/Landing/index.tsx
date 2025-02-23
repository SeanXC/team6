import { Link } from "react-router";

export default function LandingPage() {
	return (
		<div className="flex flex-col w-dvw h-dvh bg-gradient-to-br from-gray-800 to-gray-700 overflow-y-auto">
			<div className="w-full h-[80rem] flex flex-row">
				<div className="w-8/12">
					<h2 className="!text-6xl">Convocraft</h2>
					<h1 className="!text-9xl !font-bold`">Learn on your own terms.</h1>
				</div>
				<div className="w-4/12 relative">
					<Link to={{
						pathname: '/login'
					}}
					className="absolute top-0 right-0 p-4 bg-blue-950 box-border m-4 rounded-xl">Login
					</Link>
				</div>
			</div>
		</div>
	);
}