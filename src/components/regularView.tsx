import { useEffect } from "preact/hooks";

import * as State from "../state.ts"

import ModeBar from "./modeBar.tsx"
import ListView from "./listView.tsx";
import StatusBar from "./statusBar.tsx";
import QuizView from "./quizView.tsx";
import EditModal from "./editModal.tsx";

export default function RegularView() {

    useEffect(() => {
        const handleCheatingKey = (e: KeyboardEvent) => {
            console.log(`Key pressed: ${e.key}`);
            if (e.key === "?") {
                console.log("inside if condition");
                State.setCheatingMode();
            }
        };
        document.addEventListener("keydown", handleCheatingKey);
        return () => { document.removeEventListener("keydown", handleCheatingKey); };
    });

    return (
        <div className="flex flex-col h-screen">
            <ModeBar/>
            {State.mode.value === "list" ? 
            (<ListView />) : (<QuizView /> )}
            <StatusBar />
            <EditModal />
        </div>
    );
};
