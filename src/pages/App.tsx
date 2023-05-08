import React from "react";
import { Grid } from "../components/Grid";
import { cards } from "../data/cards";

function App() {
    return (
        <div className="app">
            <Grid cards={cards} />
        </div>
    );
}

export default App;
