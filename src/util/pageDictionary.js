let lmBG = "rgb(250,250,250)";
let dmBG = "rgb(40,40,40)";
export const Pages = {
	Home: {
		name: "Home",
		desc: "The main landing page",
		tags: "home mainpage main dashboard nya",
		icon: "https://media.discordapp.net/attachments/806706215693975552/811328597297070150/dylandrip.png",
		defaultColorLightMode: lmBG,
		defaultColorDarkMode: dmBG,
		path: "/",
	},
	Schedule: {
		name: "Schedule",
		desc: "The Schedule page",
		tags: "class schedule time nya",
		icon: "https://i.ibb.co/Jpn86gb/KI-0fw7-R6ndtscv-ROmgu8-MYv-UO5di-Hf-EIrbtv-RGb-Lnv-Bdo72k-NIcy6t-RCklg-ILjkf-Krn-QQZGW9-CZx-CHH9-TN.png",
		defaultColorLightMode: lmBG,
		defaultColorDarkMode: dmBG,
		path: "/schedule",
	},
	ScheduleCatalog: {
		name: "Schedule Catalog",
		desc: "The Schedule catalog",
		tags: "class schedule time",
		icon: "https://i.ibb.co/RcMBq41/scatalog.png",
		defaultColorLightMode: lmBG,
		defaultColorDarkMode: dmBG,
		path: "/schedules",
	},
	Settings: {
		name: "Settings",
		desc: "Change stuff!",
		tags: "darkmode lightmode ",
		icon: "https://dazai.app/assets/img/scenery/Screen%20Shot%202021-03-02%20at%2011.45.47%20PM.png",
		defaultColorLightMode: lmBG,
		defaultColorDarkMode: dmBG,
		path: "/settings",
	}
}
export default Pages;