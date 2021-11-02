import React, {useState} from "react";
import {Map, ObjectManager, YMaps} from "react-yandex-maps";
import {makeStyles} from "@material-ui/core/styles";

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

const CustomMap = ({companiesList, centerCoords, map, objectManager, setCompany}) => {

    const classes = useStyles()
    const [clickEventAdded, setClickEventAdded] = useState(false)

    // Обработка события нажатия на точку
    if (!clickEventAdded && objectManager.current?.objects) {
        objectManager.current.objects.events.add('click', (e) => {
            // Используем айдишник для того, чтобы далее получить инфу по метке
            const objectId = e.get('objectId');
            const organizationName = objectManager.current.objects.getById(objectId)?.properties.clusterCaption
            setCompany(organizationName)
        })

        // Происходит чудо и ивент добавляется 2 раза - второй удаляем
        objectManager.current.objects.events.types.click.pop()
        setClickEventAdded(true)
    }


    //Получение массива точек для карты
    const getFeatures = () => {
        return companiesList
            .filter((company) => company !== null && company.coords !== null)
            .map((company) => {
                return {
                    id: Math.random(), //Для кооректной отрисовки ВСЕХ объектов - на будущее, чтобы не забыть
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: company.coords
                    },
                    properties: {
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
                        openBalloonOnClick: true,
                    }}
                    instanceRef={objectManager}
                    clusters={{

                    }}
                    options={{
                        clusterize: true,
                        gridSize: 100,
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
    )
}

export default CustomMap