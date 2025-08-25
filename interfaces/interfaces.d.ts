interface QuestionData {
    stem: string;
    stimulus?: string; // Only on reading questions
    rationale: string;
    answerOptions?: answerOption[];
    correct_answer: string[];
}

type answerOption = {
    id: string;
    content: string;
}

/**
 * Question Domains:
 * 
 * INI - Information and Ideas
 * CAS - Craft and Structure
 * EOI - Expression of Ideas
 * SEC - Standard English Conventions
 * H - Algebra
 * P - Advanced Math
 * Q - Problem-Solving and Data Analysis
 * S - Geometry and Trigonometry
 */

interface QuestionDescription {
    external_id: string; // Long question ID
    questionId: string; // Short question ID
    skill_desc: string; // Skill
    createDate: number; // Creation date in ms
    primary_class_cd: string; // Question Domain
    primary_class_cd_desc: string; // Domain Description
    difficulty: string; // Difficulty
    score_band_range_cd: number; // Difficulty level
}

type QuestionList = QuestionDescription[];
