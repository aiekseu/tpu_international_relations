import React, {useEffect, useRef} from 'react';
import {
    Autocomplete,
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup, IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {LoadingButton, Skeleton} from "@mui/lab";

import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

import styled from "@emotion/styled";
import theme from "../utils/theme";

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

const windowHeight = window.innerHeight;

const classes = {
    root: {
        width: 340,
        height: windowHeight * 0.8,
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
        marginBottom: 1.5,
    },
    hideButton: {
        position: 'absolute',
        top: 9.5,
        right: 12.5,
        padding: 0.5,
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
        visibility: (rootStore.filtersStore.isOpen) ? 'visible' : 'hidden'
    },
    listItem: {
        padding: 0.5,
        paddingLeft: 2,
    },
    listItemText: {
        fontSize: '0.9rem',
        lineHeight: 1.3
    },
    skeleton: {
        margin: 0.5,
        borderRadius: 0.5,
    }
}

// Список компаний
const CompaniesList = observer(() => {
    return (
        <List>
            {rootStore.globalDataStore.companiesList.map((company, index) =>
                <div key={company.id}>
                    <ListItem
                        button
                        disablePadding
                        sx={classes.listItem}
                        onClick={() => {
                            rootStore.filtersStore.setCurrentCompany(company)
                            console.log(company)
                        }}
                    >
                        <ListItemText sx={classes.listItemText} disableTypography>
                            {company.name}
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

    const hideableStyle = {visibility: (rootStore.filtersStore.isOpen) ? 'visible' : 'hidden'}

    return (
        <Paper elevation={3} sx={classes.root}
               style={{height: (rootStore.filtersStore.isOpen) ? windowHeight * 0.8 : 60}}>
            <Stack direction='column'>

                <Typography sx={classes.title}>
                    Поиск договоров
                </Typography>

                <IconButton
                    sx={classes.hideButton}
                    onClick={() => {
                        rootStore.filtersStore.openOrHideFiltersPanel()
                    }}
                >
                    {
                        (rootStore.filtersStore.isOpen)
                            ? <KeyboardArrowUpIcon style={{fontSize: '1.875rem'}}/>
                            : <KeyboardArrowDownIcon style={{fontSize: '1.875rem'}}/>
                    }
                </IconButton>

                {/* Ввод страны */}
                <Autocomplete
                    style={hideableStyle}
                    id="countryInput"
                    sx={classes.autocomplete}
                    key={rootStore.filtersStore.countryKey}
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
                    clearOnBlur={true}
                />

                {/*Ввод инженерной школы*/}
                <Autocomplete
                    style={hideableStyle}
                    id="schoolInput"
                    sx={classes.autocomplete}
                    autoHighlight
                    key={rootStore.filtersStore.engineeringSchoolKey}
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
                    style={hideableStyle}
                    id="representativeInput"
                    sx={classes.autocomplete}
                    autoHighlight
                    key={rootStore.filtersStore.representativeKey}
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
                    style={hideableStyle}
                    id="agrTypeInput"
                    sx={classes.autocomplete}
                    autoHighlight
                    key={rootStore.filtersStore.agrTypeKey}
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
                <FormGroup row style={hideableStyle}>
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

                {/* Кнопка поиска */}
                <SearchButton
                    style={hideableStyle}
                    variant='outlined'
                    loading={rootStore.globalDataStore.isFetching}
                    onClick={async () => {
                        await rootStore.filtersStore.findCompanies()
                    }}
                    TouchRippleProps={{style: {borderRadius: 8}}}
                >
                    Поиск
                </SearchButton>

                <Typography sx={classes.title} style={hideableStyle}>
                    Список компаний
                </Typography>

                {/* Список компаний */}
                <div style={{
                    overflow: 'auto',
                    border: "1px solid #bdbdbd",
                    borderRadius: 5,
                    visibility: (rootStore.filtersStore.isOpen) ? 'visible' : 'hidden' // необходимо прописать здесь, чтобы было видно стейт
                }}>
                    {
                        (toJS(rootStore.globalDataStore.companiesList.length === 0) || rootStore.globalDataStore.isFetching)
                            ? <div>
                                <Skeleton variant='rectangular' height={40} sx={classes.skeleton} />
                                <Divider />
                                <Skeleton variant='rectangular' height={60} sx={classes.skeleton} />
                                <Divider />
                                <Skeleton variant='rectangular' height={50} sx={classes.skeleton} />
                                <Divider />
                                <Skeleton variant='rectangular' height={30} sx={classes.skeleton} />
                                <Divider />
                                <Skeleton variant='rectangular' height={40} sx={classes.skeleton} />
                                <Divider />
                                <Skeleton variant='rectangular' height={40} sx={classes.skeleton} />
                            </div>
                            : <CompaniesList/>
                    }
                </div>
            </Stack>
        </Paper>
    )
})


export default Filters