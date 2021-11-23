import {Map, ObjectManager, YMaps} from "react-yandex-maps";
import {useRef} from "react";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
// import RootStore from "../stores/rootStore";
import rootStore from '../stores/rootStore'


const classes = {
    content: {
        height: '100%',
        width: '100%',
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
}

// const rootStore = new RootStore()


const NewCustomMap = () => {

    const map = useRef(null);
    const objectManager = useRef(null)

    // console.log(rootStore.mapStore.features)

    // const tempF = [
    //     {
    //         id: 243, //Для кооректной отрисовки ВСЕХ объектов - на будущее, чтобы не забыть
    //         type: "Feature",
    //         geometry: {
    //             type: "Point",
    //             coordinates: [36.465409, 84.950182]
    //         },
    //         properties: {
    //             clusterCaption: 'asdasd',
    //             iconCaption: 'asdasd',
    //         },
    //         options: {
    //             preset: "islands#blueGovernmentIcon",
    //             openHintOnHover: false,
    //         },
    //     },
    //     {
    //         id: 3466, //Для кооректной отрисовки ВСЕХ объектов - на будущее, чтобы не забыть
    //         type: "Feature",
    //         geometry: {
    //             type: "Point",
    //             coordinates: [56.465409, 84.950182]
    //         },
    //         properties: {
    //             clusterCaption: 'company.name',
    //             iconCaption: 'company.name',
    //         },
    //         options: {
    //             preset: "islands#blueGovernmentIcon",
    //             openHintOnHover: false,
    //         },
    //     }
    // ]
    // console.log(toJS(rootStore.mapStore.features)[0])
    // console.log(tempF[0])

    return (
        <YMaps className={classes.map}>
            <Map
                state={{
                    center: [56.465409, 84.950182], //Координаты ТПУ
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
                    clusters={{}}
                    options={{
                        clusterize: true,
                        gridSize: 100,
                    }}
                    features={{
                        type: "FeatureCollection",
                        features: rootStore.mapStore.features
                    }}
                    modules={[
                        "objectManager.addon.objectsBalloon",
                        "objectManager.addon.clustersBalloon",
                    ]}
                />
            </Map>
        </YMaps>
    )
}

export default observer(NewCustomMap)