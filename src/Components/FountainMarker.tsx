import { Marker, Popup } from "react-leaflet"

export interface Fountain{
    name: string,
    description: string,
    rating: number,
    geolocation: [number,number]
}

function FountainMarker({fountain}:{fountain:Fountain}){
    return (
        <Marker position={fountain.geolocation}>
            <Popup>
                {fountain.name}
            </Popup>
        </Marker>
    )
}

export default FountainMarker;