import * as State from "../state.ts"

import QuestionsView from "./questionsView.tsx";

export default function ListView() {

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <div id="panel" className="flex justify-start bg-slate-100 p-[10px] border border-black mt-[10px] ml-[10px] mr-[10px] gap-[10px]">
                <button 
                className="toolBar"
                onClick={() => State.setSelectedQuestions(true)}
                disabled={!(State.numSelectedQuestions.value < State.numQuestions.value)}>
                    All
                </button>

                <button
                className="toolBar"
                onClick={() => State.setSelectedQuestions(false)}
                disabled={(State.numSelectedQuestions.value === 0)}>
                    None
                </button>

                <button
                className="toolBar"
                onClick={() => State.deleteSelectedQuestions()}
                disabled={State.numSelectedQuestions.value === 0}>
                    Delete
                </button>

                <button
                className="toolBar"
                onClick={() => State.createRandomQuestion()}
                disabled={State.numQuestions.value >= 10}>
                    Add
                </button>
            </div>
            <QuestionsView />
        </div>
    )
}
