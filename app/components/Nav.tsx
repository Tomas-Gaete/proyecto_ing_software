"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
export default function Nav() {
	const [isOpen, setIsOpen] = useState(false);

	const updateUserSchedule = async () => {
		// Update the user's schedule
	};

	const updateDaySchedule = async () => {
	};

	return (
		<nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-white dark:bg-black dark:shadow-[#212121] shadow-lg rounded-md lg:px-8 lg:py-3 ">
			<div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800 dark:text-gray-200">
				<a
					href="/"
					className="mr-4 block cursor-pointer py-1.5 text-base  dark:text-gray-200 text-slate-800 font-semibold"
				>
					Horario UAINT
				</a>
				<div className="hidden lg:block"></div>
				<div className="items-center hidden gap-x-2 lg:flex ">
					<div className="w-full flex flex-row max-w-sm min-w-[200px]">
						<button
							type="button"
							onClick={updateUserSchedule}
							className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg text-sm px-3 py-2.5 text-center me-2 "
						>
							Actualizar Horario
						</button>
						<button
							type="button"
							onClick={updateDaySchedule}
							className="text-white w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-3 py-2.5 text-center me-2"
						>
							Actualizar Salas Hoy
						</button>
						<button onClick={() => signOut()}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								width="24"
								height="24"
								stroke-width="2"
							>
								<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
								<path d="M9 12h12l-3 -3"></path>
								<path d="M18 15l3 -3"></path>
							</svg>
						</button>
					</div>
				</div>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
					type="button"
				>
					<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					</span>
				</button>
			</div>
			<div className={`${isOpen ? "block" : "hidden"} w-full`}>
				<ul className="flex flex-col border-t-2 dark:border-gray-200 border-black gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
					{/* Add each list item here */}
					<li className="flex items-center p-1 text-sm gap-x-2 dark:text-gray-200 text-slate-600">
						<button
							type="button"
							onClick={updateUserSchedule}
							className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2"
						>
							Actualizar Horario
						</button>
					</li>
					<li className="flex items-center p-1 text-sm gap-x-2 dark:text-gray-200 text-slate-600">
						<button
							type="button"
							onClick={updateDaySchedule}
							className="text-white w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
						>
							Actualizar Salas Hoy
						</button>
					</li>
				</ul>
				<button onClick={() => signOut()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						width="24"
						height="24"
						stroke-width="2"
					>
						<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
						<path d="M9 12h12l-3 -3"></path>
						<path d="M18 15l3 -3"></path>
					</svg>
				</button>
			</div>
		</nav>
	);
}
