// import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
// import Dialog from '@material-ui/core/Dialog';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import {Checkbox, CircularProgress, Divider, FormGroup, withStyles} from "@material-ui/core";
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         maxWidth: 360,
//         backgroundColor: theme.palette.background.paper,
//     },
//     paper: {
//         width: '80%',
//         maxHeight: 435,
//     },
//     dialogContent: {
//         paddingTop: 8,
//         paddingBottom: 0
//     },
//     progress: {
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         marginBottom: 8
//     },
// }));
//
// const GreenCheckbox = withStyles({
//     root: {
//         color: 'rgba(79,162,0,0.88)',
//         '&$checked': {
//             color: 'rgba(79,162,0,0.88)',
//         },
//     },
//     checked: {},
// })((props) => <Checkbox color="default" {...props} />);
//
//
// const MyDialog = (props) => {
//     const {agrTypes, checkboxes, setCheckboxes, checkedAgrTypesIDs, setCheckedAgrTypesIDs, setOpen, open, ...other} = props;
//     const classes = useStyles()
//
//     const clearCheckboxes = () => {
//         const updatedCb = checkboxes.map(() => false)
//         setCheckboxes(updatedCb)
//     }
//
//     return (
//         <Dialog
//             maxWidth="xs"
//             aria-labelledby="set-agr-types"
//             open={open}
//             {...other}
//         >
//             <DialogTitle id="set-agr-types">Типы договоров</DialogTitle>
//             <DialogContent dividers className={classes.dialogContent}>
//                 <FormGroup>
//                     {(() => {
//                         if (!agrTypes) return <CircularProgress className={classes.progress}/>
//                         const tempCb = [];
//                         for (let i in agrTypes) {
//                             tempCb.push(
//                                 <div key={i}>
//                                     <FormControlLabel
//                                         label={agrTypes[i].name}
//                                         control={
//                                             <GreenCheckbox
//                                                 checked={checkboxes[i]}
//                                                 value={i}
//                                                 onChange={(event) => {
//                                                     //Обновляем массив со значениями чекбоксов
//                                                     const updatedCb = checkboxes.map((value, index) =>
//                                                         parseInt(event.target.value) === index ? !value : value
//                                                     )
//                                                     setCheckboxes(updatedCb)
//
//                                                     //Сохраняем id выбранного типа договоров
//                                                     let newIDs = checkedAgrTypesIDs
//                                                     let index = newIDs.indexOf(agrTypes[i].id)
//                                                     if (index === -1) {
//                                                         newIDs.push(agrTypes[i].id)
//                                                     } else {
//                                                         newIDs.splice(index, 1)
//                                                     }
//                                                     setCheckedAgrTypesIDs(newIDs)
//                                                 }}
//                                             />
//                                         }/>
//                                     <Divider/>
//                                 </div>
//                             );
//                         }
//                         return tempCb;
//                     })()}
//                 </FormGroup>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={clearCheckboxes} color="primary">
//                     Снять выделение
//                 </Button>
//                 <Button onClick={() => setOpen(false)} color="primary">
//                     Ок
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// }
//
//
// const MobileCheckboxesDialog = ({agrTypes, checkboxes, setCheckboxes, checkedAgrTypesIDs, setCheckedAgrTypesIDs}) => {
//
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);
//
//     return (
//         <div className={classes.root}>
//             <Button variant='outlined' onClick={() => setOpen(true)}> Выбрать тип договора </Button>
//             <MyDialog
//                 classes={{
//                     paper: classes.paper,
//                 }}
//                 id="ringtone-menu"
//                 keepMounted
//                 open={open}
//                 checkboxes={checkboxes}
//                 setCheckboxes={setCheckboxes}
//                 agrTypes={agrTypes}
//                 setOpen={setOpen}
//                 checkedAgrTypesIDs={checkedAgrTypesIDs}
//                 setCheckedAgrTypesIDs={setCheckedAgrTypesIDs}
//             />
//         </div>
//     );
// }
//
// export default MobileCheckboxesDialog