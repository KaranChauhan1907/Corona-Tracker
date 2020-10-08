import React from 'react'
import { Card,CardContent,Typography } from '@material-ui/core';
import "../App.css"
function InfoBox({title,cases,total,active,isRed,isBlack,...props}) {
    return (

            <Card onClick={props.onClick} className = {`infoBox ${active && "infoBox__selected"} ${isRed &&"infoBox__red"} ${isBlack && "infoBox__Black"}`}>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">{title}</Typography>  
                    <h2 className={`infoBox__cases ${isBlack && "infoBox__Black"} ${isRed &&"infoBox__red"}`}>{cases}</h2>
                    <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
                </CardContent>
            </Card>
    )
}

export default InfoBox
