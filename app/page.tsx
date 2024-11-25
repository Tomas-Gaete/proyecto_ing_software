"use client";
import Nav from "./components/Nav";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import {
	ActivityCategory,
	ActivityInstance,
	DailySchedule,
} from "./types/Activity";
import UserSchedule from "./types/Schedule";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { getDayScheduleRaw } from "./server";

export default function Home() {
	const router = useRouter();
	const currentDate = new Date();
	const [schedule, setSchedule] = useState<ActivityInstance[]>([]);
	const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

	useEffect(() => {
		/**
		 * takes a UserSchedule object and returns an array of ActivityInstance objects
		 * that represent the user's schedule for the day.
		 *
		 * @param clases
		 * @returns
		 */
		async function getDaySchedule(
			clases: UserSchedule
		): Promise<DailySchedule> {
			const rawResponse = await getDayScheduleRaw();
			if (!rawResponse) return new Promise((resolve, reject) => reject());
			// Split the data by lines
			const rows = rawResponse.trim().split("\n");
			const EventRegex = /^(.+?)\sSec\.(\d+)\sProf\.(.+)$/;

			// Parse the rest of the rows into objects
			const parsedData = rows.slice(1).flatMap((row, index) => {
				// Split the row by commas considering quoted strings
				const value = row.match(/(".*?"|[^",]+?)(?=\s*,|\s*$)/g);
				if (!value) return [];
				//match the campus
				if (clases.campus != value[7].trim()) return [];
				// Parse the event name, section, and professor
				const match = EventRegex.exec(value[1].replace(/"/g, ""));
				let name: string = "",
					section = "",
					professor = "";
				if (match) {
					name = match[1];
					section = match[2];
					professor = match[3];
				}

				const userClass = clases.clases.find(
					(clase) => clase.name === name && clase.section === section
				);

				if (!userClass) return [];
				return {
					id: index,
					startTime: value[3].slice(0, 5), // trim the seconds
					endTime: value[4].slice(0, 5),
					building: value[6],
					location: value[5].startsWith("CORE") ? value[5].slice(5) : value[5],
					professor,
					eventCategory: value[0] as ActivityCategory,
					shortName: userClass.shortName,
					name: name,
					section: section,
				};
			});

			return {
				updated: new Date(),
				activities: parsedData,
			};
		}

		const userSchedule = localStorage.getItem("HU-userSchedule");
		if (!userSchedule) {
			router.replace("/login");
			return;
		}

		const dailySchedule = localStorage.getItem("HU-dailySchedule");
		if (dailySchedule) {
			const parsedSchedule: DailySchedule = JSON.parse(dailySchedule);
			const lastUpdated = new Date(parsedSchedule.updated);
			setLastUpdated(lastUpdated);
			const diff = currentDate.getTime() - lastUpdated.getTime();
			const diffHours = Math.floor(diff / (1000 * 60 * 60));
			if (diffHours <= 8) {
				console.log("Using cached schedule");
				return;
			}
		}
		console.log("Updating schedule");
		//if it didn't return, it means we need to update the schedule
		getDaySchedule(JSON.parse(userSchedule))
			.then((schedule) => {
				if (schedule) {
					localStorage.setItem("HU-dailySchedule", JSON.stringify(schedule));
					setSchedule(schedule.activities);
				} else {
					toast.error("Error al actualizar el horario");
				}
			})
			.catch(() => {
				toast.error("Hubo un problema al cargar el horario.");
			});
	}, []);

	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
				<div className="animate-spin h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent"></div>
			</div>
		);
	}

	if (status === "unauthenticated" || !session) {
		console.log("No hay sesion");
		router.replace("/login");
		return null;
	}

	const notify = () => toast("Here is your toast.");

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
								Actualizado hace:{" "}
								{lastUpdated
									? `${Math.floor(
											(new Date().getTime() - lastUpdated.getTime()) /
												(1000 * 60 * 60)
									  )} horas ${Math.floor(
											((new Date().getTime() - lastUpdated.getTime()) %
												(1000 * 60 * 60)) /
												(1000 * 60)
									  )} minutos`
									: ""}
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
									No tienes clases hoy
								</p>
							)}
						</div>
					</div>
				</main>
			</div>
			<Toaster />
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
