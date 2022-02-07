import React, { useState, useEffect } from 'react';

export default function Timer(props) {
	//const initialMinute = 2,
		//initialSeconds = 0;
	const [ minutes, setMinutes ] = useState(props.Duration);
	const [ seconds, setSeconds ] = useState(0);
    

	useEffect(() => {
		let myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(seconds, minutes, myInterval);
                    console.log('StopTimer')
                    props.StopTimer();
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	return (
		<div className='pageContainer'>
			{minutes === 0 && seconds === 0 ? minutes : (
				<h1 className='TimerDisplay'>
					{' '}
					{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</h1>
			)}
		</div>
	);
}
