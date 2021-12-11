import dayjs from 'dayjs';
import APIError from '../errors/APIError';
import { AskedQuestion, Question } from '../interfaces/QuestionsInterface';
import * as questionsRepositories from '../repositories/questionsRepositories';

async function postQuestion(question: Question): Promise<number> {
    const result = await questionsRepositories.postQuestion(question);
    return result.id;
}

async function getQuestionById(questionId: number): Promise<AskedQuestion> {
    const result = await questionsRepositories.getQuestionById(questionId);

    if (result === null) {
        throw new APIError('question doesnt exist', 'NotFound');
    }

    if (!result.answered) {
        delete result.answeredAt;
        delete result.answeredBy;
        delete result.answer;
    }
    
    delete result.score;
    result.submittedAt = dayjs(result.submittedAt).format('YYYY-MM-DD HH:mm')
    return result;
}

export { postQuestion, getQuestionById };