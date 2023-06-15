import { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Map } from "leaflet";
import FountainMarker, { Fountain } from "./FountainMarker";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import Input from '@mui/joy/Input';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, AlertTitle, Box, Button, Card, DialogContentText } from "@mui/material";

// map component
function CoolerMap(){
    const [map, setMap] = useState<Map | null>(null);
    const [zoom, setZoom] = useState(13);
    const [mapCenter, setMapCenter] = useState<[number,number]>([31.8892968638605, 35.011008419879396]);
    const [markers, setMarkers] = useState<Fountain[]>([]); // load from firebase
    const [dialogOpen, setOpen] = useState(false);
    
    // Add Fountain
    const [newFountainName, setName] = useState('Your Location');
    const [newFountainDescription, setDesc] = useState('Me Gusta');
    const [newFountainRating, setRating] = useState(0);
    const [newFountainLocation, setCurrentLocation] = useState<[number,number]>([31,35]);

    // Markers
    const renderMarkers = markers.map(marker => (
        <FountainMarker fountain={marker} />
    ));

    // Go to user's current location. on pwa, get location from device and not from map.
    const handleUserLocation = () => {
        map?.locate().on('locationfound', function(e){
            map.flyTo(e.latlng, 18);
            console.log(e.latlng);
        });
    };

    const addNewFountainMarker = () => {
        const newFountain:Fountain = {
            name: newFountainName,
            description: newFountainDescription,
            rating: newFountainRating,
            geolocation: newFountainLocation
        };
        setMarkers([...markers, newFountain]);    
    };

    /* Main Display Of The Map */
    const mapDisplay = useMemo(
        () => (
            <MapContainer center={mapCenter} zoom={zoom} ref={setMap}>
                <TileLayer attribution="&copy Blioni" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {renderMarkers}
            </MapContainer>
        ), [markers]);


    // Dialog
    const handleOpen = () => {
        map?.locate().on('locationfound', function(e){
            setCurrentLocation([e.latlng.lat, e.latlng.lng]);
            setOpen(true);
        }).on('locationerror', function(e){
            <Alert>
                <AlertTitle>סורי!</AlertTitle>
                לא הצלחנו למצוא את המיקום שלך. צמאים לתיקון
            </Alert>
        });
    }
    const handleQuit = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        addNewFountainMarker();
        setOpen(false);
    }
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value);
    }
    const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating(Number(e.target.value));
    }

    return (
        <>
        {mapDisplay}
        
        {/* // Dialog */}
        <Dialog open={dialogOpen} onClose={handleQuit}>
            <DialogTitle>Add new fountain</DialogTitle>
                <DialogContent>
                    <TextField  // fountain name
                        autoFocus
                        id="fountain-name"
                        label="Name: "
                        variant="standard" 
                        onChange={handleName}/>
                    <br /> <br />
                    <TextField  // fountain description
                        autoFocus
                        id="fountain-description"
                        label="Description: "
                        multiline
                        rows={5}
                        variant="standard" 
                        onChange={handleDescription}/>
                    <br /> <br />
                    <TextField  // fountain description
                        autoFocus
                        id="fountain-rating"
                        label="Rating"
                        type="number"
                        inputProps={{'min':'0', 'max':'10', 'step':'1', 'defaultValue':'5'}}
                        variant="standard" 
                        onChange={handleRating}/>

                </DialogContent>
            <DialogActions sx={{'display':'flex', 'justifyContent':'space-between'}}>
                <Button sx={{'fontWeight':'600', 'color':'#212121'}} onClick={handleQuit}>x</Button>
                <Button sx={{'fontSize':'22px', 'color':'#212121'}} onClick={handleSubmit}>+</Button>
            </DialogActions>
        </Dialog>

        <div className="cooler-btns">
            <Button
                sx={{'border':'solid #2596be 1px', 'backgroundColor':'#1eaec0', 'textTransform':'none'}}
                variant="contained"
                onClick={handleUserLocation}
            > Locate 📍 </Button>
            <Button
                sx={{'border':'solid #2596be 1px', 'backgroundColor':'#1eaec0', 'textTransform':'none'}}
                variant='contained'
                onClick={handleOpen}
            > Add ⛲ </Button>
        </div>
        </>
    )
    
}


export default CoolerMap;