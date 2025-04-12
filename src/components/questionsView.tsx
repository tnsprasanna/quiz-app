import * as State from "../state.ts"
import QuestionView from "./questionView.tsx"

export default function QuestionsView() {

    return (
        <div id="questionsContainer" className="flex content-start flex-wrap flex-1 ml-[10px] mr-[10px] border border-black gap-[10px] p-[10px]">
            {State.mode.value === "quiz" ? null : (
                State.allQuestions().map((q) => (
                    <QuestionView text={q.question} id={q.id}/>
                ))
            )}
        </div>
    )
}
