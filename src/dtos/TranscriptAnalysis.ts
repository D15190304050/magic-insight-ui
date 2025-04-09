interface TranscriptAnalysis {
    speechRateAnalysis: SpeechRateAnalysis;
    questionAnalysis: QuestionAnalysis;
    interactionRecords: InteractionRecord[];
    courseAnalysis: CourseAnalysis;
    interactionTypeCountMap: Map<string, Map<string, number>>;
}
interface SpeechRateAnalysis {
    value: number;
    unit: string;
    wordCount: number;
    totalSeconds: number;
    analysisOfSpeechRate: string;
}

interface QuestionAnalysis {
    coreQuestionCount: number;
    evaluationCount: number;
    analysisOfQuestioning: string;
    analysisOfEvaluation: string;
}

interface InteractionRecord {
    question: Question;
    answers: string[];
    feedback: Feedback;
}

interface CourseAnalysis {
    totalMinutes: number;
    proportionTeacher: number;
    proportionStudent: number;
    aiCourseOverview: string;
}


interface Question {
    content: string;
    type: string;
}

interface Feedback {
    content: string;
    type: string;
}
export type{
    SpeechRateAnalysis,
    QuestionAnalysis,
    InteractionRecord,
    CourseAnalysis,
    TranscriptAnalysis,
    Question,
    Feedback
};