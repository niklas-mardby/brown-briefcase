import { useRef, useEffect } from "react";
import { Todo } from "../../types";
import "./TodoCard.scss";

interface TodoCardProps {
	todo: Todo;
	onRemove: (id: string) => void;
}

export const TodoCard = ({ todo, onRemove }: TodoCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null);

	// Hanterar fade-in animation när kortet renderas
	useEffect(() => {
		const card = cardRef.current;
		if (card) {
			// Trigga reflow för att säkerställa att övergången fungerar
			// Detta är nödvändigt för att browsern ska "se" initialstaten innan animation
			void card.offsetWidth;
			// Lägger till klassen som aktiverar den synliga tillståndet (opacity: 1, transform: translateY(0))
			card.classList.add("todo-card--visible");
		}
	}, []);

	const handleRemove = (): void => {
		const card = cardRef.current;
		if (card) {
			// Starta fade-out animationen genom att ta bort visible-klassen
			// Detta återställer till opacity: 0 och transform: translateY(10px)
			card.classList.remove("todo-card--visible");

			// Vänta tills animationen är klar innan kortet tas bort från DOM
			// transitionend-eventet triggas när CSS-transitionen är färdig
			card.addEventListener(
				"transitionend",
				() => {
					onRemove(todo.id);
				},
				{ once: true }
			);
		} else {
			// Om ref inte är tillgänglig, ta bort direkt
			onRemove(todo.id);
		}
	};

	const formattedDate = new Intl.DateTimeFormat("sv-SE", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
	}).format(todo.createdAt);

	return (
		<div ref={cardRef} className="todo-card">
			<button
				type="button"
				className="todo-card__remove"
				onClick={handleRemove}
				aria-label="Ta bort uppgift"
			>
				✕
			</button>
			<div className="todo-card__content">
				<p className="todo-card__text">{todo.text}</p>
				<small className="todo-card__date">{formattedDate}</small>
			</div>
		</div>
	);
};
