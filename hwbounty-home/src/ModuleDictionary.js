import { Functions, Warning } from "@material-ui/icons";

/**
 * @type {Map<String,ModuleData}
 * 
 */
const ModuleDictionary = new Map();

/** @type {ModuleData} */
const CalculatorModule = {
	icon: <Functions />, //JSX Material Icon
	id: "calculatorModule", //Internal Name
	displayName: "Calculator", //End User sees this name
	thumbnail: "", //Add later
	path: "/m/calculator", //Path to module (all modules will start with /m/)
	description: "A Calculator :D", // just a description
	pinnable: true,
}
/** @type {ModuleData} */
const 
ModuleDictionary.set("calculatorModule", CalculatorModule);


export default ModuleDictionary;


//If a module cannot be found
/** @type {ModuleData} */
export const UnknownModule = {
	icon: <Warning />, //JSX Material Icon
	id: "unknownModule", //Internal Name
	displayName: "Unknown Module", //End User sees this name
	thumbnail: "", //Add later
	path: "/", //Path to module (all modules will start with /m/)
	description: "The module you are looking for has been thanos snapped. Our apologies", // just a description
	pinnable: false,
}
/**
 * @typedef {Object} ModuleData
 * @property {JSX.Element} icon
 * @property {String} id
 * @property {String} displayName
 * @property {String} thumbnail
 * @property {String} path
 * @property {String} description
 * @property {Boolean} pinnable
 */
