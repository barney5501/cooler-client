import React, { useState } from "react";
import { Fountain } from "./FountainMarker";

function CoolerDialog(){
    const [dialog, setDialog] = useState<HTMLDivElement | null>(null);
    const [fountainName, setName] = useState("");
    const [fountainDescription, setDescription] = useState("");
    const [fountainRating, setRating] = useState(0);

    function handleSet(e:React.ChangeEvent<HTMLInputElement>){
        if(e.target.name == "title"){
            setName(e.target.value);
        }
        else if(e.target.name == "rating"){
            setRating(Number(e.target.value));
        }
        else{
            setDescription(e.target.value);
        }
    }

    return (
        <div ref={setDialog}>
            <form>
                <input type="text" onChange={handleSet} name="title" placeholder="שם לברזיה" /> <br />
                <input type="number" onChange={handleSet} step="0.1" min="0" max="10" name="rating" placeholder="0" /> <br />
                <input type="text" onChange={handleSet} name="description" placeholder="תיאור לברזיה" /> <br />
                <input type="submit" name="submit" value={"הוסף ברזיה"} />
            </form>
        </div>
    )
}


export default CoolerDialog;