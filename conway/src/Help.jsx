import Nav from "./Nav";

// our help page 
export default function Help() {
    return (
        <div>
            <div><Nav /></div>
            <div>Conway’s Game of Life (or just, Life, as I will call it) is a 
                game that is “played” based on a grid system.  
                Every individual location on the grid can be understood 
                as a cell.  The game, or simulation, occurs over iterations, 
                or generations.  After a generation, a cell may change from 
                living or dead based on how many living or dead neighbors it 
                had in a previous iteration.  A neighbor is any immediately 
                adjacent spot on the grid (horizontal, vertical or diagonal).  
                We can understand this with an example of the rules.
                
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                Conway's Game of Life has 4 simple rules:
                <div>&nbsp;</div>
                <div> A living cell with less than two living neighbours dies.</div>
                <div>A living cell with two or three live neighbours lives.</div>
                <div>A living cell with more than three live neighbours dies.</div>
                <div>A dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</div>
            </div>
        </div>
    )
}