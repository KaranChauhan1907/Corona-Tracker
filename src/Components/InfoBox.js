import React from 'react'
import { Card,CardContent,Typography } from '@material-ui/core';
function InfoBox({title,cases,total}) {
    return (
        <div className = "infoBox">
            <Card>
                <CardContent>
                    <Typography classname="infoBox_title" color="textSecondary">{title}</Typography>  
                    <h2 classname="infoBox_cases">{cases}</h2>
                    <Typography classname="infoBox_total" color="textSecondary">{total} Total</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
