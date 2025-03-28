import { useState, FormEvent, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid"; // Du behöver installera detta paket
import { Todo } from "../../types";
import "./TodoForm.scss";

interface TodoFormProps {
	onAddTodo: (todo: Todo) => void;
}

export const TodoForm = ({ onAddTodo }: TodoFormProps) => {
	const [text, setText] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (text.trim()) {
			const newTodo: Todo = {
				id: uuidv4(),
				text: text.trim(),
				createdAt: new Date(),
			};

			onAddTodo(newTodo);
			setText("");
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			<input
				type="text"
				className="todo-form__input"
				value={text}
				onChange={handleChange}
				placeholder="Lägg till en ny uppgift..."
				aria-label="Ny uppgift"
			/>
			<button
				type="submit"
				className="todo-form__button"
				disabled={!text.trim()}
			>
				Lägg till
			</button>
		</form>
	);
};
