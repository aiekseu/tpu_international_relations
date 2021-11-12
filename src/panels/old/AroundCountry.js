// import React, {useEffect, useRef, useState} from 'react';
// import {makeStyles} from "@material-ui/core/styles";
// import {
//     CircularProgress,
//     Grid,
//     List,
//     ListItem,
//     ListItemText, Paper,
//     TextField,
//     Typography,
//     useMediaQuery,
//     useTheme
// } from "@material-ui/core";
// import Autocomplete from '@material-ui/lab/Autocomplete';
//
// import API from "../../utils/API";
// import OutlinedDiv from "../../components/old/OutlinedDiv";
// import CustomMap from "../../components/old/CustomMap";
// import CompanyData from "../../components/old/CompanyData";
//
// const useStyles = makeStyles((theme) => ({
//     content: {
//         height: '100%',
//         width: '100%',
//     },
//     statisticCard: {
//         height: '70vh',
//         borderRadius: 6,
//         [theme.breakpoints.down('sm')]: {
//             paddingLeft: 16,
//             paddingRight: 16,
//         },
//         [theme.breakpoints.up('md')]: {
//             paddingLeft: 16,
//             paddingRight: 0,
//         },
//     },
//     countryPicker: {
//         [theme.breakpoints.down('sm')]: {
//             marginBottom: 12,
//         },
//     },
//     companiesList: {
//         maxHeight: '58vh',
//         overflow: 'scroll'
//     },
//     listBorder: {
//         marginTop: 12,
//     },
//     map: {
//         padding: 0,
//         marginRight: 'auto'
//     },
// }))
//
// const AroundCountry = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//
//     const classes = useStyles()
//     const api = API
//
//     const [allCountries, setAllCountries] = useState([])
//     const [country, setCountry] = useState(null)
//     const [countriesLoaded, setCountriesLoaded] = useState(false)
//
//     const [companiesList, setCompaniesList] = useState([])
//     const [company, setCompany] = useState(null)
//     const [companiesLoaded, setCompaniesLoaded] = useState(false)
//
//     const [agrTypes, setAgrTypes] = useState([])
//
//     const [centerCoords, setCenterCoords] = useState([56.465409, 84.950182])
//     const map = useRef(null);
//     const objectManager = useRef(null)
//
//     //Получение всех стран
//     //Запускается только при первом рендере
//     useEffect(() => {
//         api.get('/countries/')
//             .then((response) => {
//                 let countries = response.data // setAllCountries(response.data) не работает
//                 setAllCountries(countries)
//                 setCountriesLoaded(true)
//             })
//             .catch(error => {
//                 console.error(error)
//             })
//
//         api.get('/agreement_types')
//             .then(response => {
//                 // eslint-disable-next-line
//                 setAgrTypes(response.data)
//                 console.log(response.data)
//             })
//             .catch(error => {
//                 console.error(error)
//             })
//         // eslint-disable-next-line
//     }, [])
//
//
//     //Получение списка компаний
//     //Запускается при изменении стейта country (при выборе страны)
//     useEffect(() => {
//         setCompaniesLoaded(false)
//         let countryID = allCountries.find(item => item.name === country)?.id
//         let tempCompaniesList = []
//         if (countryID)
//             api.get(`/companies/?id_country=${countryID}`)
//                 .then(response => {
//                     for (let company of response.data) {
//                         tempCompaniesList.push({
//                             id: company.id,
//                             name: company.name,
//                             coords: company.location,
//                         })
//                     }
//                     setCompaniesList(tempCompaniesList)
//                     map.current.setBounds(objectManager.current.getBounds());
//                     setCompaniesLoaded(true)
//                 })
//                 .catch(error => {
//                     console.error(error)
//                 })
//         // eslint-disable-next-line
//     }, [country])
//
//     return (
//         <div className={classes.content}>
//             <Paper className={classes.statisticCard} elevation={1}>
//                 <Grid container direction={() => isMobile ? 'column' : 'row'} spacing={3} className={classes.content}>
//                     <Grid item xs={12} md={4} style={{paddingRight: 0}}>
//                         <Autocomplete
//                             id="combo-box-demo-country"
//                             options={allCountries.map((country) => country.name)}
//                             renderInput={(params) => <TextField {...params} label="Страна" variant="outlined"/>}
//                             onChange={(event, newValue, reason) => {
//                                 // Выбор страны и очищение при нажатии на крестик
//                                 setCountry(newValue)
//                                 if (reason === "clear") {
//                                     setCompaniesList([])
//                                 }
//                             }}
//                             openText='Раскрыть'
//                             className={classes.countryPicker}
//                             renderOption={(option) =>
//                                 countriesLoaded
//                                     ? <Typography noWrap> {option} </Typography>
//                                     : <CircularProgress/>
//                             }
//                         />
//                         {isMobile
//                             ? <Autocomplete
//                                 id="combo-box-demo-company"
//                                 options={companiesList.map((company) => company.name)}
//                                 renderInput={(params) => <TextField {...params} label="Организация"
//                                                                     variant="outlined"/>}
//                                 onChange={(event, newValue) => {
//                                     // Выбор компании, центрирование и вывод данных о договорах
//                                     for (let company of companiesList) {
//                                         if (newValue === company.name) {
//                                             setCompany(company.name)
//                                             if (company.coords) {
//                                                 setCenterCoords(company.coords)
//                                                 map.current.setCenter(company.coords)
//                                                 map.current.setZoom(12)
//                                             }
//                                             break;
//                                         }
//                                     }
//                                 }}
//                                 disabled={!country}
//                                 renderOption={(option) => companiesLoaded ? <Typography noWrap> {option} </Typography> :
//                                     <CircularProgress/>}
//                                 openText='Раскрыть'
//                             />
//                             :
//                             <OutlinedDiv label='Компания' style={{marginTop: 16, width: '100%'}}>
//                                 {companiesLoaded //Если компании загружены - показываем список
//                                     ?
//                                     <List className={classes.companiesList} disablePadding>
//                                         {companiesList.map((value, id) =>
//                                             <ListItem
//                                                 button
//                                                 key={id}
//                                                 onClick={(event) => {
//                                                     // Выбор компании, центрирование и вывод данных о договорах
//                                                     for (let company of companiesList) {
//                                                         if (event.target.innerText === company.name) {
//                                                             setCompany(company)
//                                                             if (company.coords) {
//                                                                 setCenterCoords(company.coords)
//                                                                 map.current.setCenter(company.coords)
//                                                                 map.current.setZoom(11)
//                                                                 setCompany(company.name)
//                                                             }
//                                                             break;
//                                                         }
//                                                     }
//                                                 }}
//                                             >
//                                                 <ListItemText>
//                                                     {value.name}
//                                                 </ListItemText>
//                                             </ListItem>
//                                         )}
//                                     </List>
//                                     // Если компании грузятся - CircularProgress, если не начинали - ничего
//                                     :
//                                     <div>
//                                         {country ? <CircularProgress/> : <div style={{paddingBottom: 430}}/>}
//                                     </div>
//                                 }
//                             </OutlinedDiv>
//                         }
//                     </Grid>
//
//                     <Grid item xs={12} md={8} style={{paddingRight: 0}}>
//                         <CustomMap
//                             companiesList={companiesList}
//                             centerCoords={centerCoords}
//                             map={map}
//                             objectManager={objectManager}
//                             setCompany={setCompany}
//                         />
//                     </Grid>
//                 </Grid>
//             </Paper>
//             <CompanyData company={company} companiesList={companiesList} agrTypes={agrTypes}/>
//         </div>
//     )
// };
//
// export default AroundCountry