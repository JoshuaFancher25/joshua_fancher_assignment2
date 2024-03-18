// box
import { useContext } from 'react';
import './App.css'
import './thestyling.css'
import { DataContext } from './Data_provider';

// dynamically create the grid. 



export default function Box(props){
    // setStateContext will be used to update the array we are using 
    const { val, setVal } = useContext(DataContext);
    const boxGrid = val.boxGrid;
    const isAlive = boxGrid[props.x][props.y];

    

    function onClick() {
        // this is where we would need to handle the the heat map as well here
        // we can put the logic for the heatmap here but its only displayed when a button is toggled to
        // display the heatmap 
        boxGrid[props.x][props.y] = !isAlive; 
        setVal({
            // the ... is used to make a copy of the array then we can update the values 
            ...val, 
            boxGrid: boxGrid, 
        })
    }


    let className = "box"

    if(isAlive){
        className += " alive"
    }

    return(
        <div className = {className} onClick={onClick}/>
    )
}