"use client";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [schedule, setSchedule] = useState([
		{
			id: 1,
			name: "Mathematics",
			startTime: "09:00",
			endTime: "10:30",
			building: "A",
			location: "Room 101",
		},
		{
			id: 2,
			name: "Computer Science",
			startTime: "11:00",
			endTime: "12:30",
			building: "A",
			location: "Lab 3",
		},
		{
			id: 3,
			name: "Physics",
			startTime: "14:00",
			endTime: "15:30",
			building: "B",
			location: "Room 205",
		},
		{
			id: 4,
			name: "English Literature",
			startTime: "16:00",
			endTime: "17:30",
			building: "C",
			location: "Room 302",
		},
		{
			id: 7,
			name: "English Literature",
			startTime: "16:00",
			endTime: "17:30",
			building: "A",
			location: "Room 302",
		},
		{
			id: 5,
			name: "English Literature",
			startTime: "16:00",
			endTime: "17:30",
			location: "Room 302",
		},
		{
			id: 6,
			name: "English Literature",
			startTime: "16:00",
			endTime: "17:30",
			location: "Room 302",
		},
	]);

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("es-US", {
			weekday: "long",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="h-screen">
			<Nav />
			<div className="container mx-auto">
				<main className="flex-grow container mx-auto px-4 py-8">
					<div className="border rounded-lg shadow-md p-6 bg-white dark:bg-black">
						<h1 className="text-3xl font-semibold text-center my-2">
							Horario Peñalolen
						</h1>
						<div className="border-b pb-4 mb-4">
							<h3 className="text-black text-lg font-bold text-center mx-0 w-full dark:text-gray-200">
								{formatDate(currentDate)}
							</h3>
							<h6 className="text-center text-sm mx-0 w-full text-zinc-500">
								Última actualizacíon hace: Platanito
							</h6>
						</div>
						<div>
							{schedule.length > 0 ? (
								<ul className="space-y-4">
									{schedule.map((item) => (
										<li
											key={item.id}
											className="flex items-center p-4 bg-gray-100 dark:bg-zinc-900 dark:border border-zinc-800 rounded-lg overflow-x-auto"
										>
											<div className="flex-shrink-0 mr-4">
												<Clock startTime={item.startTime} />
											</div>
											<div className="flex-grow">
												<h3 className="font-semibold">{item.name}</h3>
												<p className="text-sm text-gray-500">
													{item.startTime} - {item.endTime}
												</p>
											</div>
											<div>
												<p className="">
													{(() => {
														let style;
														switch (item.building) {
															case "A":
																style =
																	"bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400";
																console.log(item);
																break;
															case "B":
																style =
																	"bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-400 border border-yellow-500";
																break;

															case "C":
																style =
																	"bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-500";
																break;

															default:
																style =
																	"bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500";
																break;
														}
														return (
															<span className={style}>{item.location}</span>
														);
													})()}
												</p>
											</div>
										</li>
									))}
								</ul>
							) : (
								<p className="text-center text-gray-500 dark:text-gray-200">
									No classes scheduled for today.
								</p>
							)}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

const Clock = ({ startTime }: { startTime: string }) => {
	const [hours, minutes] = startTime.split(":").map(Number);
	const hourDeg = (hours % 12) * 30 + minutes * 0.5; // 360 degrees / 12 hours
	const minuteDeg = minutes * 6; // 360 degrees / 60 minutes

	return (
		<svg
			width="48"
			height="48"
			viewBox="0 0 100 100"
			className="relative stroke-black dark:stroke-white"
		>
			<circle
				cx="50"
				cy="50"
				r="45"
				strokeWidth="5"
				className="fill-white stroke-black dark:stroke-white dark:fill-black "
			/>
			<circle cx="50" cy="50" r="2" className="fill-black dark:fill-white" />
			{/* Minute hand */}
			<line
				x1="50"
				y1="50"
				x2="50"
				y2="15"
				stroke=""
				strokeWidth="5" // Thicker line for minute hand
				transform={`rotate(${minuteDeg}, 50, 50)`}
			/>
			{/* Hour hand */}
			<line
				x1="50"
				y1="50"
				x2="50"
				y2="25"
				strokeWidth="5"
				transform={`rotate(${hourDeg}, 50, 50)`}
			/>
		</svg>
	);
};
