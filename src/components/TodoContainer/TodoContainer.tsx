import { useState } from "react";
import { Todo } from "../../types";
import { TodoForm } from "../TodoForm/TodoForm";
import { TodoCard } from "../TodoCard/TodoCard";
import "./TodoContainer.scss";

export const TodoContainer = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = (todo: Todo): void => {
		setTodos((prevTodos) => [todo, ...prevTodos]);
	};

	const removeTodo = (id: string): void => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};

	return (
		<div className="todo-container">
			<h1 className="todo-container__title">Att göra</h1>
			<TodoForm onAddTodo={addTodo} />

			<div className="todo-container__list">
				{todos.length === 0 ? (
					<p className="todo-container__empty">
						Inga uppgifter. Lägg till något!
					</p>
				) : (
					todos.map((todo) => (
						<TodoCard key={todo.id} todo={todo} onRemove={removeTodo} />
					))
				)}
			</div>
		</div>
	);
};
