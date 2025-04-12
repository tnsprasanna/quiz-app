import { computed, signal } from "@preact/signals";
import { UndoManager } from "./undo";
import { randomQuestion } from "./questions";

export type Question = {
    id: number;
    question: string;
    answer: string;
    other1: string;
    other2: string;
    selected: boolean;
};

export const uniqueId = signal(1);

// Edit Region

export const isOverlayOn = signal(false);
export const editId = signal(0);


// Mode Region
export let mode = signal("list");

export const setMode = () => {
    mode.value = mode.value === "list" ? "quiz" : "list";
}


// Cheating Mode Region
export const cheatingMode = signal(false);
export const setCheatingMode = () => {
    cheatingMode.value = cheatingMode.value === false ? true : false;
}


// Questions Region
const initQuestions = () => 
    [...Array(4)].map(() => ({
        id: uniqueId.value++, 
        selected: false, 
        ...randomQuestion()
    }));

export const questions = signal<Question[]>(initQuestions());

export const numQuestions = computed(() => questions.value.length)

export const numSelectedQuestions = computed (() => questions.value.filter((q) => q.selected).length)

const createQuestion = (q: {
    question: string;
    answer: string;
    other1: string;
    other2: string;
}) => {
    const id = uniqueId.value++;
    undoManager.execute({
        do: () => {
          questions.value = [...questions.value,{id, selected: false, ... q}];

          // for redo to be disabled properly
          canUndo.value = undoManager.canUndo;
          canRedo.value = undoManager.canRedo;
        },
        undo: () => {
          questions.value = questions.value.slice(0, -1);

          // for undo to be disabled properly
          canUndo.value = undoManager.canUndo;
          canRedo.value = undoManager.canRedo;
        },
      });

    questions.value = [...questions.value,{id, selected: false, ... q}];

    // for undo + redo to be enabled properly
    canUndo.value = undoManager.canUndo;
    canRedo.value = undoManager.canRedo;
}

export const updateQuestion = (newQuestion: Question) => {
    const originalQuestion = getQuestion(newQuestion.id);
    if (!originalQuestion) return;

    undoManager.execute({
        do: () => {
            questions.value = questions.value.map((q) => q.id === newQuestion.id ? newQuestion : q);

            canUndo.value = undoManager.canUndo;
            canRedo.value = undoManager.canRedo;
            
        },
        undo: () => {
            questions.value = questions.value.map((q) => q.id === newQuestion.id ? originalQuestion : q);

            canUndo.value = undoManager.canUndo;
            canRedo.value = undoManager.canRedo;
        }
    });

    questions.value = questions.value.map((q) => q.id === newQuestion.id ? newQuestion : q);
    canUndo.value = undoManager.canUndo;
    canRedo.value = undoManager.canRedo;
}

export const createRandomQuestion = () => {
    createQuestion(randomQuestion());
    console.log(undoManager.canUndo);
}

export const allQuestions = () => {
    return questions.value.map((q) => ({...q}));
}

export const selectQuestion = (id: number) => {
    questions.value = questions.value.map((q) => q.id === id ? {...q, selected: !q.selected} : q)
}

export const setSelectedQuestions = (value: boolean) => {
    questions.value = questions.value.map((q) => ({...q, selected: value}));
}

export const getQuestion = (id: number) => {
    return questions.value.find((q) => q.id === id);
}

export const deleteSelectedQuestions = () => {
    const deletedQuestions = questions.value.filter((q) => q.selected);

    const deletedQuestionIndices = questions.value
    .map((q, index) => (q.selected ? index : -1))
    .filter(index => index !== -1);

    undoManager.execute({
      do: () => {
        deletedQuestions.forEach((q) => questions.value = questions.value.filter((q2) => q2.id !== q.id));

        canUndo.value = undoManager.canUndo;
        canRedo.value = undoManager.canRedo;

      },
      undo: () => {
        questions.value = questions.value.map((q) => ({...q, selected : false}));

        const newQuestions = [...questions.value];

        deletedQuestionIndices.forEach((i, j) => {
            newQuestions.splice(i, 0, deletedQuestions[j])
        });

        questions.value = newQuestions;

        canUndo.value = undoManager.canUndo;
        canRedo.value = undoManager.canRedo;
      },
    });
    
    questions.value = questions.value.filter((q) => !q.selected);

    canUndo.value = undoManager.canUndo;
    canRedo.value = undoManager.canRedo;
  }


// Quiz Region
let quizOrder: number[] = [];
export const numCorrect = signal(0);
export const numIncorrect = signal(0);
export const quizIndex = signal(0);
export const showResults = signal(false);
export const currSelectedQuestion = signal(1);

export const quizButtonClicked = signal(false);

export const quizDone = () => {
    return (quizIndex.value === numSelectedQuestions.value - 1 && mode.value === "quiz")
}

export const getQuizQuestion = (): Question | undefined => {
    return getQuestion(quizOrder[quizIndex.value]);
}

export const createQuiz = () => {
    quizOrder = questions.value.filter((q) => q.selected).map((q) => q.id).sort(() => Math.random() - 0.5);

    quizIndex.value = 0;
    numCorrect.value = 0;
    numIncorrect.value = 0;
    showResults.value = false;
} 


// Undo Region
const undoManager = new UndoManager();
export const canUndo = signal(undoManager.canUndo);
export const canRedo = signal(undoManager.canRedo);

export const undo = () => {
    undoManager.undo();
};

export const redo = () => {
    undoManager.redo();
};

