// Define a generic event template
export interface Activity {
	shortName: string; // (e.g. "MATH 101")
	name: string; // (e.g. "Mathematics")
	section?: string;
}

// Define an instance of an event with specific details
export interface ActivityInstance extends Activity {
	id: number;
	startTime: string;
	endTime: string;
	building: string; // Building name
	location: string; // Room number
	professor?: string;
	eventCategory: ActivityCategory;
}

export interface DailySchedule {
	updated: Date;
	activities: ActivityInstance[];
}

// Define the Activity categories
export type ActivityCategory =
	| "Cátedra"
	| "Ayudantía"
	| "Clases no Regulares"
	| "Mantención"
	| "Eventos UAI"
	| "Reunión"
	| "Taller"
	| "Laboratorio";
