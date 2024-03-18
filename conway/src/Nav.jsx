import { NavLink } from "react-router-dom";

// this is a nav bar 
export default function Nav(){
    return(
    <div>
        <div><b><h1>Conway's Game Of Life Game</h1></b></div>
        <div>
           <span><NavLink to="/Help">Rules For Game</NavLink></span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
           <span><NavLink to="/">Main Game</NavLink></span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
           <span><NavLink to="/Credits">Credits Page</NavLink></span>
           <div><span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
        </div>
    
    </div>)
}