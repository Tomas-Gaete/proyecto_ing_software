"use client";
import { useState } from "react";

export default function Nav() {
	const [isOpen, setIsOpen] = useState(false);

	const updateUserSchedule = async () => {
		// Update the user's schedule
	}

	const updateDaySchedule = async () => {
		// Update the room's schedule
	}


	return (
		<nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-white dark:bg-black dark:shadow-[#212121] shadow-lg rounded-md lg:px-8 lg:py-3 ">
			<div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800 dark:text-gray-200">
				<a
					href="/"
					className="mr-4 block cursor-pointer py-1.5 text-base  dark:text-gray-200 text-slate-800 font-semibold"
				>
					Horario UAIN'T
				</a>
				<div className="hidden lg:block">
			
					
				</div>
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
			</div>
		</nav>
	);
}
