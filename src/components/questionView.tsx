import * as State from "../state.ts"
import "./editModal.tsx"

export default function QuestionView({text, id}: { text: string, id: number}) {
    const question = State.getQuestion(id);

    const handleEdit = () => {
        if (question) {
            State.editId.value = question.id;
        }
        
        State.isOverlayOn.value = true;
    }

    return (
        <div id="questionTile" onDblClick={handleEdit}
        className="flex bg-blue-200 p-[8px] gap-[7px] items-center">
            <input
                id="checkbox"
                type="checkbox"
                checked={question?.selected}
                onChange={() => State.selectQuestion(id)}>
            </input>
            <div id="questionText" className="font-sans text-[10pt]">
                {text}
            </div>
        </div>
    )
}
