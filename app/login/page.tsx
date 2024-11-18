"use client";

import { useState } from "react";
import Typewriter from "../components/Typewriter";
import { Activity } from "../types/Activity";
import UserSchedule from "../types/Schedule";

import { useRouter } from "next/navigation";
import { signIn } from "@/auth";
import { on } from "events";

const LoginPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//Aqui mostrar un spinner o algo pa que sepa que esta cargando

		/**
		 *  Juntar el web scraping de la página de la UAI con esta función
		 * para conseguir el horario del usuario.
		 *
		 * llamarla solo cuando el usuario inicie sesión asi no guardamos
		 * información privada innecesaria.
		 *
		 */
		async function getUserSchedule(): Promise<UserSchedule> {
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

		setLoading(true);
		const res = await signIn("credentials", {
			email: email,
			password: password,
			redirect: false,
		});
		if (res.error) {
			setLoading(false);
			//TODO mostrar error
			return;
		} else {
			setLoading(false);
			//TODO mostrar que inicio sesion correctamente
		}

		const horario = localStorage.getItem("HU-userSchedule");

		if (horario) {
			localStorage.removeItem("HU-userSchedule");
		}

		//TODO: Implementar la lógica de inicio de sesión y llamar bien la función de getUserSchedule
		const userSchedule = await getUserSchedule();
		if (!userSchedule) {
			//error buscando su horario o algo
			return;
		}

		localStorage.setItem("HU-userSchedule", JSON.stringify(userSchedule));
		router.push("/schedule"); // arreglar la ruta
	};

	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="min-h-screen flex items-center justify-center bg-black">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
					<Typewriter />
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<div className="mt-2 ">
							<input
								id="email"
								name="email"
								type="email"
								required
								autoComplete="email"
								onChange={(e) => setEmail(e.target.value)}
								className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="py-2">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								required
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
								className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="w-full bg-black text-white py-2 my-3 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
						>
							Iniciar Sesión
						</button>
					</div>

					<div className="text-sm my-1">
						<a href="#" className="font-semibold hover:text-indigo-500">
							No tienes una cuenta?
						</a>
					</div>

					<div className="mt-4 w-12">
						<a href="/" className="w-12">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</form>
	);
};

export default LoginPage;
