import Link from 'next/link';
import { useEffect, useState } from 'react'

const NavBar = () => {
	const [openTab, setOpenTab] = useState(null);

	const handleClick = (tab: any) => {
		if (openTab === tab) {
			setOpenTab(null);
		} else {
			setOpenTab(tab);
		}
	}

	return (
		<nav className="flex items-center justify-between p-2 bg-transparent z-[9999]">
			<div className="relative">

				<button className="text-white text-4xl font-bold rounded-full focus:outline-none focus:shadow-outline-blue mr-10">
					<Link href="/">
						0xBold.art
					</Link>
				</button>

				<button onClick={() => handleClick('collections')} className="text-white text-3xl font-medium rounded-full focus:outline-none focus:shadow-outline-blue mr-10">
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

				<button onClick={() => handleClick('collections')} className="text-white text-3xl font-medium rounded-full focus:outline-none focus:shadow-outline-blue mr-10">
					About
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
