import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const lighthall = { lat: 40.7377347, lng: -73.9909936 };
const center = { lat: 37.0902, lng: -95.7129 }

export default function MyComponent(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName={props.styleClass() ? "center-map-container" : "fixed-map-container"}
            center={center}
            zoom={3}
        >
            <Marker position={lighthall} label="Lighthall Inc"/>
            <Marker position={{lat: props.location.lat, lng: props.location.lng}} label="Latest Click"/>
            {props.locations && props.locations.map(coord => 
                <Marker
                    key={coord.key}
                    position={{lat: coord.lat, lng: coord.lng}}
                />
            )}
        </GoogleMap>
    ) : <></>
}
