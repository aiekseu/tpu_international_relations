import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    useMediaQuery,
    useTheme, withStyles
} from "@material-ui/core";

import API from "../../utils/API";
import CustomMap from "../../components/old/CustomMap";
import CompanyData from "../../components/old/CompanyData";
import MobileCheckboxesDialog from "../../components/old/MobileCheckboxesDialog";

const useStyles = makeStyles((theme) => ({
    content: {
        height: '100%',
        width: '100%',
    },
    statisticCard: {
        height: '70vh',
        borderRadius: 6,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 16,
            paddingRight: 16,
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: 16,
            paddingRight: 0,
        },
    },
    formControl: {
        width: '100%',
    },
    menuItem: {
        paddingLeft: 8,
        paddingRight: 8,
        height: 42
    },
    map: {
        padding: 0,
        marginRight: 'auto'
    },
    progress: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 8
    },
}))

const GreenCheckbox = withStyles({
    root: {
        color: 'rgba(79,162,0,0.88)',
        '&$checked': {
            color: 'rgba(79,162,0,0.88)',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AroundAgreementType = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const classes = useStyles()
    const api = API

    const [agrTypes, setAgrTypes] = useState([])
    const [agrTypesLoaded, setAgrTypesLoaded] = useState(false)
    const [checkboxes, setCheckboxes] = useState(new Array(12).fill(false))
    const [checkedAgrTypesIDs, setCheckedAgrTypesIDs] = useState([])

    const [companiesList, setCompaniesList] = useState([])
    const [company, setCompany] = useState(null)
    const [companiesLoaded, setCompaniesLoaded] = useState(false)

    const [centerCoords, setCenterCoords] = useState([56.465409, 84.950182])
    const map = useRef(null);
    const objectManager = useRef(null)


    //Получение всех типов договоров
    //Запускается только при первом рендере
    useEffect(() => {
        api.get('/agreement_types')
            .then(response => {
                setAgrTypes(response.data)
                setAgrTypesLoaded(true)
            })
            .catch(error => {
                console.error(error)
            })
        // eslint-disable-next-line
    }, [])


    //Получение всех компаний при изменении стейта checkboxes
    //(при выборе/отмене типов договоров)
    useEffect(() => {
        setCompaniesLoaded(false)
        let tempCompaniesList = []

        // Если убрали все чекбоксы - стереть все с карты
        if (checkboxes.indexOf(true) === -1) {
            setCompaniesList([])
            setCompany(null)
            setCenterCoords([56.465409, 84.950182])
            map.current?.setZoom(11);
            return
        }

        api.get(`https://tpu-international-backend.herokuapp.com/api/companies/?id_agreement_type=${checkedAgrTypesIDs.join(',')}`)
            .then(response => {
                for (let company of response.data) {
                    tempCompaniesList.push({
                        id: company.id,
                        name: company.name,
                        coords: company.location,
                    })
                }
                setCompaniesList(tempCompaniesList)
                map.current.setBounds(objectManager.current.getBounds());
                setCompaniesLoaded(true)
            })
            .catch(error => {
                console.error(error)
            })
        // eslint-disable-next-line
    }, [checkboxes, checkedAgrTypesIDs])

    return (
        <div className={classes.content}>
            <Paper className={classes.statisticCard} elevation={1}>
                <Grid container direction={() => isMobile ? 'column' : 'row'} spacing={3} className={classes.content}>
                    <Grid item xs={12} md={4} style={{paddingRight: 0, paddingBottom: 0}}>
                        {isMobile
                            ? <MobileCheckboxesDialog
                                agrTypes={agrTypes}
                                checkboxes={checkboxes}
                                setCheckboxes={setCheckboxes}
                                checkedAgrTypesIDs={checkedAgrTypesIDs}
                                setCheckedAgrTypesIDs={setCheckedAgrTypesIDs}
                            />
                            :
                            !agrTypesLoaded ? <CircularProgress className={classes.progress}/> :
                                <FormGroup>
                                    {(() => {
                                        const renderCb = [];
                                        for (let i in agrTypes) {
                                            renderCb.push(
                                                <FormControlLabel
                                                    key={i}
                                                    control={
                                                        <GreenCheckbox
                                                            checked={checkboxes[i]}
                                                            value={i}
                                                            classes={{colorSecondary: '#fff'}}
                                                            onChange={(event) => {
                                                                //Обновляем массив со значениями чекбоксов
                                                                const updatedCb = checkboxes.map((value, index) =>
                                                                    parseInt(event.target.value) === index ? !value : value
                                                                )
                                                                setCheckboxes(updatedCb)

                                                                //Сохраняем id выбранного типа договоров
                                                                let newIDs = checkedAgrTypesIDs
                                                                let index = newIDs.indexOf(agrTypes[i].id)
                                                                if (index === -1) {
                                                                    newIDs.push(agrTypes[i].id)
                                                                } else {
                                                                    newIDs.splice(index, 1)
                                                                }
                                                                setCheckedAgrTypesIDs(newIDs)
                                                            }}
                                                        />}
                                                    label={agrTypes[i].name}/>
                                            );
                                        }
                                        return renderCb;
                                    })()}
                                    <Button onClick={() => setCheckboxes(new Array(12).fill(false))}>
                                        uncheck all
                                    </Button>
                                </FormGroup>
                        }
                    </Grid>

                    <Grid item xs={12} md={8} style={{paddingRight: 0}}>
                        <CustomMap
                            companiesList={companiesList}
                            centerCoords={centerCoords}
                            map={map}
                            objectManager={objectManager}
                            setCompany={setCompany}
                        />
                    </Grid>
                </Grid>
            </Paper>
            <CompanyData company={company} companiesList={companiesList} agrTypes={agrTypes}/>
        </div>
    )
};

export default AroundAgreementType