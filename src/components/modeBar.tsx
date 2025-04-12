import * as State from "../state.ts"

export default function ModeBar() {
    const handleQuizClick = () => {
        if (State.mode.value === "list") {
            State.createQuiz();
        }
        State.setMode();
    }
    
    return (
        <div className={`${
            State.mode.value === "quiz" ? "bg-blue-200" : "bg-gray-300"} flex justify-start p-[14px] flex-row`}>

            {State.mode.value === "quiz" && State.numSelectedQuestions.value > 0 ? (
                <>
                    <div className="font-sans text-[13pt] pt-[5px]">
                        {State.showResults.value
                        ? "Quiz Completed"
                        : `Question ${State.quizIndex.value + 1} of ${State.numSelectedQuestions.value}`}
                    </div>
                    <button className="w-[100px] p-[2px] font-sans text-[13pt] ml-auto" onClick={handleQuizClick}>
                        Exit
                    </button>
                </>
        ) : (
            <>
                <button 
                    className="w-[80px] p-[2px] font-sans text-[13pt] disabled:opacity-50 disabled:hover:bg-gray-200"
                    onClick={() => State.undo()}
                    disabled={!(State.canUndo.value)}>
                    Undo
                </button>
                <button
                    className="w-[80px] p-[2px] font-sans text-[13pt] ml-3 disabled:opacity-50 disabled:hover:bg-gray-200"
                    onClick={() => State.redo()}
                    disabled={!(State.canRedo.value)}>
                    Redo
                </button>
                <button
                    className="w-[100px] p-[2px] font-sans text-[13pt] ml-auto disabled:opacity-50 disabled:hover:bg-gray-200"
                    onClick={handleQuizClick}
                    disabled={State.numSelectedQuestions.value === 0}>
                    Quiz
                </button>
            </>
        )}
        </div>
    );
};
