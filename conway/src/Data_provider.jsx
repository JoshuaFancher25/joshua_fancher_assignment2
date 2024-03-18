import { createContext, useState } from "react";

// createContext - powerful component that give lots of functionality 
// mainly it allows us to manage and store global data 

export const DataContext = createContext(); 

// need to create a component that will pass props to all children 

export function Data_provider(props){

    const[val, setVal] = useState({
        clickCount: 0, 
         boxGrid: Array.from({ length: 40 }, () => Array.from({ length: 40 }, () => false)),
    
    }); 


    function increaseBoxGridSize(){
        const boxGrid = val.boxGrid; 
        for(let i = 0; i < boxGrid.length; i++){
            boxGrid[i].push(false); 
        }
        setVal({
            ...val, 
            boxGrid: boxGrid, 
        })
    }
    
    //----------------------------------------------
    function increaseBoxGridSizeHeight() {
        setVal(prevVal => {
            const newBoxGrid = prevVal.boxGrid.map(row => [...row]);
            const newRow = new Array(prevVal.boxGrid[0].length).fill(false);
            newBoxGrid.push(newRow);
            return {
                ...prevVal,
                boxGrid: newBoxGrid,
            };
        });
    }

    const sumContextProviderValue = {
        val: val, 
        increaseBoxGridSize: increaseBoxGridSize, 
        increaseBoxGridSizeHeight: increaseBoxGridSizeHeight,
        setVal: setVal
    }

    return(
        <DataContext.Provider value={sumContextProviderValue}>
            {props.children}
        </DataContext.Provider>
    )

}

