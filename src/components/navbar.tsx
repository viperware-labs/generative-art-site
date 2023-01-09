import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useEffect, useState } from 'react'

const NavBar = () => {
	const [openTab, setOpenTab] = useState(null);
	const [isFadingOut, setIsFadingOut] = useState(false);

	const handleClick = (tab: any) => {
		if (openTab === tab) {
			setIsFadingOut(true);
			setTimeout(() => {
				setOpenTab(null);
				setIsFadingOut(false);
			}, 500);
		} else {
			setOpenTab(tab);
		}
	}

	return (
		<>

			{/* Mobile */}
			<nav className="flex sm:hidden items-center justify-between p-2 bg-transparent z-[9999] w-full">
				<div className="relative justify-start">

					<button className="text-white text-4xl font-bold rounded-full focus:outline-none focus:shadow-outline-blue w-full text-left my-1">
						<Link href="/">
							0xBold.art
						</Link>
					</button>

					<button onClick={() => handleClick('collections')} className="text-white text-3xl font-medium rounded-full focus:outline-none focus:shadow-outline-blue w-full text-left my-1">
						Collections
					</button>


					{openTab === 'collections' && (
						<div className={isFadingOut ? 'fixed bottom-0 left-0 h-auto w-full bg-white rounded-md shadow-xl overflow-y-scroll fade-out' : 'fixed bottom-0 left-0 h-auto w-full bg-white rounded-md shadow-xl overflow-y-scroll fade-in'}>
							<Link href="/flows">
								<div onClick={() => handleClick('collections')} className="block tracking-wider font-bold px-4 py-4 text-2xl text-gray-700 hover:bg-gray-100">
									Flows
								</div>
							</Link>
							<Link href="/joints">
								<div onClick={() => handleClick('collections')} className="block tracking-wider font-bold px-4 py-4 text-2xl text-gray-700 hover:bg-gray-100">
									Joints
								</div>
							</Link>
							<Link href="/">
								<div onClick={() => handleClick('collections')} className="block tracking-wider font-bold px-4 py-4 text-2xl text-gray-700 hover:bg-gray-100">
									?????
								</div>
							</Link>
							<div className="h-10" />
						</div>
					)}

					<button onClick={() => handleClick('about')} className="text-white text-3xl font-medium rounded-full focus:outline-none focus:shadow-outline-blue w-full text-left my-1">
						About
					</button>
				</div>

			</nav>

			{/* Desktop */}
			<nav className="hidden sm:flex items-center justify-between p-2 bg-transparent z-[9999] w-full">
				<div className="relative">

					<button className="text-white text-4xl font-bold rounded-full focus:outline-none focus:shadow-outline-blue">
						<Link href="/">
							0xBold.art
						</Link>
					</button>

					<button onClick={() => handleClick('collections')} className="text-white text-3xl font-medium rounded-full focus:outline-none focus:shadow-outline-blue">
						Collections
					</button>

					{openTab === 'collections' && (
						<div className="absolute top-9 left-[11.5rem] mt-4 py-2 w-48 bg-white rounded-md shadow-xl">
							<Link href="/flows">
								<div onClick={() => handleClick('collections')} className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100">
									Flows
								</div>
							</Link>
							<Link href="/joints">
								<div onClick={() => handleClick('collections')} className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100">
									Joints
								</div>
							</Link>
							<Link href="/">
								<div onClick={() => handleClick('collections')} className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100">
									?????
								</div>
							</Link>
						</div>
					)}

					<button onClick={() => handleClick('collections')} className="text-white text-3xl font-medium rounded-full focus:outline-none focus:shadow-outline-blue">
						About
					</button>
				</div>

				<div className="text-sm ml-auto">
					<ConnectButton />
				</div>

			</nav>
		</>
	);
};

export default NavBar;
