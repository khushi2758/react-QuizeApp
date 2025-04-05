import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizIsCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [useAnswers, setUseAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? useAnswers.length : useAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handelSelectAnswer = useCallback(
    function handelSelectAnswer(selectedAnswer) {
      setAnswerState('answered');
      setUseAnswers((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });
      setTimeout(() => {
        if (setUseAnswers === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handelSelectAnswer(null),
    [handelSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizIsCompleteImg} alt=" Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswer.sort((a, b) => Math.random() - 0.5);
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswer.map((answer) => {
           
           const isSelected = useAnswers[useAnswers.length - 1] === answer; 
           let cssClass = '';
           
           if(answerState === 'answered' && isSelected) {
            cssClass= 'selected';
           }
            
            if((answerState === 'correct' || answerState === 'wrong' ) && isSelected)
            {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button onClick={() => handelSelectAnswer(answer) }
                  className={cssClass}
                  >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
