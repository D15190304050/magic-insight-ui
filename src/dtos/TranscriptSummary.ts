interface ContentStructure {
    title: string;
    content: string;
    children: ContentStructure[];
}

interface TranscriptSummary {
    canSummarize: boolean;
    summary: string;
    contentStructures: ContentStructure[];
    labels: string[];
}

export type {ContentStructure, TranscriptSummary}