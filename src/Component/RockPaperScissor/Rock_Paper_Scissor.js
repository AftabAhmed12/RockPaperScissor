import React, { Fragment, useRef, useState, useEffect } from 'react';
import './Rock_Paper_Scissor.css';
import rock from '../images/rock.png';
import paper from '../images/paper.png';
import scissor from '../images/scissor.png';

const RockPaperScissor = () => {
    const rockRef = useRef(null);
    const paperRef = useRef(null);
    const scissorRef = useRef(null);
    const containerRef = useRef(null);
    const choiceRef = useRef(null);
    const paraRef = useRef(null);
    const [userWin, setUserWin] = useState(0);
    const [compWin, setCompWin] = useState(0);
    const [isExplosion, setIsExplosion] = useState(false);

    useEffect(() => {
        if (isExplosion) {
            const timer = setTimeout(() => {
                setIsExplosion(false);
            }, 3000); // Hide explosion after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [isExplosion]);

    const checkExplosion = () => {
        if (userWin >= 5 && compWin < userWin) {
            setIsExplosion(true);
        }
    };

    const gameDraw = (userChoice, comChoice) => {
        paraRef.current.innerText = `You chose ${userChoice} and bot also chose ${comChoice}`;
        paraRef.current.style.backgroundColor = "rgba(126, 126, 126, 0.5)";
    };

    const computerWins = (userChoice, comChoice) => {
        paraRef.current.innerText = `Loss! ${comChoice} beats ${userChoice}`;
        paraRef.current.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        setCompWin((prevCompWin) => prevCompWin + 1);
    };

    const userWins = (userChoice, comChoice) => {
        paraRef.current.innerText = `Winner! ${userChoice} beats ${comChoice}`;
        paraRef.current.style.backgroundColor = "rgba(1, 128, 1, 0.5)";
        setUserWin((prevUserWin) => prevUserWin + 1);
        checkExplosion();
    };

    const handleClick = (choice) => {
        const choices = ["rock", "paper", "scissor"];
        const getRandom = Math.floor(Math.random() * 3);
        const compChoice = choices[getRandom];

        if (choice === compChoice) {
            gameDraw(choice, compChoice);
        } else if (
            (choice === "rock" && compChoice === "scissor") ||
            (choice === "paper" && compChoice === "rock") ||
            (choice === "scissor" && compChoice === "paper")
        ) {
            userWins(choice, compChoice);
        } else {
            computerWins(choice, compChoice);
        }
    };

    const handleMouseOver = (ref) => {
        if (ref.current && containerRef.current) {
            const backgroundColor = window.getComputedStyle(ref.current).backgroundColor;
            containerRef.current.style.backgroundColor = backgroundColor;
            containerRef.current.style.color = backgroundColor === "rgb(255, 165, 0)" ? "black" : "";
            containerRef.current.style.color = backgroundColor === "rgb(0, 128, 0)" ? "white" : "";
            containerRef.current.style.color = backgroundColor === "rgb(255, 255, 0)" ? "black" : "";
        }
    };

    return (
        <Fragment>
            <div className="Rock_Paper_Scissor" ref={containerRef}>
                <div className="Rock_Paper_Scissor_Section">
                    <h1>Rock-Paper-Scissor</h1>
                    <div className="Choices" ref={choiceRef}>
                        <div
                            ref={rockRef}
                            onMouseOver={() => handleMouseOver(rockRef)}
                        >
                            <img src={rock} onClick={() => handleClick('rock')} alt="rock" />
                        </div>
                        <div
                            ref={paperRef}
                            onMouseOver={() => handleMouseOver(paperRef)}
                        >
                            <img src={paper} onClick={() => handleClick('paper')} alt="paper" />
                        </div>
                        <div
                            ref={scissorRef}
                            onMouseOver={() => handleMouseOver(scissorRef)}
                        >
                            <img src={scissor} onClick={() => handleClick('scissor')} alt="scissor" />
                        </div>
                    </div>
                    <div className="loader"></div>
                    <div className="count">
                        <span>
                            <p>{userWin}</p>
                            <p>You</p>
                        </span>
                        <span>
                            <p>{compWin}</p>
                            <p>Comp</p>
                        </span>
                    </div>
                    <div className="message">
                        <p ref={paraRef}>Select One and Play!</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default RockPaperScissor;
