"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Nav() {
	return (
		<nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-white dark:bg-black dark:shadow-[#212121] shadow-lg rounded-md lg:px-8 lg:py-3">
			<div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800 dark:text-gray-200">
				<a
					href="/"
					className="mr-4 block cursor-pointer py-1.5 text-base dark:text-gray-200 text-slate-800 font-semibold"
				>
					Horario UAINT
				</a>
				<div className="hidden lg:block"></div>
				<div className="items-center hidden gap-x-2 lg:flex ml-auto">
					<div className="w-full flex flex-row max-w-sm min-w-[200px] justify-end">
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
								strokeWidth="2"
							>
								<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
								<path d="M9 12h12l-3 -3"></path>
								<path d="M18 15l3 -3"></path>
							</svg>
						</button>
					</div>
				</div>
				{/* Replacing the mobile dropdown button with the logout button */}
				<button
					onClick={() => signOut()}
					className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
					type="button"
				>
					<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							width="24"
							height="24"
							strokeWidth="2"
						>
							<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
							<path d="M9 12h12l-3 -3"></path>
							<path d="M18 15l3 -3"></path>
						</svg>
					</span>
				</button>
			</div>
		</nav>
	);
}
