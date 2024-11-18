"use client";

import React, { useState, useEffect } from "react";

const Typewriter: React.FC = () => {
	const words = ["Bienvenido a", "Welcome to", ""];
	const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
	const [text, setText] = useState<string>("");
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [charIndex, setCharIndex] = useState<number>(0);
	const [typingSpeed, setTypingSpeed] = useState<number>(100);

	useEffect(() => {
		const handleTyping = () => {
			const currentWord = words[currentWordIndex];
			if (isDeleting) {
				setText(currentWord.substring(0, charIndex - 1));
				setCharIndex(charIndex - 1);
				setTypingSpeed(100); // Velocidad más rápida para borrar
				if (charIndex === 0) {
					setIsDeleting(false);
					setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
				}
			} else {
				setText(currentWord.substring(0, charIndex + 1));
				setCharIndex(charIndex + 1);
				setTypingSpeed(200); // Velocidad normal al escribir
				if (charIndex === currentWord.length) {
					setIsDeleting(true);
					setTypingSpeed(10000); // Pausa al completar la palabra
				}
			}
		};

		const typingTimeout = setTimeout(handleTyping, typingSpeed);
		return () => clearTimeout(typingTimeout);
	}, [charIndex, isDeleting, typingSpeed, currentWordIndex]);

	return (
		<div className="w-full h-full flex justify-center items-center">
			<a href="/">
				<h2 className="text-2xl font-bold mb-6 text-center text-black hover:scale-105 duration-100">
					{text} HORARIO UAIN'T
				</h2>
			</a>
		</div>
	);
};

export default Typewriter;
