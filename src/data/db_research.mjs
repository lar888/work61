export const initialResearch = [
	{
		id: 1,
		image: "https://picsum.photos/640/480?random=1",
		title: "Electron and Proton Transfer in Proteins",
		description: "Life depends on the efficient movement of electrons and protons through protein structures. Our research focuses on the physical principles and structural determinants that govern these transfer processes, from redox cofactors to hydrogen-bonded networks. By combining biochemical, spectroscopic, and computational approaches, we seek to understand how proteins optimize charge transfer for processes such as respiration, photosynthesis, and enzymatic catalysis."
	},
	{
		id: 2,
		image: "https://picsum.photos/640/480?random=2",
		title: "Protein Interactions with Antibiotics",
		description: "The effectiveness of antibiotics is defined not only by their chemical structure but also by their precise interactions with target proteins. We investigate how antibiotics bind, alter, and inhibit bacterial proteins at the molecular level, as well as how resistance mutations reshape these interactions. Insights from our studies provide a framework for developing next-generation antimicrobial agents that can outpace the rapid evolution of bacterial resistance."
	},
	{
		id: 3,
		image: "https://picsum.photos/640/480?random=3",
		title: "Engineering Bacterial Hydrogenases",
		description: "Hydrogenases catalyze the reversible conversion of protons to molecular hydrogen, offering a natural blueprint for sustainable energy solutions. However, native hydrogenases often suffer from oxygen sensitivity and limited stability. Our work focuses on redesigning bacterial hydrogenases through protein engineering, directed evolution, and synthetic biology to enhance their robustness, catalytic efficiency, and applicability as biocatalysts in renewable energy technologies"
	},
	{
		id: 4,
		image: "https://picsum.photos/640/480?random=4",
		title: "Energy Conversion in Living Cells",
		description: "Energy conversion is at the heart of all cellular function. We study the fundamental biochemical processes by which cells harness chemical gradients, electron flow, and proton motive forces to generate ATP and drive metabolism. By dissecting the mechanisms of energy transduction at the molecular scale, our research illuminates the universal strategies evolved by living systems to sustain life under diverse environmental conditions."
	}
]

export const cloneInitialResearch = () => initialResearch.map((research) => ({ ...research }))
