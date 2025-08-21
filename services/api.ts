const GET_QUESTIONS_URL =
    'https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-questions';
const GET_QUESTION_URL =
    'https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-question';

export const getQuestions = async () => {
    const GET_QUESTIONS_OPTIONS = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            asmtEventId: 99,
            test: 2,
            domain: 'H,P,Q,S',
        }),
    };

    try {
        const response = await fetch(GET_QUESTIONS_URL, GET_QUESTIONS_OPTIONS);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching questions: ${error}`);
        throw error;
    }
};

export const getQuestion = async (questionId: string) => {
    const GET_QUESTION_OPTIONS = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            external_id: questionId,
        }),
    };

    try {
        const response = await fetch(GET_QUESTION_URL, GET_QUESTION_OPTIONS);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching questions: ${error}`);
        throw error;
    }
};
