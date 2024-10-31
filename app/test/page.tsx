"use client";

import { useEffect } from "react";
import { Activity, ActivityCategory, ActivityInstance } from "../types/Activity";
import UserSchedule from "../types/Schedule";

export default function TEST() {
	function parseUserSchedule(): UserSchedule {
		const rawResponse = `
_tieneSylabous,Sigla,Sección,Asignatura,Período Académico,Estado,Programa,Detalle
False,IND665,6,TALLER DE DESARROLLO DE CARRERA,S-SEM. 2024/2,Pendiente,,
False,ING300,1,TALLER DE INVESTIGACIÓN DIRIGIDA I,S-SEM. 2024/2,Pendiente,,
True,LID100,1,LIDERAZGO,S-SEM. 2024/2,Pendiente,,
True,TEI401,3,CAPSTONE PROJECT,S-SEM. 2024/2,Pendiente,,
True,ING480,1,DISEÑO DE PROCESOS Y SERVICIOS,S-SEM. 2024/2,Pendiente,,
True,TICS331,1,INGENIERÍA DE SOFTWARE,S-SEM. 2024/2,Pendiente,,
True,TICS312,1,SISTEMAS OPERATIVOS,S-SEM. 2024/2,Pendiente,,
True,TICS400,34,CORE: ARTE Y HUMANIDADES,S-SEM. 2024/2,Pendiente,,
True,TICS413,1,SEGURIDAD EN TI,S-SEM. 2024/2,Pendiente,,
`;

		const campus = "Peñalolén";

		// Split the data by lines
		const rows = rawResponse.trim().split("\n");
		const data: Activity[] = rows.slice(1).map((row) => {
			const values = row.split(",");
			return {
				shortName: values[1],
				section: values[2],
				name: values[3],
			};
		});
		return {
			campus,
			updated: new Date(),
			clases: data,
		};
	}

	const storeUserSchedule = (schedule: UserSchedule) => {
		const oldSchedule = localStorage.getItem("userSchedule");

		localStorage.setItem("userSchedule", JSON.stringify(schedule));
	};

	function parseDaySchedule(clases: UserSchedule): ActivityInstance[] {
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
				startTime: value[3].slice(0, 5), // trim the seconds
				endTime:  value[4].slice(0, 5),
				building: value[6],
				location: value[5].startsWith("CORE") ? value[5].slice(5) : value[5],
				professor,
				eventCategory: value[0] as ActivityCategory,
				shortName: userClass.shortName,
				name: name,
				section: section,
			};
		});
		return parsedData;
	}

	useEffect(() => {
		parseDaySchedule(parseUserSchedule());
	}, []);
	return (
		<div>
			<h1>Home</h1>
			<p>Welcome to the home page</p>
		</div>
	);
}
