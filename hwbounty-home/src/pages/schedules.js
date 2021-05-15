import { ButtonBase, Card, Container, List, makeStyles, Paper, Tab, Tabs, TextField, Typography } from "@material-ui/core"
import axios from "axios";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

const useStyles = makeStyles({
	catalogLeft: {
		width: "40%",
		height: "100%",
		display: "inline-flex",
		alignItems: "center",
		flexDirection: "column",
		verticalAlign: "top",
	},
	catalogLeftTitle: {
		width: "80%",
		marginLeft: "20%",
		marginRight: "0%",
		margin: "5%",
		textAlign: "left",
	},
	catalogLeftSearchBox: {
		width: "70%",
		marginLeft: "10%",
		height: "200px",
		fontSize: "2vw",
	},
	catalogTitleText: {
		fontSize: "4vw",
		fontFamily: "Oswald",
		fontWeight: "100",

	},
	catalogTitleCaption: {
		fontSize: "1.5vw",
		fontFamily: "Nunito",
		fontWeight: "100",

	},
	catalogItemCard: {
		minHeight: "70%",
		maxHeight: "70%",
		width: "384px",
		display: "inline-flex",
		justifyContent: "flex-start",
		flexDirection: "column",
		margin: "1rem",
		padding: "1rem",
	},
	catalogItemCardButton: {
		display: "inline-flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		padding: "0px",
		width: "100%",
	},
	catalogItemTitle: {
		fontSize: "2vw",
		textAlign: "center",
		fontFamily: "Poppins",
	},
	catalogItemsDiv: {
		width: "55%",
		minWidth: "512px",
		height: "90vh",
		display: "inline-flex",
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",

	},
	scheduleDisplay: {
		width: "100%",

		height: "40%",
	},
	scheduleList: {
		marginBottom: "5%",
		overflow: "scroll",
		maxHeight: "50vh!important",
	},
	scheduleDisplayTab:{
		maxWidth: "14.283%",
		width: "14.283%",
		minWidth: "14.283%",
	},
	scheduleDisplayPeriod: {
		fontSize: "1.5vw",
		fontFamily: "Nunito",
	},
	scheduleDisplayPeriodTime: {
		fontSize: "1vw",
		fontFamily: "Nunito",
	}
});
export const ScheduleCatalog = (props) => {
	const {
		UI: { theme },
	} = props;
	const [schedulesSearch, setSchedulesSearch] = useState(null);
	const [lschedulesSearch, setLSchedulesSearch] = useState(false);
	const [schedulesResult, setschedulesResult] = useState([]);
	if (schedulesSearch && lschedulesSearch !== schedulesSearch) {
		setLSchedulesSearch(schedulesSearch);
		(async () => {
			let res = await axios.get(`https://api.hwbounty.help/schedules/search/${schedulesSearch}`).catch(console.trace);
			setschedulesResult(res.data);
			console.log(schedulesResult);
		})();
	}
	if (window.innerWidth < 1300) {
		return null;
	}
	return (<DesktopLayout theme={theme} schedulesSearch={schedulesSearch} setSchedulesSearch={setSchedulesSearch} schedulesResult={schedulesResult} />)
}

