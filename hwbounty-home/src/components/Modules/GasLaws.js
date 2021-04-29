import { Button, Card, Collapse, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

const GasLaws = (props) => {
	const [p, setP] = useState(1);
	const [v, setV] = useState(22.4);
	const [n, setN] = useState(1);
	const [t, setT] = useState(273.15);
	const [expanded, setExpanded] = useState(false);
	const [solveFor, setSolveFor] = useState(0);
	const handleSelect = (event, newValue) => {
		setSolveFor(event.target.value)
	}
	const calculate = ()=>{
		
	}
	const handleTextChange = (event,nv,set)=>{
		set(event.target.value);
	}

	return (
		<Card>
			<Typography>Hi!</Typography>
			<Container>
				<TextField id="pressure" label="Pressure (ATM)" defaultValue={p} style={{
					margin: 5
				}
				} onChange={(ev,nv)=>handleTextChange(ev,nv,setP)} handle />
				<TextField id="volume" label="Volume (L)" defaultValue={v} style={{
					margin: 5
				}
				} onChange={(ev,nv)=>handleTextChange(ev,nv,setV)}/>
				<TextField id="moles" label="# of Moles (n)" defaultValue={n} style={{
					margin: 5
				}
				} onChange={(ev,nv)=>handleTextChange(ev,nv,setN)}/>
				<TextField disabled id="constant" label="Gas Constant (R)" defaultValue={0.0821} style={{
					margin: 5
				}
				} />
				<TextField id="temperature" label="Temperature (K)" defaultValue={t} style={{
					margin: 5
				}
				} onChange={(ev,nv)=>handleTextChange(ev,nv,setT)}/>
				<FormControl style={{
					margin: 5
				}
				} >
					<InputLabel id="demo-simple-select-label">Solve For</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={solveFor}
						onChange={handleSelect}
					>
						<MenuItem value={0}>Pressure</MenuItem>
						<MenuItem value={1}>Volume</MenuItem>
						<MenuItem value={2}>Molarity</MenuItem>
						<MenuItem value={3}>Temperature</MenuItem>
					</Select>
				</FormControl>
			</Container>
			<span>

			</span>


			<Collapse in={expanded}>

			</Collapse>
		</Card>
	);

}

const styles = {
	root: {
		height: "100%",
		flex: 1,
	},
};
const mapStateToProps = (state) => ({
	UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(GasLaws));