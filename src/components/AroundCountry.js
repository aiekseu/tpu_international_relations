import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {Map, ObjectManager, YMaps} from 'react-yandex-maps';
import {Grid, List, ListItem, ListItemText, TextField, useMediaQuery, useTheme} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

import API from "../utils/API";
import OutlinedDiv from "./OutlinedDiv";

const useStyles = makeStyles((theme) => ({
    content: {
        height: '100%',
        width: '100%',
    },
    countryPicker: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 12,
        },
    },
    companiesList: {
        maxHeight: '58vh',
        overflow: 'scroll'
    },
    listBorder: {
        marginTop: 12,
    },
    map: {
        padding: 0,
        marginRight: 'auto'
    }

}))

const AroundCountry = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const classes = useStyles()
    const api = API

    const [allCountries, setAllCountries] = useState([])
    const [countriesIDs, setCountriesIDs] = useState({})
    const [country, setCountry] = useState('Россия')

    const [companiesList, setCompaniesList] = useState([])
    const [company, setCompany] = useState({})

    const [centerCoords, setCenterCoords] = useState([56.465409, 84.950182])

    const map = useRef(null);
    const objectManager = useRef(null)

    //Получение всех стран
    //Запускается только при первом рендере
    useEffect(() => {
        api.get('countries/get/all')
            .then((response) => {
                let prettyName = ''
                let tempCountriesIDs = {}
                let tempCountriesList = []
                for (let i in response.data.countries) {
                    //Делаем из АВСТРАЛИЯ -> Австралия
                    prettyName = response.data.countries[i].name.toLowerCase()
                    prettyName = prettyName[0].toUpperCase() + prettyName.slice(1)

                    tempCountriesIDs[prettyName] = response.data.countries[i].id
                    tempCountriesList.push(prettyName)
                }
                setCountriesIDs(tempCountriesIDs)
                setAllCountries(tempCountriesList)
            })
            //Сортируем массив по алфавиту
            .then(() => {
                setAllCountries(prevState => prevState.sort())
            })
        // eslint-disable-next-line
    }, [])

    //Получение списка компаний
    //Запускается при изменении стейта country (при выборе страны)
    useEffect(() => {
        let countryID = countriesIDs[country]
        let tempCompList = []
        if (countryID) api.get(`/companies/get/all/byCountry/${countryID}`)
            .then(response => {
                for (let i in response.data.companies) {
                    tempCompList[i] = {
                        name: response.data.companies[i].name,
                        coords: response.data.companies[i].location,
                        id: response.data.companies[i].id
                    }
                }
                setCompaniesList(tempCompList)
                map.current.setBounds(objectManager.current.getBounds());
            })
            .catch(error => {
                console.error(error)
            })
        // eslint-disable-next-line
    }, [country])

    //Получение массива точек для карты
    const getFeatures = () => {
        return companiesList
            .filter((company, id) => company !== null && company.coords !== null)
            .map((company, id) => {
                return {
                    id: id,
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: company.coords
                    },
                    properties: {
                        balloonContent: "Содержимое балуна",
                        clusterCaption: company.name,
                        iconCaption: company.name,
                    },
                    options: {
                        preset: "islands#blueGovernmentIcon",
                        openHintOnHover: false,
                    },
                };
            })
    }


    return (
        <div className={classes.content}>
            <Grid container direction={() => isMobile ? 'column' : 'row'} spacing={3} className={classes.content}>
                <Grid item xs={12} md={4} style={{paddingRight: 0}}>
                    <Autocomplete
                        id="combo-box-demo-country"
                        options={allCountries}
                        renderInput={(params) => <TextField {...params} label="Страна" variant="outlined"/>}
                        onChange={(event, newValue, reason) => {
                            // Выбор страны и очищение при нажатии на крестик
                            setCountry(newValue)
                            if (reason === "clear") {
                                setCompaniesList([])
                            }
                        }}
                        openText='Раскрыть'
                        className={classes.countryPicker}
                    />
                    {isMobile
                        ? <Autocomplete
                            id="combo-box-demo-company"
                            options={companiesList.map((company) => company.name)}
                            renderInput={(params) => <TextField {...params} label="Организация" variant="outlined"/>}
                            onChange={(event, newValue, reason) => {
                                // Выбор компании, центрирование и вывод данных о договорах
                                for (let company of companiesList) {
                                    if (newValue === company.name) {
                                        setCompany(company)
                                        setCenterCoords(company.coords)
                                        map.current.setCenter(company.coords)
                                        map.current.setZoom(12)
                                        break;
                                    }
                                }
                            }}
                            openText='Раскрыть'
                        />
                        : <OutlinedDiv label='Компания' style={{marginTop: 16, width: '100%',}}>
                            <List className={classes.companiesList} disablePadding>
                                {companiesList.map((value, id) =>
                                    <ListItem
                                        button
                                        key={id}
                                        onClick={(event) => {
                                            // Выбор компании, центрирование и вывод данных о договорах
                                            for (let company of companiesList) {
                                                if (event.target.innerText === company.name) {
                                                    setCompany(company)
                                                    if (company.coords) {
                                                        setCenterCoords(company.coords)
                                                        map.current.setCenter(company.coords)
                                                        map.current.setZoom(11)
                                                    }
                                                    break;
                                                }
                                            }
                                        }}
                                    >
                                        <ListItemText>
                                            {value.name}
                                        </ListItemText>
                                    </ListItem>
                                )}
                            </List>
                        </OutlinedDiv>
                    }
                </Grid>

                <Grid item xs={12} md={8} style={{paddingRight: 0}}>
                    <YMaps className={classes.map}>
                        <Map
                            state={{
                                center: centerCoords, //Координаты ТПУ
                                zoom: 10,
                                controls: ['zoomControl', 'fullscreenControl'],
                            }}
                            options={{
                                maxZoom: 14,
                                autoFitToViewport: 'always'
                            }}
                            instanceRef={map}
                            width='100%'
                            height='100%'
                            modules={['control.ZoomControl', 'control.FullscreenControl']}
                        >
                            <ObjectManager
                                objects={{
                                    openBalloonOnClick: true
                                }}
                                instanceRef={objectManager}
                                clusters={{}}
                                options={{
                                    clusterize: true,
                                    gridSize: 32,

                                }}
                                features={{
                                    type: "FeatureCollection",
                                    features: getFeatures()
                                }}
                                modules={[
                                    "objectManager.addon.objectsBalloon",
                                    "objectManager.addon.clustersBalloon"
                                ]}
                            />
                        </Map>
                    </YMaps>
                </Grid>
            </Grid>
        </div>
    )
};

export default AroundCountry