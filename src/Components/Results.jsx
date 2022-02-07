import React, { useState, useEffect } from 'react';

export default function Results({ TotalWords, WrongWords, Duration }) {
	let [ WordsPerMinute, setWordsPerMinute ] = useState(null);
	let [ AccuracyPercentage, setAccuracyPercentage ] = useState(null);
	let [ TotalResult, setTotalResult ] = useState(null);

	useEffect(
		() => {
			let AccuracyPercentage = 100 - Math.round(WrongWords / TotalWords * 100);
			let WordsPerMinute = Math.round(TotalWords / Duration);
			let TotalResult = Math.round(AccuracyPercentage * WordsPerMinute / 100);
			setAccuracyPercentage(AccuracyPercentage);
			setWordsPerMinute(WordsPerMinute);
			setTotalResult(TotalResult);
		},
		[ TotalWords, WrongWords, Duration ]
	);

	return (
		<div className="pageContainer">
			<div className="ScoreHeader">Your Test Score</div>

			<div className="ScoreResultsContainer">
				<div className="ScoreResultsColumn">
					<div className="ScoreResultDisplay">
						{WordsPerMinute} <br /> WPM
					</div>{' '}
					<br />
					<div className="ScoreResultDisplay">Typing Speed</div>
				</div>X
				<div className="ScoreResultsColumn">
					<div className="ScoreResultDisplay">
						{AccuracyPercentage} % <br /> {WrongWords} Typos
					</div>{' '}
					<br />
					<div className="ScoreResultDisplay">Accuracy</div>
				</div>=
				<div className="ScoreResultsColumn">
					<div className="ScoreResultDisplay">
						{TotalResult} <br /> WPM
					</div>{' '}
					<br />
					<div className="ScoreResultDisplay">Net Speed</div>
				</div>
			</div>
		</div>
	);
}
