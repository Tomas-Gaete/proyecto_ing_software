"use client";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";
import {
	ActivityCategory,
	ActivityInstance,
	DailySchedule,
} from "./types/Activity";
import UserSchedule from "./types/Schedule";

export default function Home() {
	const currentDate = new Date();
	const [schedule, setSchedule] = useState<ActivityInstance[]>([
		{
			id: 1,
			name: "Mathematics",
			shortName: "MATH 101",
			startTime: "09:00",
			endTime: "10:30",
			building: "A",
			location: "Room 101",
			eventCategory: "Cátedra",
		},
		{
			id: 2,
			name: "Computer Science",
			shortName: "COMP 101",
			startTime: "11:00",
			endTime: "12:30",
			building: "A",
			location: "Lab 3",
			eventCategory: "Cátedra",
		},
		{
			id: 3,
			name: "Physics",
			startTime: "14:00",
			shortName: "PHYS 101",
			endTime: "15:30",
			building: "B",
			location: "Room 205",
			eventCategory: "Cátedra",
		},
		{
			id: 4,
			name: "English Literature",
			shortName: "ENGL 101",
			startTime: "16:00",
			endTime: "17:30",
			building: "C",
			location: "Room 302",
			eventCategory: "Cátedra",
		},
		{
			id: 7,
			name: "English Literature",
			shortName: "ENGL 101",
			startTime: "16:00",
			endTime: "17:30",
			building: "A",
			location: "Room 302",
			eventCategory: "Cátedra",
		},
		{
			id: 5,
			name: "English Literature",
			shortName: "ENGL 101",
			building: "A",
			startTime: "16:00",
			endTime: "17:30",
			location: "Room 302",
			eventCategory: "Cátedra",
		},
		{
			id: 6,
			name: "English Literature",
			shortName: "ENGL 101",
			startTime: "16:00",
			endTime: "17:30",
			location: "Room 302",
			eventCategory: "Cátedra",
			building: "A",
		},
	]);

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("es-US", {
			weekday: "long",
			month: "long",
			day: "numeric",
		});
	};

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
			//-----------------------------------------------------------------------
			//aqui juntar el web scraping para traer el horario del dia y procesarlo
			//-----------------------------------------------------------------------

			const rawResponse = `
Tipo,Evento,Fecha,Inicio,Fin,Sala,Edificio,Campus
Eventos UAI,ANÁLISIS POST ELECCIONES ,2024-10-30,08:00:00,10:25:00,D-311,Edificio D,Viña del Mar
Eventos UAI,Análisis post electoral,2024-10-30,08:00:00,11:00:00,B-111 AUDITORIO,Edificio B,Viña del Mar
Reunión,Obra de teatro UAI,2024-10-30,08:00:00,12:59:00,AUDITORIO-A,Edificio Pregrado A,Peñalolén
Clases no Regulares,Claudio Seebach,2024-10-30,08:15:00,11:30:00,SALA DE ESTUDIO 9,Edificio Vitacura,Vitacura
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.1 Prof.INSAUSTI,C.",2024-10-30,08:30:00,09:40:00,CORE 110-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.2 Prof.DÍAZ,J.",2024-10-30,08:30:00,09:40:00,CORE 211-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.3 Prof.CONTRERAS,P.",2024-10-30,08:30:00,09:40:00,CORE 209-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.4 Prof.DE PRADO,J.",2024-10-30,08:30:00,09:40:00,CORE 107-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.5 Prof.BUKSDORF,D.",2024-10-30,08:30:00,09:40:00,CORE 109-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.6 Prof.ILABACA,P.",2024-10-30,08:30:00,09:40:00,CORE 212-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.7 Prof.BASCUÑÁN,M.",2024-10-30,08:30:00,09:40:00,CORE 201-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.8 Prof.LARRAÍN,J.",2024-10-30,08:30:00,09:40:00,CORE 111-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.9 Prof.FARAH,C.",2024-10-30,08:30:00,09:40:00,CORE 207-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: LITERATURA Y HUMANIDADES II Sec.10 Prof.ALONSO,F.",2024-10-30,08:30:00,09:40:00,CORE 106-F,Edificio Pregrado F,Peñalolén
Cátedra,"BELLAS ARTES Y ARTES INDUSTRIALES: LAS PARADOJAS DEL ARTE Sec.1 Prof.LEIVA,G.",2024-10-30,08:30:00,09:40:00,001-B,Edificio Pregrado B,Peñalolén
Cátedra,"INTRODUCCIÓN A LA MACROECONOMÍA  Sec.1 Prof.HERRERA,A.",2024-10-30,08:30:00,09:40:00,102-A,Edificio Pregrado A,Peñalolén
Cátedra,"INTRODUCCIÓN A LA MACROECONOMÍA  Sec.2 Prof.PEREZ,M.",2024-10-30,08:30:00,09:40:00,106-A,Edificio Pregrado A,Peñalolén
Cátedra,"CORE: ARTE Y HUMANIDADES Sec.23 Prof.AROS ,L.",2024-10-30,08:30:00,09:40:00,CORE 203-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: ARTE Y HUMANIDADES Sec.24 Prof.KARMELIC,L.",2024-10-30,08:30:00,09:40:00,CORE 202-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: ARTE Y HUMANIDADES Sec.25 Prof.ARELLANO,J.",2024-10-30,08:30:00,09:40:00,CORE 204-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: ARTE Y HUMANIDADES Sec.26 Prof.MARTÍNEZ,J.",2024-10-30,08:30:00,09:40:00,CORE 206-F,Edificio Pregrado F,Peñalolén
Cátedra,"CORE: ARTE Y HUMANIDADES Sec.34 Prof.ALVARADO,M.",2024-10-30,08:30:00,09:40:00,CORE 205-F,Edificio Pregrado F,Peñalolén

`;

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
			//Toast diciendo q inicie sesion de nuevo o algo
			//pq no guardamos el horario
			//en vola cerrarle la sesion
			return;
		}

		const dailySchedule = localStorage.getItem("HU-dailySchedule");
		if (dailySchedule) {
			const parsedSchedule: DailySchedule = JSON.parse(dailySchedule);
			const lastUpdated = new Date(parsedSchedule.updated);
			const diff = currentDate.getTime() - lastUpdated.getTime();
			const diffHours = Math.floor(diff / (1000 * 60 * 60));
			if (diffHours > 8) {
				// only use the schedule if it's less than 8 hours old
				setSchedule(parsedSchedule.activities);
				return;
			}
		}
		//if it didn't return, it means we need to update the schedule

		getDaySchedule(JSON.parse(userSchedule)).then((schedule) => {
			if (schedule) {
				localStorage.setItem("HU-dailySchedule", JSON.stringify(schedule));
				setSchedule(schedule.activities);
			} else {
				//TODO: Toast diciendo q hubo un error al actualizar el horario
			}
		});
	}, [currentDate]);

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
