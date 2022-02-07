import React, { useState } from 'react';

export default function ParameterSelection(props) {
	let [ Difficulty, setDifficulty ] = useState(2);
	let [ Duration, setDuration ] = useState(1);

	return (
		<div className="pageContainer">
			<div className="formRow">
				<select
				className='formInput'
					value={Difficulty}
					onChange={(e) => {
						setDifficulty(e.target.value);
					}}
				>
					<option value={1}>Easy Text</option>
					<option value={2}>Medium Text</option>
					<option value={3}>Hard Text</option>
				</select>
			</div>
			<div className="formRow">
				<select
				className='formInput'
					value={Duration}
					onChange={(e) => {
						setDuration(e.target.value);
					}}
				>
					<option value={1}>1 minute test</option>
					<option value={2}>2 minute test</option>
					<option value={3}>3 minute test</option>
					<option value={5}>5 minute test</option>
					<option value={10}>10 minute test</option>
				</select>
			</div>
			<div className="formRow">
				<button
				className='formInput submitButton'
					onClick={() => {
						props.StartTest(Difficulty, Duration);
					}}
				>
					Start Test
				</button>
			</div>
		</div>
	);
}
