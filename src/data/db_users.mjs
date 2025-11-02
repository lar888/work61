export const initialUsers = [
	{
		id: 1,
		image: "https://picsum.photos/640/480?random=1",
		member: "Alice Morgan - Post Doctoral Researcher",
		description: "Focuses on protein folding mechanisms and misfolding in neurodegenerative diseases. Her work combines biochemical assays with computational simulations to understand how proteins adopt stable structures and what happens when these processes go wrong, providing insights into Alzheimer’s and Parkinson’s disease."
	},
	{
		id: 2,
		image: "https://picsum.photos/640/480?random=2",
		member: "Benjamin Carter - PhD Candidate",
		description: "Researching biophysical models of mitochondrial energy conversion and ATP synthase function. He investigates how energy is generated at the molecular level and seeks to uncover novel mechanisms that could lead to new approaches in metabolic engineering and bio-inspired energy systems."
	},
	{
		id: 3,
		image: "https://picsum.photos/640/480?random=3",
		member: "Clara Liu - Post Doctoral Researcher",
		description: "Specializes in cryo-electron microscopy for structural analysis of ribosomal complexes. Her research focuses on high-resolution visualization of protein synthesis machinery, aiming to capture dynamic structural changes that occur during translation and antibiotic interactions."
	},
	{
		id: 4,
		image: "https://picsum.photos/640/480?random=4",
		member: "David Romero - PhD Candidate",
		description: "Investigating lipid-protein interactions and their role in membrane signaling. By integrating molecular simulations with experimental data, he studies how lipid composition influences protein activity and signaling pathways crucial for cellular communication."
	},
	{
		id: 5,
		image: "https://picsum.photos/640/480?random=5",
		member: "Elena Petrova - Post Doctoral Researcher",
		description: "Explores enzyme kinetics and the molecular basis of drug resistance. She is particularly interested in understanding how mutations alter enzyme activity, contributing to resistance in pathogenic organisms and complicating current therapeutic approaches."
	}
]

export const cloneInitialUsers = () => initialUsers.map((users) => ({ ...users }))
