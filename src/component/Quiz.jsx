import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizIsCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
export default function Quiz() {
  const [useAnswers, setUseAnswers] = useState([]);
  const activeQuestionIndex = useAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handelSelectAnswer =useCallback( function handelSelectAnswer(selectedAnswer) {
    setUseAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  },[]);
  
  const handleSkipAnswer = useCallback(()=> handelSelectAnswer(null),[handelSelectAnswer])

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
        onTimeout={handleSkipAnswer}/>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswer.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handelSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
