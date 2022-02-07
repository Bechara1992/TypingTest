import { useState, useEffect } from 'react';
import Paragraphs from "../Paragraphs.json";

export default function MainContainer(props) {

	const LineMaxChars = 44;
	let [ TypedText, setTypedText ] = useState('');
	let [ TypedTextVOriginal, setTypedTextVOriginal ] = useState([]);
	let [ DisplayableText, setDisplayableText ] = useState([]);
	let [ NextWordIndex, setNextWordIndex ] = useState(0);

	
	/*This function will run when the timer stops and the index of the next word is positive, (because if the timer
		is not running and the index of the next word is 0 means the component has just loaded) */
    useEffect(() => {
      if(!props.TimerRunning && NextWordIndex > 0){
		let WrongWords = 0;
		TypedTextVOriginal.forEach(Line =>{
			Line.forEach(wordObject =>{
				if(wordObject.InitialWord !== wordObject.TypedWord && wordObject.TypedWord !== '' && wordObject.TypedWord !== undefined && wordObject.TypedWord !== null) 
				{
					WrongWords++
				}
			})
		})

		props.FinishTest(TypedText.split(' ').length, WrongWords)
	  }
    }, [props, NextWordIndex, TypedTextVOriginal, TypedText]);



	const randomRange = (min, max) =>{
		return Math.floor(Math.random() * (max - min) + min);
	  }


	  /*This function will run when the component mounts, it will filter the paragraphs 
	  having the chosen difficulty and loops through them and adds them to the
	  text that will be displayed for the user to type.*/

	  useEffect(() => {	

		let FilteredParagraphs  = Paragraphs.Paragraphs.filter(paragraph => parseInt(paragraph.Level, 10) === parseInt(props.Difficulty, 10))

		 while(FilteredParagraphs.length > 0){
			 const RandomIndex = randomRange(0, FilteredParagraphs.length - 1)
			 SplitParagraph(FilteredParagraphs[RandomIndex].Paragraph)
			 FilteredParagraphs.splice(RandomIndex, 1)			
		 }		 
		setDisplayableText(TypedTextVOriginal.slice(0,3));
	}, []);



	/*This function will run asynchronously so it adds the lines correctly, in case it gets 
	called before an update some lines might be missing.
	It will get the array where the words and lines are stored and add to it the new lines.*/
	async function SplitParagraph(paragraph){		
		let splitInitialText = paragraph.split(' ');
		let DLines = TypedTextVOriginal;
		let DNewLine = [];
		let lineCount = 0;	


		splitInitialText.forEach((word, index) => {
			if (word.length + lineCount + 1 < LineMaxChars) {
				DNewLine.push({ InitialWord: word, TypedWord: '', wordIndex:index });
				lineCount += word.length + 1;
				if(splitInitialText.length - 1 === index){	
					DLines.push(DNewLine);
				}
			} else {
				DLines.push(DNewLine);
				lineCount = 0;
				DNewLine = [];
				DNewLine.push({ InitialWord: word, TypedWord: '', wordIndex:index });
			}
		});

		
		setTypedTextVOriginal(DLines);

	}

	// useEffect(() => {
	// 	let splitInitialText = [];
	//  let Lines = [];
	// 	let NewLine = [];
	// 	let DLines = [];
	// 	let DNewLine = [];
	// 	let lineCount = 0;		

	// 	let FilteredParagraphs  = Paragraphs.Paragraphs.filter(paragraph => parseInt(paragraph.Level, 10) === parseInt(props.Difficulty, 10))
	 	 //console.log(FilteredParagraphs, 1)

	// 	 while(FilteredParagraphs.length > 0){
	// 		 const RandomIndex = randomRange(0, FilteredParagraphs.length - 1)
	// 		 splitInitialText = FilteredParagraphs[RandomIndex].Paragraph.split(' ')
	// 		 FilteredParagraphs.splice(RandomIndex, 1)
	// 		 console.log(RandomIndex, FilteredParagraphs.length)
			 
	// 		splitInitialText.forEach((word, index) => {
	// 			if (word.length + lineCount + 1 < LineMaxChars) {
	// 				NewLine.push(word);
	// 				DNewLine.push({ InitialWord: word, TypedWord: '', wordIndex:index });
	// 				lineCount += word.length + 1;
	// 				console.log(NewLine)
	// 				if(splitInitialText.length - 1 === index){					
	// 					Lines.push(NewLine);
	// 					DLines.push(DNewLine);
	// 				}
	// 			} else {
	// 				Lines.push(NewLine);
	// 				DLines.push(DNewLine);
	// 				lineCount = 0;
	// 				NewLine = [];
	// 				DNewLine = [];
	// 				NewLine.push(word);
	// 				DNewLine.push({ InitialWord: word, TypedWord: '', wordIndex:index });
	// 			}
	// 		});
	// 	 }
		 
	// 	 console.log(DLines)
	// 	setTypedTextVOriginal(DLines);
	// 	setDisplayableText(DLines.slice(0,3));
	// }, []);
	


	/*This function will get called every time the text in the input changes,
	it will split the text and distribute it accordingly in the array that will 
	display both the target text and the typed text.*/
	function textChanged(e) {
		if(!props.TimerRunning){
			props.StartTimer();
		}
		setTypedText(e.target.value);
		const splitTypedText = e.target.value.split(' ');
		let Count = 0;
		let LastTypesLineIndex = 0;
		let typedTextVOriginal = [...TypedTextVOriginal];
		typedTextVOriginal.forEach((line, index) => {
			line.forEach(wordObj =>{
				if(splitTypedText[Count] !== '' && splitTypedText[Count] !== undefined) LastTypesLineIndex = index;


				wordObj.TypedWord = splitTypedText[Count];
				Count += 1;
			})
		})
		const startIndex = (LastTypesLineIndex <= 1 ) ? 0 : LastTypesLineIndex - 1;
		const endIndex = startIndex + 3;
		let Displayable = typedTextVOriginal.slice(startIndex,endIndex);
		setDisplayableText(Displayable);
		setTypedTextVOriginal(typedTextVOriginal)
		setNextWordIndex(splitTypedText.length - 1)
	}

	/*This is just so the input doesn't lose focus*/
	useEffect(() => {
		const StayFocused = (event) => {
			event.preventDefault();
		};

			document.addEventListener('mousedown', StayFocused);
		return () => {
			document.removeEventListener('mousedown', StayFocused);
		};
	});

	return (
		<div className="mainContainerPage">
			<div className='canvasContainer'>
				<canvas width="600" height="300" />
				<div className="textContainer">
					{DisplayableText.map((Line, index) => (
						<div key={index}>
							<div className="textLine">
								{Line.map((word, index1) => (
									<span key={index1} className={`${word.wordIndex === NextWordIndex ? 'blueText' : ''}`}>
										{index1 > 0 ? ' ' : ''}
										{word.InitialWord}
									</span>
								))}
							</div>

							<div className="typingLine">
								{Line.map((word, index2) => (
									<span
										key={index2}
										className={`${word.TypedWord !== word.InitialWord && word.wordIndex < NextWordIndex
											? 'redText'
											: ''}`}
									>
										{index2 > 0 ? ' ' : ''}
										{word.TypedWord}
									</span>
								))}
							</div>
						</div>
                    ))}
				</div>

				<input
					autoFocus
					type="text"
					className='canvasInput'
					onChange={(e) => textChanged(e)}
				/>
			</div>
		</div>
	);
}
