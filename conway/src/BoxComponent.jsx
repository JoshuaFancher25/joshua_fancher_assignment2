import React, { useContext, useState, useEffect } from "react";
import Box from "./Box";
import { DataContext } from "./Data_provider";
import Nav from "./Nav";

export default function BoxComponent() {
    const { val, increaseBoxGridSize, increaseBoxGridSizeHeight, setVal } = useContext(DataContext);
    const [gridSize, setGridSize] = useState({ height: 20, width: 20 }); // default 
    
    const [livingCellsCount, setLivingCellsCount] = useState(0);

    // reset the grid
    const resetGrid = () => {
        setVal(prevVal => ({
            ...prevVal,
            boxGrid: Array.from({ length: 40 }, () => Array.from({ length: 40 }, () => false)),
        }));
        setLivingCellsCount(0);
    };

    // progress the simulation by one step
    const progressSimulation = () => {
        const boxGrid = val.boxGrid;
        const newBoxGrid = []; // next generation

        // count the cell alive 
        const countLivingNeighbors = (x, y) => {
            let count = 0;
            // for loop to count 
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue; 
                    const neighborX = x + i;
                    const neighborY = y + j;
                    // checking alive cells
                    if (
                        neighborX >= 0 &&
                        neighborX < gridSize.height &&
                        neighborY >= 0 &&
                        neighborY < gridSize.width &&
                        boxGrid[neighborX][neighborY]
                    ) {
                        count++;
                    }
                }
            }
            // return the count
            return count;
        };

        // following the game rules for the next generation 
        for (let i = 0; i < gridSize.height; i++) {
            const newRow = [];
            for (let j = 0; j < gridSize.width; j++) {
                const livingNeighbors = countLivingNeighbors(i, j);
                if (boxGrid[i][j]) {
                    // living or dying rule 1, 2, 3 
                    if (livingNeighbors < 2 || livingNeighbors > 3) {
                        newRow.push(false); // Cell die
                    } else {
                        newRow.push(true); // keeps living 
                    }
                } else {
                    // rule 4 
                    if (livingNeighbors === 3) {
                        newRow.push(true); // reactivate cell
                    } else {
                        newRow.push(false); // cell dies 
                    }
                }
            }
            newBoxGrid.push(newRow);
        }

        // update the grid
        setVal(prevVal => {
            return {
                ...prevVal,
                boxGrid: newBoxGrid,
            };
        });

   
    };

    useEffect(() => {
        // compute number of cells alive now 
        let count = 0;
        val.boxGrid.forEach(row => {
            row.forEach(cell => {
                if (cell) count++;
            });
        });
        setLivingCellsCount(count);
    }, [val.boxGrid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGridSize(prevSize => ({
            ...prevSize,
            [name]: parseInt(value),
        }));
    };

    // clicking the submit button 
    const handleSubmit = (e) => {
        e.preventDefault();
        const newHeight = parseInt(gridSize.height);
        const newWidth = parseInt(gridSize.width);
        if (newHeight < 3 || newHeight > 40 || newWidth < 3 || newWidth > 40) {

        } else {  
            increaseBoxGridSize(newWidth, newHeight);
            increaseBoxGridSizeHeight();
            
            // generate with random 0.05% chance to be alive 
            const newBoxGrid = [];
            for (let i = 0; i < newHeight; i++) {
                const newRow = [];
                for (let j = 0; j < newWidth; j++) {
                    const randomValue = Math.random();
                    // we set value to 0.15 because the game was ending too early with 0.05 
                    // nothing interesting was occuring with the too little cells 
                    newRow.push(randomValue <= 0.15);
                }
                newBoxGrid.push(newRow);
            }
            // update the gird
            setVal(prevVal => ({
                ...prevVal,
                boxGrid: newBoxGrid,
            }));
        }
    };

    // state to manage a heatmap for the game
    const [isHeatmapActive, setIsHeatmapActive] = useState(false); 
    const toggleHeatMap = () => {
        setIsHeatmapActive(!isHeatmapActive); // headmap button 
    };

    return (
        <div className="makeCentered">
            <div><Nav /></div>
            <div>&nbsp;</div>

            <form onSubmit={handleSubmit}>
                <label>
                    Height:
                    <input
                        type="number"
                        name="height"
                        value={gridSize.height}
                        onChange={handleInputChange}
                        min={3}
                        max={40}
                    />
                </label>
                <label>
                    Width:
                    <input
                        type="number"
                        name="width"
                        min={3}
                        max={40}
                        value={gridSize.width}
                        onChange={handleInputChange}
                    />
                </label>
                
                <button type="submit">Submit</button>
            </form>
            <div>
                <div>&nbsp;</div>
                <button onClick={resetGrid}>Reset Grid</button>
                <button onClick={progressSimulation}>Progress Simulation</button>
             
                
            <p><h3>Living Cells: {livingCellsCount}</h3></p>
            
            </div>
            
           
            <div id={isHeatmapActive ? "thediv" : undefined}>
            {Array.from({ length: gridSize.height }).map((_, i) => (
                <div key={i} className="boxRow">
                    {Array.from({ length: gridSize.width }).map((_, j) => (
                        <Box key={`${i}-${j}`} x={i} y={j} />
                    ))}
                </div>
            ))}
            </div>
            
            <div>&nbsp;</div>
            <button onClick={()=> toggleHeatMap()}>Heat Map</button>
           
        </div>
        
    );
}