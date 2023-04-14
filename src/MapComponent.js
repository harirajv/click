import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function MapComponent(props) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
    });

    if(!isLoaded) return <div>Loading...</div>;
    return (<Map location={props.location}/>);
}

function Map(props) {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    return (
        <GoogleMap zoom={5} center={center} mapContainerClassName="map-container">
            <MarkerF position={center}/>
            <MarkerF position={useMemo(() => ({lat: props.location.lat, lng: props.location.lng}), [])}/>
        </GoogleMap>
    );
}
