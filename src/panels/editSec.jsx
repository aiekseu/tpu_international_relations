import {observer} from "mobx-react-lite";
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import rootStore from "../stores/rootStore";
import React from "react";
import {toJS} from "mobx";
import {Map, ObjectManager, Placemark, YMaps, ZoomControl} from "react-yandex-maps";

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const classes = {
    dialog: {
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
    },
    root: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.6,
        paddingTop: 2,
        paddingBottom: 0,
        paddingLeft: 4,
        paddingRight: 4,
        display: 'flex'
    },
    title: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 600,
        fontSize: '1.125rem',
        marginBottom: 2,
    },
    companyName: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 1,
        fontWeight: 400,
        fontSize: '0.9rem',
        textAlign: 'center'
    },
    inputField: {
        marginBottom: 1,
    },
    label: {
      flex: 1
    },
    input: {
        flex: 4
    }
}

const EditCompanyDialog = observer(() => {

    return (
        <Dialog
            sx={classes.dialog}
            open={rootStore.editStore.isEditCompanyDialogOpen}
            onClose={rootStore.editStore.closeEditCompanyDialog}
            maxWidth
        >
            <Paper
                elevation={0}
                sx={classes.root}
            >
                <Stack direction='column' style={{width: '100%'}}>
                    <Typography sx={classes.title}>
                        Информация о компании
                    </Typography>

                    <Stack direction='row' sx={classes.inputField}>
                        <Typography sx={classes.label}>Название*</Typography>
                        <TextField
                            defaultValue={rootStore.aboutCompanyStore.company.name}
                            variant="outlined"
                            multiline
                            sx={classes.input}
                        />
                    </Stack>
                    <Stack direction='row' sx={classes.inputField}>
                        <Typography sx={classes.label}>Web сайт</Typography>
                        <TextField
                            defaultValue={rootStore.aboutCompanyStore.company.website}
                            variant="outlined"
                            multiline
                            sx={classes.input}
                        />
                    </Stack>
                    <Stack direction='row' sx={classes.inputField}>
                        <Typography sx={classes.label}>Координаты*</Typography>
                        <TextField
                            defaultValue={rootStore.aboutCompanyStore.company.location}
                            variant="outlined"
                            multiline
                            sx={classes.input}
                        />
                    </Stack>
                    <Stack direction='row' sx={classes.inputField}>
                        <Typography sx={classes.label}>Страна*</Typography>
                        <Autocomplete
                            id="countryInput"
                            key={rootStore.filtersStore.countryKey}
                            sx={classes.input}
                            autoHighlight
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            options={toJS(rootStore.globalDataStore.countriesList)}
                            getOptionLabel={(option) => option.name}
                            noOptionsText={<Button variant='text' sx={{width: '100%', color: '#2a2a2a'}}>Добавить страну</Button>}
                            renderOption={(props, option) => (
                                <Box component="li" key={option.id} {...props}>
                                    {option.name}
                                </Box>
                            )}
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(event, value) => {

                            }}
                            clearOnBlur={true}
                        />
                    </Stack>
                    <YMaps className={classes.map}>
                        <Map
                            state={{
                                center: [39.29494801776605,-76.6153867684531],
                                zoom: 5,
                                behaviors: ["disable('scrollZoom')", "drag"]
                            }}
                            options={{
                                maxZoom: 14,
                                minZoom: 2,
                                autoFitToViewport: 'always'
                            }}
                            width='100%'
                            height={window.innerHeight * 0.85}
                            modules={['control.ZoomControl', 'control.FullscreenControl']}
                        >
                            <Placemark geometry={[39.29494801776605,-76.6153867684531]}/>
                        </Map>
                    </YMaps>
                </Stack>
            </Paper>
            <DialogActions>
                <Button onClick={() => rootStore.editStore.closeEditCompanyDialog()}>Отмена</Button>
                <Button onClick={() => rootStore.editStore.closeEditCompanyDialog()}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    )
})

const EditData = () => {
    return (
        <>
            <EditCompanyDialog/>
        </>
    )
}

export default EditData