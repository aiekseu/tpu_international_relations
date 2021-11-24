import {
    Autocomplete,
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {LoadingButton} from "@mui/lab";

import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

import styled from "@emotion/styled";
import theme from "../utils/theme";

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import RootStore from "../stores/rootStore";

import rootStore from '../stores/rootStore'

// Кнопка "поиск"
const SearchButton = styled(LoadingButton)(({theme}) => ({
    borderRadius: 10,
    borderColor: theme.palette.success.main,
    borderWidth: 2,
    padding: 5,
    textTransform: 'none',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    color: '#5B5B5B',
    boxShadow: "0px 0px 2px 0px rgba(50, 86, 52, 0.6)",
    '&:hover': {
        borderColor: theme.palette.success.main,
        borderWidth: 2,
        boxShadow: "0px 0px 5px 0px rgba(50, 106, 52, 0.6)",
    },
    marginTop: '12px',
    marginBottom: '16px',
}));

const classes = {
    root: {
        width: 340,
        height: window.innerHeight * 0.8,
        marginTop: 4,
        marginLeft: 6,
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: 4,
        paddingRight: 4,
        display: 'flex',
    },
    title: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 600,
        fontSize: '1.125rem',
        marginBottom: 1.5
    },
    autocomplete: {
        marginBottom: 1.25
    },
    checkboxesForm: {
        marginLeft: 0,
    },
    checkbox: {
        '&.Mui-checked': {
            color: theme.palette.success.main
        },
        paddingTop: 0.25,
        paddingBottom: 0.25,
        paddingRight: 0.25,
        paddingLeft: 0,
    },
    checkboxLabel: {
        fontSize: '0.85rem',
    },
    companiesListDiv: {
        overflow: 'auto',
        border: "1px solid #bdbdbd",
        borderRadius: 5,
    },
    listItem: {
        padding: 0.5,
        paddingLeft: 2,
    },
    listItemText: {
        fontSize: '0.9rem',
        lineHeight: 1.3
    },
}

// Список компаний
const CompaniesList = observer(() => {
    return (
        <List>
            {rootStore.globalDataStore.companiesList.map((value, index) =>
                <div key={value.id}>
                    <ListItem
                        button
                        disablePadding
                        sx={classes.listItem}
                    >
                        <ListItemText sx={classes.listItemText} disableTypography>
                            {value.name}
                        </ListItemText>
                    </ListItem>
                    <Divider/>
                </div>
            )
            }
        </List>
    )
})

const Filters = observer(() => {

    return (
        <Paper elevation={3} sx={classes.root}>
            <Stack direction='column'>
                <Typography sx={classes.title}>
                    Поиск договоров
                </Typography>

                {/* Ввод страны */}
                <Autocomplete
                    id="countryInput"
                    sx={classes.autocomplete}
                    autoHighlight
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={toJS(rootStore.globalDataStore.countriesList)}
                    getOptionLabel={(option) => option.name}
                    noOptionsText={<LinearProgress/>}
                    renderOption={(props, option) => (
                        <Box component="li" key={option.id} {...props}>
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Страна"/>}
                    onChange={(event, value) => {
                        rootStore.filtersStore.updateCountry(value)
                    }}
                />

                {/*Ввод инженерной школы*/}
                <Autocomplete
                    id="schoolInput"
                    sx={classes.autocomplete}
                    autoHighlight
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={toJS(rootStore.globalDataStore.countriesList)}
                    getOptionLabel={(option) => option.name}
                    noOptionsText={<LinearProgress/>}
                    renderOption={(props, option) => (
                        <Box component="li" key={option.id} {...props}>
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Инженерная школа"/>}
                    onChange={(event, value) => {
                        rootStore.filtersStore.updateEngineeringSchool(value)
                    }}
                />

                {/* Ввод ответственного в ТПУ*/}
                <Autocomplete
                    id="representativeInput"
                    sx={classes.autocomplete}
                    autoHighlight
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={toJS(rootStore.globalDataStore.representativesList)}
                    getOptionLabel={(option) => option.second_name + ' ' + option.first_name}
                    noOptionsText={<LinearProgress/>}
                    renderOption={(props, option) => (
                        <Box component="li" key={option.id} {...props}>
                            {option.second_name} {option.first_name}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Ответственный в ТПУ"/>}
                    onChange={(event, value) => {
                        rootStore.filtersStore.updateRepresentative(value)
                    }}
                />

                {/* Ввод типов договоров*/}
                <Autocomplete
                    id="agrTypeInput"
                    sx={classes.autocomplete}
                    autoHighlight
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={toJS(rootStore.globalDataStore.agreementTypesList)}
                    getOptionLabel={(option) => option.name}
                    noOptionsText={<LinearProgress/>}
                    renderOption={(props, option) => (
                        <Box component="li" key={option.id} {...props}>
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Тип договора"/>}
                    onChange={(event, value) => {
                        rootStore.filtersStore.updateAgrType(value)
                    }}
                />

                {/* Чекбоксы */}
                <FormGroup row>
                    <FormControlLabel
                        sx={classes.checkboxesForm}
                        label={<Typography sx={classes.checkboxLabel}>Действует</Typography>}
                        control={
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon style={{fontSize: '1.3rem'}}/>}
                                checkedIcon={<CheckCircleIcon style={{fontSize: '1.3rem'}}/>}
                                sx={classes.checkbox}
                            />
                        }
                    />
                    <FormControlLabel
                        label={<Typography sx={classes.checkboxLabel}>Истек</Typography>}
                        control={
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon style={{fontSize: '1.3rem'}}/>}
                                checkedIcon={<CheckCircleIcon style={{fontSize: '1.3rem'}}/>}
                                sx={classes.checkbox}
                            />
                        }
                    />
                    <FormControlLabel
                        label={
                            <Typography sx={classes.checkboxLabel}>
                                Истекает
                            </Typography>
                        }
                        control={
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon style={{fontSize: '1.3rem'}}/>}
                                checkedIcon={<CheckCircleIcon style={{fontSize: '1.3rem'}}/>}
                                sx={classes.checkbox}
                            />
                        }
                    />
                </FormGroup>

                {/*TODO: loading state, ripple border radius*/}
                <SearchButton
                    variant='outlined'
                    loading={rootStore.globalDataStore.isFetching}
                    onClick={async () => {
                        await rootStore.filtersStore.findCompanies()
                    }}
                >
                    Поиск
                </SearchButton>

                <Typography sx={classes.title}>
                    Список компаний
                </Typography>

                {/* Список компаний */}
                <div style={classes.companiesListDiv}>
                    {
                        (toJS(rootStore.globalDataStore.companiesList.length === 0))
                            ? <LinearProgress/>
                            : <CompaniesList/>
                    }
                </div>
            </Stack>
        </Paper>
    )
})


export default Filters