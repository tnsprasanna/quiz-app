import { useEffect, useState } from "preact/hooks";
import * as State from "../state.ts"

export default function QuizView() {
    const q = State.getQuizQuestion();

    const [buttons, setButtons] = useState<{text: string, type: string}[]>([]);

    const handleQuizButton = (button: string) => {
        console.log(State.cheatingMode.value);
        State.quizButtonClicked.value = true ? false : true;
        if (State.quizDone()) {
            State.showResults.value = true;
        }
        if (button == "answer") {
            State.numCorrect.value += 1;
        } else {
            State.numIncorrect.value += 1;
        }
        State.quizIndex.value += 1;
    }

    useEffect(() => {
        if (q) {
            const buttons = [
                { text: q?.answer, type: "answer" },
                { text: q?.other1, type: "other1" },
                { text: q?.other2, type: "other2" },
            ];
        
            // shuffle the buttons array
            buttons.sort(() => Math.random() - 0.5);

            setButtons(buttons);
        }
    }, [q])

    return(
        <div id="quizContainer"
        className="flex justify-between flex-1 flex-col m-[35px] border border-black">
            {State.showResults.value === true ? (
                <>
                    <div></div>
                    <div id="score" className="flex self-center text-[16pt] font-bold font-sans">
                    {`${State.numCorrect.value} Correct, ${State.numIncorrect.value} Incorrect`}
                    </div>
                    <div></div>
                </>
                
            ) : (
                <>
                    <div id="emptyDiv"></div>
                    <div className="flex text-center text-[16pt] font-sans self-center font-bold p-[30px] pl-[10px] pr-[10px]">
                        {q?.question}
                    </div>
                    <div id="answerPanel" className="flex gap-[15px] px-[10px] pb-[10px] box-border">
                        {buttons.map((button, index) => (
                            <button
                            key={index}
                            className={`flex-1 text-[13pt] font-sans ${State.cheatingMode.value && button.type === "answer" ? "bg-yellow-50" : ""}`}
                            onClick={() => handleQuizButton(button.type)}>
                                {button.text}
                            </button>))}
                    </div>
                </>
            )}
        </div>
    )
}
