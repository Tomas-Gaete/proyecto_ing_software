import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Nav from "../components/Nav";

interface TableData {
  [key: string]: string | number;
}

const ExcelTable_test: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const filePath = __dirname + "../files/eventos.xlsx"; // Ruta relativa al archivo en `public`
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Toma el primer nombre de hoja
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: TableData[] = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      } catch (error) {
        console.error("Error al leer el archivo Excel:", error);
      }
    };

    fetchExcelData();
  }, []);

  return (
    <div>
      <h1>Tabla de datos extraídos</h1>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                y aqui que pasa
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando datos...</p>
      )}




<Nav />
			<div className="container mx-auto">
	
							
								<ul className="space-y-4">
                  {data.map((row, index) => (
                    <li key={index} className="flex items-center p-4 bg-gray-100 dark:bg-zinc-900 dark:border border-zinc-800 rounded-lg overflow-x-auto">
                      

                      <div className="flex-shrink-0 mr-4">
						            <Clock startTime={String(row['Inicio'])} />

											</div>
											<div className="flex-grow">
												<h3 className="font-semibold">{row['Evento']}</h3>
												<p className="text-sm text-gray-500">
													{row['Inicio']} - {row['Fin']}
												</p>
											</div>
                      <div>
												<p className="">
													{(() => {
														let style;
														switch (row['Edificio']) {
															case "Edificio Pregrado A":
															case "Edificio A":
																style =
																	"bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400";
																break;
															case "Edificio Pregrado B":
																style =
																	"bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-400 border border-yellow-500";
																break;

															case "Edificio Postgrado C":
																style =
																	"bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-500";
																break;

															default:
																style =
																	"bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500";
																break;
														}
														return (
															<span className={style}>{row['Sala']}</span>
                              
														);
													})()}
                          		<p className="text-sm text-gray-500">
													{row['Campus']}
												</p>
												</p>
											</div>




                      
                    </li>
                  ))}
									
								</ul>
						
						</div>
					</div>
			




















			



  );
};

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

export default ExcelTable_test;
