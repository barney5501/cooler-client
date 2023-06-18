import { Marker, Popup } from "react-leaflet"

export interface Fountain{
    name: string,
    description: string,
    rating: number,
    geolocation: [number,number]
}

function FountainMarker({fountain, openDialog, setMarker}:{fountain:Fountain,
    openDialog:React.Dispatch<React.SetStateAction<boolean>>,
    setMarker:React.Dispatch<React.SetStateAction<Fountain>>    
}){
    
    const onclick = () => {
        openDialog(true);
        setMarker(fountain);
    };
    return (
        <Marker position={fountain.geolocation} eventHandlers={{click:onclick}} />
    )
}

export default FountainMarker;