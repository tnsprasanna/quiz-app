import { useEffect, useState } from "preact/hooks";
import * as State from "../state.ts"

export default function EditModal() {
    const q = State.editId.value !== null ? State.getQuestion(State.editId.value) : null;
    
    if (!q) return null;

    const [questionField, setQuestion] = useState(q?.question);
    const [answerField, setAnswer] = useState(q?.answer);
    const [other1Field, setOther1] = useState(q?.other1);
    const [other2Field, setOther2] = useState(q?.other2);

    useEffect(() => {
        if (q) {
            setQuestion(q.question);
            setAnswer(q.answer);
            setOther1(q.other1);
            setOther2(q.other2);
        }
    }, [q]);

    const handleSubmit = (event: Event) => {
        event.preventDefault();
        const newQuestion = {...q, question: questionField, answer: answerField, other1: other1Field, other2: other2Field};
        State.updateQuestion(newQuestion);
        State.isOverlayOn.value = false;
    }

    const handleCancel = () => {
        setQuestion(q.question);
        setAnswer(q.answer);
        setOther1(q.other1);
        setOther2(q.other2)
        State.isOverlayOn.value = false
    }

    return (
        <div className={State.isOverlayOn.value ? "fixed inset-0 bg-black bg-opacity-50 flex items-center font-sans" : "hidden"}>
            <div id="edit" className="flex m-[60px] flex-1 bg-gray-100 border border-black p-[30px] flex-col font-sans gap-[10px]">
                <form id="form" onSubmit={handleSubmit}
                className="flex flex-col gap-[10px] font-sans">
                    <div className="fieldContainer">
                        <span className="labels">Question</span>
                        <input className="text" name="question" value={questionField} onChange={(e) => setQuestion(e.currentTarget.value)}/>
                    </div>
                    <div className="fieldContainer">
                        <span className="labels">Answer</span>
                        <input className="text" name="answer" value={answerField} onChange={(e) => setAnswer(e.currentTarget.value)}/>
                    </div>
                    <div className="fieldContainer">
                        <span className="labels">Other 1</span>
                        <input className="text" name="other1" value={other1Field} onChange={(e) => setOther1(e.currentTarget.value)}/>
                    </div>
                    <div className="fieldContainer">
                        <span className="labels">Other 2</span>
                        <input className="text" name="other2" value={other2Field} onChange={(e) => setOther2(e.currentTarget.value)}/>
                    </div>
                    <div id="formButtons" className="flex gap-[10px] justify-end pl-[153px]">
                        <button className="font-sans text-[12pt] p-[2px] w-[70px]" type="submit">Save</button>
                        <button className="font-sans text-[12pt] p-[2px] w-[80px]" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
