import { useState, useEffect } from 'react';
import MainContainer from './Components/MainContainer';
import Timer from './Components/Timer';
import ParameterSelection from './Components/ParameterSelection.jsx';
import Results from './Components/Results.jsx';

import './App.css';

function App() {
	let [ TimerRunning, setTimerRunning ] = useState(false);
	let [ TestStarted, setTestStarted ] = useState(false);
	let [ TestStopped, setTestStopped ] = useState(false);
	let [ Difficulty, setDifficulty ] = useState(2);
	let [ Duration, setDuration ] = useState(1);
	let [ TotalWords, setTotalWords ] = useState(() => {return 0});
	let [ WrongWords, setWrongWords ] = useState(() => {return 0});



  function StartTest(Difficulty, Duration){
    setDifficulty(Difficulty);
    setDuration(Duration);
    setTestStarted(true)
  }

  function FinishTest(TotalWords, WrongWords){
    setWrongWords(prev => {return prev + WrongWords})
    setTotalWords(prev => {return prev + TotalWords})
	setTestStopped(true);
  }

  function RestartTest(){
	setTimerRunning(false);
	setTestStarted(false);
	setTestStopped(false);
	setDifficulty(2);
	setDuration(1);
	setTotalWords((prev) => {return prev * 0})
	setWrongWords((prev) => {return prev * 0})
  }


	return (
		<main>
			{!TestStarted ? (
				<section>
					<ParameterSelection StartTest={StartTest}/>
				</section>
			) : (TestStarted && !TestStopped) ? (
				<section>
					<MainContainer Difficulty={Difficulty} TimerRunning={TimerRunning} FinishTest={FinishTest} StartTimer={() => setTimerRunning(true)} />

					{TimerRunning && <Timer Duration={Duration} StopTimer={() => {setTimerRunning(false)}} />}
				</section>
			) : 
			<>
        	<Results TotalWords={TotalWords} WrongWords={WrongWords} Duration={Duration} />
			<div className="formRow">
			<button
			className='formInput submitButton' onClick={RestartTest}>Restart Test</button></div>
			</>
    }
		</main>
	);
}

export default App;