const DisplayedScheduleDay = (props) => {
  const classes = props.classes;
  const data = props.data;
  const day = props.day;
  let overrides = JSON.parse(data.nameOverrides);
  let dayschedule = JSON.parse(data.schedule)[
    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ][day]
  ].map((x) => {
    return Object.assign(x, {
      period: overrides[x.period] || x.period,
    });
  });
  const renderPeriods = () => {
    let children = React.Children.toArray(
      dayschedule.map((x) => {
        return (
          <Container style={
		  {
			  textAlign:"left",
		  }
		  }>
            <Typography className={`${classes.scheduleDisplayPeriod}`}>{x.period}</Typography>
            <Typography className={`${classes.scheduleDisplayPeriodTime}`}>{x.timeStart}-{x.timeEnd}</Typography>
          </Container>
        );
      })
    );
    if (!children.length)
      return <Typography variant="h3">No School Today!</Typography>;
    return children;
  };
  return (
    <Container
      style={{
        marginBottom: "5%",
      }}
	  className = {`${classes.scheduleList}`}
    >
      {renderPeriods()}
    </Container>
  );
};
const ScheduleItem = (props) => {
	let scheduleData = props.schedule;
	let theme = props.theme;
	const classes = useStyles(theme);
	const [cTab,setCTab] = useState(0);
	const updateTab = (ev,nv)=>{
		setCTab(nv);
	}
	/*
	{
	"id": 1,
	"public": 1,
	"schedule": "{\"timePeriod\":\"America/Los_Angeles\",\"monday\":[{\"period\":\"period1\",\"timeStart\":\"10:00am\",\"timeEnd\":\"10:30am\"},{\"period\":\"period2\",\"timeStart\":\"10:40am\",\"timeEnd\":\"11:10am\"},{\"period\":\"period3\",\"timeStart\":\"11:20am\",\"timeEnd\":\"11:50am\"},{\"period\":\"period4\",\"timeStart\":\"12:00pm\",\"timeEnd\":\"12:35pm\"},{\"period\":\"break\",\"timeStart\":\"12:35pm\",\"timeEnd\":\"1:05pm\"},{\"period\":\"period5\",\"timeStart\":\"1:15pm\",\"timeEnd\":\"1:45pm\"},{\"period\":\"period6\",\"timeStart\":\"1:55pm\",\"timeEnd\":\"2:25pm\"},{\"period\":\"period7\",\"timeStart\":\"2:35pm\",\"timeEnd\":\"3:05pm\"}],\"tuesday\":[{\"period\":\"period1\",\"timeStart\":\"9:00am\",\"timeEnd\":\"10:15am\"},{\"period\":\"period2\",\"timeStart\":\"10:25am\",\"timeEnd\":\"11:40am\"},{\"period\":\"break\",\"timeStart\":\"11:40am\",\"timeEnd\":\"12:10pm\"},{\"period\":\"period3\",\"timeStart\":\"12:20pm\",\"timeEnd\":\"1:40pm\"},{\"period\":\"period4\",\"timeStart\":\"1:50pm\",\"timeEnd\":\"3:05pm\"},{\"period\":\"period8\",\"timeStart\":\"3:10pm\",\"timeEnd\":\"3:40pm\"}],\"wednesday\":[{\"period\":\"period5\",\"timeStart\":\"9:40am\",\"timeEnd\":\"10:55am\"},{\"period\":\"period9\",\"timeStart\":\"11:05am\",\"timeEnd\":\"11:40am\"},{\"period\":\"break\",\"timeStart\":\"11:40am\",\"timeEnd\":\"12:10pm\"},{\"period\":\"period6\",\"timeStart\":\"12:20pm\",\"timeEnd\":\"1:40pm\"},{\"period\":\"period7\",\"timeStart\":\"1:50pm\",\"timeEnd\":\"3:05pm\"},{\"period\":\"period8\",\"timeStart\":\"3:10pm\",\"timeEnd\":\"3:40pm\"}],\"thursday\":[{\"period\":\"period1\",\"timeStart\":\"9:00am\",\"timeEnd\":\"10:15am\"},{\"period\":\"period2\",\"timeStart\":\"10:25am\",\"timeEnd\":\"11:40am\"},{\"period\":\"break\",\"timeStart\":\"11:40am\",\"timeEnd\":\"12:10pm\"},{\"period\":\"period3\",\"timeStart\":\"12:20pm\",\"timeEnd\":\"1:40pm\"},{\"period\":\"period4\",\"timeStart\":\"1:50pm\",\"timeEnd\":\"3:05pm\"},{\"period\":\"period8\",\"timeStart\":\"3:10pm\",\"timeEnd\":\"3:40pm\"}],\"friday\":[{\"period\":\"period5\",\"timeStart\":\"9:40am\",\"timeEnd\":\"10:55am\"},{\"period\":\"period9\",\"timeStart\":\"11:05am\",\"timeEnd\":\"11:40am\"},{\"period\":\"break\",\"timeStart\":\"11:40am\",\"timeEnd\":\"12:10pm\"},{\"period\":\"period6\",\"timeStart\":\"12:20pm\",\"timeEnd\":\"1:40pm\"},{\"period\":\"period7\",\"timeStart\":\"1:50pm\",\"timeEnd\":\"3:05pm\"},{\"period\":\"period8\",\"timeStart\":\"3:10pm\",\"timeEnd\":\"3:40pm\"}],\"saturday\":[],\"sunday\":[]}",
	"name": "Gunn HS Schdeule",
	"description": "This is the **first** schedule that was added to HWBounty!",
	"schoolCalLink": null,
	"createdBy": 0,
	"nameOverrides": "{\"period1\":\"Period 1\",\"period2\":\"Period 2\",\"period3\":\"Period 3\",\"period4\":\"Period 4\",\"period5\":\"Period 5\",\"period6\":\"Period 6\",\"period7\":\"Period 7\",\"period8\":\"Tutorial\",\"period9\":\"SELF/Gunn Together\",\"break\":\"Lunch\"}",
	"lastUpdated": "1618863485050"
	}
	*/
	return (
		<Paper
		className={`${classes.scheduleDisplay}`}
		>
			<Tabs
				variant="fullWidth"
				centered
				scrollButtons="auto"
				indicatorColor="primary"
				textColor="primary"
				value = {cTab}
				onChange = {updateTab}
			>
				<Tab label="M" className={`${classes.scheduleDisplayTab}`} />
				<Tab label="T" className={`${classes.scheduleDisplayTab}`} />
				<Tab label="W" className={`${classes.scheduleDisplayTab}`} />
				<Tab label="Th" className={`${classes.scheduleDisplayTab}`} />
				<Tab label="F" className={`${classes.scheduleDisplayTab}`} />
				<Tab label="Sa" className={`${classes.scheduleDisplayTab}`} />
				<Tab label="Su" className={`${classes.scheduleDisplayTab}`} />
			</Tabs>
			<List>
              {cTab === 0 && (
                <DisplayedScheduleDay
                  day={cTab}
                  data={scheduleData}
				  classes = {classes}
                />
              )}
              {cTab === 1 && (
                <DisplayedScheduleDay
                  day={cTab}
                  data={scheduleData}
				  classes = {classes}
                />
              )}
              {cTab === 2 && (
                <DisplayedScheduleDay
                  day={cTab}
                  data={scheduleData}
				  classes = {classes}
                />
              )}
              {cTab === 3 && (
                <DisplayedScheduleDay
                  day={cTab}
                  data={scheduleData}
				  classes = {classes}
                />
              )}
              {cTab === 4 && (
                <DisplayedScheduleDay
                  day={cTab}
                  data={scheduleData}
				  classes = {classes}
                />
              )}
              {cTab === 5 && (
                <DisplayedScheduleDay
                  day={cTab}
                  data={scheduleData}
				  classes = {classes}
                />
              )}
              {cTab === 6 && (
                <DisplayedScheduleDay
                  day={cTab}
                  data={scheduleData}
				  classes = {classes}
                />
              )}
            </List>
		</Paper>
	)
}
const DesktopLayout = (props) => {
	const { theme, schedulesSearch, setSchedulesSearch, schedulesResult } = props;
	const classes = useStyles(theme);
	const query = (e, nv) => {
		setSchedulesSearch(nv || e.target.value)
	}
	const mapToCards = (arr) => {
		return React.Children.toArray(arr.map(schedule => {
			return (
				<Card className={`${classes.catalogItemCard}`} onClick={null}>
						<Typography className={`${classes.catalogItemTitle}`}>{schedule.name}</Typography>
						<ScheduleItem schedule={schedule} theme={theme}/>

				</Card>
			)
			return null;
		}));
	}
	return (
		<div>
			<div className={`${classes.catalogLeft}`}>
				<div className={`${classes.catalogLeftTitle}`}>
					<Typography className={`${classes.catalogTitleText}`}>
						Schedule Catalog
			</Typography>
					<Typography className={`${classes.catalogTitleCaption}`}>
						Find the schedule format for your school!
			</Typography>
				</div>
				<TextField id="searchBox" variant="outlined" label="What school are you from?" className={`${classes.catalogLeftSearchBox}`} value={schedulesSearch} onChange={query} />
			</div>
			<div className={`${classes.catalogItemsDiv}`}>
				{mapToCards(schedulesResult)}
			</div>
		</div>


	)
};


const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});

export default connect(mapStateToProps)(ScheduleCatalog);