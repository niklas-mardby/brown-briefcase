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
			// Använder requestAnimationFrame för att säkerställa att initialvärden renderas först
			requestAnimationFrame(() => {
				// Använder ytterligare en requestAnimationFrame för att garantera att nästa frame
				// har tid att rendera innan vi lägger till klassen
				requestAnimationFrame(() => {
					card.classList.add("todo-card--visible");
				});
			});
		}
	}, []);

	const handleRemove = (): void => {
		const card = cardRef.current;
		if (card) {
			// Starta fade-out animationen genom att ta bort visible-klassen
			card.classList.remove("todo-card--visible");
		} else {
			// Om ref inte är tillgänglig, ta bort direkt
			onRemove(todo.id);
		}
	};

	const handleTransitionEnd = (): void => {
		if (!cardRef.current?.classList.contains("todo-card--visible"))
			onRemove(todo.id);
	};

	const formattedDate = new Intl.DateTimeFormat("sv-SE", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
	}).format(todo.createdAt);

	return (
		<div
			ref={cardRef}
			className="todo-card"
			onTransitionEnd={handleTransitionEnd}
		>
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
