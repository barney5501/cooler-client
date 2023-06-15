import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {ChangeEvent, useMemo, useState } from "react";

const existingFountains = [{name: "עמק החולה", location:[31.8892968638605, 35.011008419879396]},
                    {name: "בית ספר דורות", location:[31.89497993710023, 35.02299553180105]}];


function FountainMarker({location, name}:{location:number[], name:string}){
    return(
    <Marker position={location}>
        <Popup>
            {name}
        </Popup>
    </Marker>
    )
}
function FountainMarkers(){
    // get from DB

    // const existingFountains = [{name: "עמק החולה", location:[31.8892968638605, 35.011008419879396]},
    //                 {name: "בית ספר דורות", location:[31.89497993710023, 35.02299553180105]}];

    const renderFountains = existingFountains.map(fountain => 
        <FountainMarker name={fountain.name} location={fountain.location} />
    )
    return (
        <>
        {renderFountains}
        </>
        );
    
}

function LocateButton({map}:{map:any}) {
    // on pwa - get location from device in this function instead of from the map
    function handleLocatorClick(){
        map.locate().on('locationfound', function(e){
            map.flyTo(e.latlng, 18);
        });
    }
    return (
        <button onClick={handleLocatorClick}>
            I will find you.
        </button>
    )

}

function GenerateMarker(){
    const [latt, setLatt] = useState(0);
    const [lonn, setLonn] = useState(0);

    function handleLattChange(e: ChangeEvent<HTMLInputElement>){
        setLatt(Number(e.target.value));
    }

    function handleLonnChange(e: ChangeEvent<HTMLInputElement>){
        setLonn(Number(e.target.value));
    }

    function handleSubmit(){
        existingFountains.push(
            {name: "your Location", location: [latt,lonn]}
        );
        console.log(existingFountains);
    }
    
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="box" onChange={handleLattChange} placeholder="lat" />
            <input type="box" onChange={handleLonnChange} placeholder="lon" />
            <input type="submit" value="Submit" />
        </form>
        </>
    )
}

function MyMapComponent(){
    const [map, setMap] = useState(null);
    const loc = [31.8892968638605, 35.011008419879396];
    const zoom = 13;
    
    const mapDisplay = useMemo(
        () => (
            <MapContainer center = {loc} zoom = {zoom} ref={setMap}>
                <TileLayer attribution="OSM" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <FountainMarkers />
            </MapContainer>
        ),[],
    )
    return (
        <>
        {mapDisplay}
        {map ? <LocateButton map={map} /> : null}
        {<GenerateMarker />}
        </>
    )
}


//export default MyMapComponent
