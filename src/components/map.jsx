import {Map, ObjectManager, YMaps, ZoomControl} from "react-yandex-maps";
import {useRef} from "react";
import {observer} from "mobx-react-lite";
import rootStore from '../stores/rootStore'


const classes = {
    companiesList: {
        maxHeight: '58vh',
        overflow: 'scroll'
    },
    listBorder: {
        marginTop: 12,
    },
    map: {
        padding: 0,
        height: window.innerHeight * 0.85,
        width: window.innerWidth,
        marginRight: 'auto'
    }
}

const NewCustomMap = () => {

    const map = useRef(null);
    const objectManager = useRef(null)

    return (
        <YMaps className={classes.map}>
            <Map
                state={{
                    center: [56.465409, 84.950182], //Координаты ТПУ
                    zoom: 13,
                    behaviors: ["disable('scrollZoom')", "drag"]
                }}
                options={{
                    maxZoom: 14,
                    minZoom: 2,
                    autoFitToViewport: 'always'
                }}
                instanceRef={map}
                width='100%'
                height={window.innerHeight * 0.85}
                modules={['control.ZoomControl', 'control.FullscreenControl']}
            >
                <ZoomControl
                    options={{
                        position: {
                            left: 'auto',
                            right: 20,
                            top: 200,
                        }
                    }}
                />
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
                    onLoad={(instance) => {
                        rootStore.mapStore.setRefs(map, objectManager)
                        rootStore.mapStore.setClickEvent()
                    } }
                />
            </Map>
        </YMaps>
    )
}

export default observer(NewCustomMap)