export const initialTags = [
	{
		id: 1,
		title: "protein folding",
		alias: "protein-folding"
	},
	{
		id: 2,
		title: "molecular dynamics",
		alias: "molecular-dynamics"
	},
	{
		id: 3,
		title: "simulation",
		alias: "simulation"
	},
	{
		id: 4,
		title: "biophysics",
		alias: "biophysics"
	},
	{
		id: 5,
		title: "enzymes",
		alias: "enzymes"
	},
	{
		id: 6,
		title: "metabolism",
		alias: "metabolism"
	},
	{
		id: 7,
		title: "catalysis",
		alias: "catalysis"

	},
	{
		id: 8,
		title: "electron transport",
		alias: "electron-transport"
	},
	{
		id: 9,
		title: "photosynthesis",
		alias: "photosynthesis"
	},
	{
		id: 10,
		title: "redox",
		alias: "redox"
	},
	{
		id: 11,
		title: "genetics",
		alias: "genetics"
	},
	{
		id: 12,
		title: "developmental biology",
		alias: "developmental-biology"
	},
	{
		id: 13,
		title: "gene regulation",
		alias: "gene-regulation"
	},
	{
		id: 14,
		title: "ATP",
		alias: "ATP"
	},
	{
		id: 15,
		title: "proton gradient",
		alias: "proton-gradient"
	},
	{
		id: 16,
		title: "energy metabolism",
		alias: "energy-metabolism"
	},
	{
		id: 17,
		title: "ion channels",
		alias: "ion-channels"
	},
	{
		id: 18,
		title: "cryo-EM",
		alias: "cryo-EM"
	},
	{
		id: 19,
		title: "membrane proteins",
		alias: "membrane-proteins"
	},
	{
		id: 20,
		title: "metabolomics",
		alias: "metabolomics"
	},
	{
		id: 21,
		title: "disease biomarkers",
		alias: "disease-biomarkers"
	},
	{
		id: 22,
		title: "protein misfolding",
		alias: "protein-misfolding"
	},
	{
		id: 23,
		title: "neurodegeneration",
		alias: "neurodegeneration"
	},
	{
		id: 24,
		title: "lipids",
		alias: "lipids"
	},
	{
		id: 25,
		title: "cancer",
		alias: "cancer"
	},
	{
		id: 26,
		title: "respiration",
		alias: "respiration"
	},
	{
		id: 27,
		title: "cytochrome",
		alias: "cytochrome"
	},
	{
		id: 28,
		title: "quantum biology",
		alias: "quantum-biology"
	},
	{
		id: 29,
		title: "bioelectronics",
		alias: "bioelectronics"
	},
	{
		id: 30,
		title: "chloroplasts",
		alias: "chloroplasts"
	},
	{
		id: 31,
		title: "photophosphorylation",
		alias: "photophosphorylation"
	},
	{
		id: 32,
		title: "protein interactions",
		alias: "protein-interactions"
	},
	{
		id: 33,
		title: "ligands",
		alias: "ligands"
	},
	{
		id: 34,
		title: "binding affinity",
		alias: "binding-affinity"
	},
	{
		id: 35,
		title: "biomechanics",
		alias: "biomechanics"
	},
	{
		id: 36,
		title: "cell motility",
		alias: "cell-motility"
	},
	{
		id: 37,
		title: "biodiversity",
		alias: "biodiversity"
	},
	{
		id: 38,
		title: "aging",
		alias: "aging"
	},
	{
		id: 39,
		title: "epigenetics",
		alias: "epigenetics"
	},
	{
		id: 40,
		title: "stem cells",
		alias: "stem-cells"
	},
	{
		id: 41,
		title: "biosensors",
		alias: "biosensors"
	},
	{
		id: 42,
		title: "structural biology",
		alias: "structural-biology"
	},
	{
		id: 43,
		title: "energy conversion",
		alias: "energy-conversion"
	},
	{
		id: 44,
		title: "drug discovery",
		alias: "drug-discovery"
	},
	{
		id: 45,
		title: "nanomechanics",
		alias: "nanomechanics"
	},
	{
		id: 46,
		title: "quantum effects",
		alias: "quantum-effects"
	},
	{
		id: 47,
		title: "synthetic biology",
		alias: "synthetic-biology"
	},
	{
		id: 48,
		title: "biochemistry",
		alias: "biochemistry"
	},
	{
		id: 49,
		title: "biology",
		alias: "biology"
	},
	{
		id: 50,
		title: "bioenergetics",
		alias: "bioenergetics"
	},
	{
		id: 51,
		title: "differentiation",
		alias: "differentiation"
	},
	{
		id: 52,
		title: "mitochondria",
		alias: "mitochondria"
	},
	{
		id: 53,
		title: "oxidative phosphorylation",
		alias: "oxidative-phosphorylation"
	}
]

export const cloneInitialTags = () => initialTags.map((tag) => ({ ...tag }))
