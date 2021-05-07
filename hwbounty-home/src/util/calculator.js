import mathsteps from "mathsteps";
import * as math from "mathjs";
class CalculatorBackend{
    /** @type {CalculatorBackend} */
    static self = null;
    /** @type {Array<Equation>} */
    calcHistory = [];
    static parser = math.parser();
    constructor(){
        CalculatorBackend.self = this;
        console.log(mathsteps.ChangeTypes)
    }
    solveEquation(equation,type){
        // let equationParsable = false;
        // try {
        //     equationParsable = CalculatorBackend.parser.evaluate(equation);
        // } catch (error) {
            
        // }
        // if (!equationParsable){
        //     return null;
        // }
        let sol = new Equation(equation,0);
        this.calcHistory.push(sol);
        return sol;
    }
}
class Equation {
    /**
     * 
     * @param {String} equation 
     * @param {Number} type 
     */
    constructor(equation,type){
        this.equation = equation;
        /**
         * 
         */
        this.steps = [mathsteps.solveEquation][type || 0](equation);

    }
}
export default CalculatorBackend;