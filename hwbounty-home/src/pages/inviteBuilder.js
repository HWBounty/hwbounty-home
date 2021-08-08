import {
  Button,
  Card,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Modal,
  Select,
  TextField,
  Typography,
  Zoom,
} from "@material-ui/core";
import {
  AddRounded,
  ChevronLeft,
  ChevronLeftRounded,
  CloseRounded,
  Remove,
} from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import useForceUpdate from "../util/useForceUpdate";
import t from "../util/localization/localization";

const useStyles = makeStyles({
  mainDiv: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  leftSidebar: {
    minWidth: "10vw",
    // height: "100%",
    padding: "4vmin",
    backgroundColor: "rgb(50,50,50)",
    textAlign: "left",
    float: "left",
  },
  mainSchedule: {
    backgroundColor: "rgb(100,100,100)",
    flexGrow: 1,
    paddingTop: "5vmin",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontFamily: "Oswald",
    fontSize: "4rem",
  },
  minititle: {
    fontFamily: "Poppins",
    fontSize: "1.5rem",
    // textAlign: "center",
  },
  listItemText: {
    fontFamily: "Nunito",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  classCard: {
    width: "80%",
    minHeight: "20vmin",
    borderRadius: "1vmin",
    margin: "1.25vmin",
    position: "relative",
  },
  classCardTitle: {
    marginTop: "5vmin",
    // justifySelf: "flex-start",
    marginLeft: "5vmin",
    marginRight: "5vmin",
    marginBottom: "1vmin",
    textAlign: "left",
    fontSize: "3.75rem",
    fontFamily: "Oswald",
  },
  classCardTime: {
    fontFamily: "Nunito",
    fontSize: "1.5rem",
    textAlign: "left",
    marginLeft: "5vmin",
    marginRight: "5vmin",
    marginBottom: "1vmin",
  },
  classCardRemoveButton: {
    position: "absolute",
    top: "10%",
    right: "5%",
  },
  classCardRemoveButtonIcon: {
    // color: "rgb(255,0,0)",
  },
  addButton: {
    backgroundColor: "rgb(75,75,75)",
  },

  blockBuilderCard: {
    minWidth: "100vmin",
    minHeight: "80vmin",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "5vmin",
  },
  flexModal: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  mediumTitle: {
    fontFamily: "Poppins",
    fontSize: "2.5rem",
    alignSelf: "center",
    margin: "1.25rem",
    marginTop: "0",
  },
  periodSelector: {
    fontSize: "1.75rem",
    height: "500px",
  },
  periodTitle: {
    fontSize: 50,
    fontFamily: "Oswald",
  },
  periodInput: {
    fontSize: 50,
  },
});
export const ScheduleBuilder = (props) => {
  const classes = useStyles(props);
  const [mondaySchedule, setMondaySchedule] = useState([
    {
      period: "period1",
      start: "11:30am",
      end: "12:30pm",
    },
  ]);
  const [tuesdaySchedule, setTuesdaySchedule] = useState([]);
  const [wednesdaySchedule, setWednesdaySchedule] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);
  const [nameOverrides, setNameOverrides] = useState({
    period1: "Period 1",
  });

  const [currentDay, setCurrentDay] = useState(0);
  const updateDay = (event, nv) => {
    setCurrentDay(nv);
  };
  const [createBlock, setCreateBlock] = useState(false);
  const forceUpdate = useForceUpdate();
  // let obj =    {
  //     period: "period1",
  //     start: "11:30am",
  //     end: "12:30pm",
  // }
  const periods = [
    "period1",
    "period2",
    "period3",
    "period4",
    "period5",
    "period6",
    "period7",
    "period8",
    "period9",
    "period10",
    "period11",
    "period12",
    "period13",
    "period14",
    "period15",
    "break",
  ];
  const cday = [
    mondaySchedule,
    tuesdaySchedule,
    wednesdaySchedule,
    thursday,
    friday,
    saturday,
    sunday,
  ][currentDay];
  const cdaySetter = [
    setMondaySchedule,
    setTuesdaySchedule,
    setWednesdaySchedule,
    setThursday,
    setFriday,
    setSaturday,
    setSunday,
  ][currentDay];
  const removeBlock = (index) => {
    cday.splice(index, 1);
    // console.log(cday);
    cdaySetter(cday);
    forceUpdate();
  };
  const addButtonClicked = () => {
    setCreateBlock(true);
  };
  const handleCreateBlockClose = () => {
    setCreateBlock(false);
  };
  const renderDays = () => {
    return cday.map((x, i) => {
      let startTime = moment(x.start, "hh:mma");
      let endTime = moment(x.end, "hh:mma");
      console.log(startTime.unix(), endTime.unix());
      return (
        <Card className={`${classes.classCard}`}>
          <Typography className={`${classes.classCardTitle}`}>
            {nameOverrides[x.period] || x.period}
          </Typography>
          <Typography className={`${classes.classCardTime}`}>
            {t("inviteBuilder.displayDuration", {
              start: x.start,
              end: x.end,
              duration: moment.duration(endTime - startTime).asMinutes(),
            })}
          </Typography>
          <IconButton
            className={`${classes.classCardRemoveButton}`}
            onClick={() => removeBlock(i)}
          >
            <Remove className={`${classes.classCardRemoveButtonIcon}`} />
          </IconButton>
        </Card>
      );
    });
  };
  return (
    <div className={`${classes.mainDiv}`}>
      <div className={`${classes.leftSidebar}`}>
        <Typography className={`${classes.title}`}>
          {t("inviteBuilder.scheduleBuilder")}
        </Typography>
        <Button>
          <ChevronLeftRounded /> {t("inviteBuilder.backToSearch")}
        </Button>
        <Typography className={`${classes.minititle}`}>
          {t("inviteBuilder.makeSchedule")}
        </Typography>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            selected={currentDay === 0}
            onClick={(event) => updateDay(event, 0)}
            className={`${classes.listItemText}`}
          >
            {t("days.monday")}
          </ListItem>
          <ListItem
            button
            selected={currentDay === 1}
            onClick={(event) => updateDay(event, 1)}
            className={`${classes.listItemText}`}
          >
            {t("days.tuesday")}
          </ListItem>
          <ListItem
            button
            selected={currentDay === 2}
            onClick={(event) => updateDay(event, 2)}
            className={`${classes.listItemText}`}
          >
            {t("days.wednesday")}
          </ListItem>
          <ListItem
            button
            selected={currentDay === 3}
            onClick={(event) => updateDay(event, 3)}
            className={`${classes.listItemText}`}
          >
            {t("days.thursday")}
          </ListItem>
          <ListItem
            button
            selected={currentDay === 4}
            onClick={(event) => updateDay(event, 4)}
            className={`${classes.listItemText}`}
          >
            {t("days.friday")}
          </ListItem>
          <ListItem
            button
            selected={currentDay === 5}
            onClick={(event) => updateDay(event, 5)}
            className={`${classes.listItemText}`}
          >
            {t("days.saturday")}
          </ListItem>
          <ListItem
            button
            selected={currentDay === 6}
            onClick={(event) => updateDay(event, 6)}
            className={`${classes.listItemText}`}
          >
            {t("days.sunday")}
            {/* <ListItemText primary="Sunday" className={`${classes.listItemText}`}/> */}
          </ListItem>
        </List>
      </div>
      <div className={`${classes.mainSchedule}`}>
        {renderDays()}
        <IconButton
          className={`${classes.addButton}`}
          onClick={addButtonClicked}
        >
          <AddRounded />
        </IconButton>
      </div>
      <Modal
        open={createBlock}
        onClose={handleCreateBlockClose}
        className={`${classes.flexModal}`}
      >
        <Zoom in={createBlock}>
          <Card className={`${classes.blockBuilderCard}`}>
            <Typography className={`${classes.mediumTitle}`}>
              {t("inviteBuilder.createSchedule")}
            </Typography>

            <div>
              <Typography className={`${classes.periodTitle}`}>
                {t("inviteBuilder.classStart")}
              </Typography>
              <TextField
                id="filled-basic"
                label="Start Time"
                variant="filled"
              />
              {/* <TextField label={ }></TextField> */}
            </div>
            <Autocomplete
              options={periods}
              getOptionLabel={(option) => nameOverrides[option] || option}
              style={{ width: 300 }}
              autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Period Name"
                  variant="outlined"
                  className={`${classes.periodSelector}`}
                />
              )}
            />
          </Card>
        </Zoom>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps)(ScheduleBuilder);
