"use client";

import { axiosWithCredentials } from "../../../Account/client";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

// Base API paths
export const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
export const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;

// =========================================
// QUIZZES
// =========================================

export const getQuizzesForCourse = async (cid: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/courses/${cid}/quizzes`
  );
  return data;
};

export const createQuiz = async (cid: string) => {
  const { data } = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/courses/${cid}/quizzes`,
    { title: "New Quiz" }
  );
  return data;
};

export const deleteQuiz = async (qid: string) => {
  await axiosWithCredentials.delete(`${QUIZZES_API}/${qid}`);
};

export const publishQuiz = async (qid: string, published: boolean) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${qid}/publish`,
    { published }
  );
  return data;
};

// =========================================
// USER SESSION
// =========================================

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosWithCredentials.get(
      `${HTTP_SERVER}/api/users/profile`
    );
    return data;
  } catch (e) {
    return null; // Not logged in
  }
};

export const getProfile = async () => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/users/profile`
  );
  return data;
};

// =========================================
// QUIZ DETAILS
// =========================================

export const getQuizById = async (qid: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${qid}`);
  return data;
};

export const updateQuiz = async (qid: string, quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${qid}`,
    quiz
  );
  return data;
};

export const togglePublishQuiz = async (qid: string) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${qid}/togglePublish`,
    {}
  );
  return data;
};

// =========================================
// QUESTIONS
// =========================================

export const getQuestionById = async (questionId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUESTIONS_API}/${questionId}`
  );
  return data;
};

export const getQuestionsForQuiz = async (qid: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${qid}/questions`
  );
  return data;
};

export const createQuestion = async (qid: string, question: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${qid}/questions`,
    question
  );
  return data;
};

export const updateQuestion = async (questionId: string, question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${questionId}`,
    question
  );
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
};

// =========================================
// ATTEMPTS
// =========================================

export const getLastAttemptForQuiz = async (qid: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${qid}/attempt/last`
  );
  return data;
};

export const submitQuiz = async (qid: string, payload: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${qid}/attempt`,
    payload
  );
  return data;
};

export const getAttemptsForQuiz = async (qid: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${qid}/attempts`
  );
  return data;
};
