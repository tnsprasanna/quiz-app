import * as State from "../state.ts"

export default function StatusBar() {

    const updateText = () => {
      if (State.numQuestions.value === 0) {
        return ""
      }
        if (State.numSelectedQuestions.value === 0) {
            if (State.numQuestions.value === 1) {
              return `${State.numQuestions.value} question`;
            } else {
              return `${State.numQuestions.value} questions`;
            }
          } else { //have selected questions
            if (State.numQuestions.value === 1) {
              return `${State.numQuestions.value} question (${State.numSelectedQuestions.value} selected)`;
            } else {
              return `${State.numQuestions.value} questions (${State.numSelectedQuestions.value} selected)`;
            }
        }
    };

    return(
        <div className={`flex bg-gray-300 text-[13pt] font-sans justify-start mt-[10px] ${State.numQuestions.value === 0 ? "p-[30px]" : "p-[17px]"}`}>
            {updateText()}

            {State.cheatingMode.value === true ? (<div id="cheatingText" className="ml-auto">
                CHEATING
            </div>) : null}
        </div>
    )
}
