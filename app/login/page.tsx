"use client";

import { useState } from "react";
import Typewriter from "../components/Typewriter";
import { Activity } from "../types/Activity";
import UserSchedule from "../types/Schedule";
import { authenticateWithIntranet } from "../server";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const onSubmit = async () => {
		//Aqui mostrar un spinner o algo pa que sepa que esta cargando

		/**
		 *  Juntar el web scraping de la página de la UAI con esta función
		 * para conseguir el horario del usuario.
		 *
		 * llamarla solo cuando el usuario inicie sesión asi no guardamos
		 * información privada innecesaria.
		 *
		 */
		async function getUserSchedule(rawResponse: string): Promise<UserSchedule> {
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
		const userData = await authenticateWithIntranet({ email, password });
		if (!userData) {
			setLoading(false);
			//TODO mostrar error
			return;
		}
		console.log(userData);
		const res = await signIn("credentials", {
			email: email,
			password: password,
			redirect: false,
		});
		if (res?.error) {
			setLoading(false);
			//TODO mostrar error
			return;
		}

		const horario = localStorage.getItem("HU-userSchedule");

		if (horario) {
			localStorage.removeItem("HU-userSchedule");
		}

		//TODO: Implementar la lógica de inicio de sesión y llamar bien la función de getUserSchedule
		const userSchedule = await getUserSchedule(userData);
		if (!userSchedule) {
			//error buscando su horario o algo
			return;
		}

		localStorage.setItem("HU-userSchedule", JSON.stringify(userSchedule));
		router.push("/"); // arreglar la ruta
	};

	return (
		<form className="space-y-6">
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
							type="button"
							onClick={onSubmit}
							className="w-full bg-black text-white py-2 my-3 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
						>
							Iniciar Sesión
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default LoginPage;
