import { useState } from "react";
import { Fountain } from "./FountainMarker"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


function FountainCard(
    {fountain, isCardOpen, setIsCardOpen, handleRemove}:
    {fountain:Fountain, isCardOpen:boolean, setIsCardOpen:Function, handleRemove:Function}
    ){


    return(
        <Dialog
            fullScreen
            open={isCardOpen}
            className="cooler-dialog"
            >
            <DialogTitle className="cooler-dialog-title">{fountain.name}</DialogTitle>
            <DialogContent>
                
                <DialogContentText className="cooler-description">
                    {fountain.description}
                </DialogContentText>
                
                <DialogContentText className="cooler-rating">
                    {fountain.rating}/10
                </DialogContentText>

                <DialogActions className="cooler-btns">
                    <Button variant="contained" onClick={() => {setIsCardOpen(false)}}>x</Button>
                    <Button onClick={() => {handleRemove()}}>🗑️</Button>
                </DialogActions>
            
            </DialogContent>
        </Dialog>
    )
};


export default FountainCard;