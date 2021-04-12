import React, { useState, useEffect, useRef } from 'react'


const FlashcardItem = ({
    topic: {
        question,
        correct_answer,  
    }

}) => {
    
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')

    const frontEl =  useRef()
    const backEl = useRef()

    const decodeString = (str) => {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }

    const answer = decodeString(correct_answer)
    const questions = decodeString(question)

    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(() => {
        setMaxHeight()
    })

    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])



    return (
        <div
          className={`card ${flip ? 'flip' : ''}`}
          style={{ height: height }}
          onClick={() => setFlip(!flip)
          }>
            <div className="front" ref={frontEl}>
                {questions}
            </div>
            <div className="back" ref={backEl}>
                {answer}
            </div>
            
        </div>
    )
}


export default FlashcardItem
