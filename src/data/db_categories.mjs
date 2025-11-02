export const initialCategories = [
	{
		id: 1,
		title: "Biophysics",
		alias: "biophysics"
	},
	{
		id: 2,
		title: "Biochemistry",
		alias: "biochemistry"
	},
	{
		id: 3,
		title: "Electron Transfer",
		alias: "electron-transfer"
	},
	{
		id: 4,
		title: "Biology",
		alias: "biology"
	},
	{
		id: 5,
		title: "Bioenergetics",
		alias: "bioenergetics"
	}
]

export const cloneInitialCategories = () => initialCategories.map((category) => ({ ...category }))