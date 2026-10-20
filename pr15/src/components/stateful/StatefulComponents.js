import React, { Component } from 'react';
import './StatefulComponents.css';

// ЗАДАНИЕ 3: Классовые компоненты
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialValue || 0 };
  }
  render() {
    return (
      <div className="counter-box">
        <h4>Счетчик</h4>
        <div className="counter-value">{this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count - 1 })}>-</button>
        <button onClick={() => this.setState({ count: 0 })}>Сброс</button>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>+</button>
      </div>
    );
  }
}

class LoginForm extends Component {
  state = { email: '', password: '', error: '' };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password.length < 6) {
      this.setState({ error: 'Пароль должен быть больше 6 символов' });
    } else {
      this.setState({ error: '' });
      alert('Вход выполнен');
    }
  };
  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <h4>Вход</h4>
        <input type="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
        <input type="password" placeholder="Пароль" onChange={e => this.setState({ password: e.target.value })} />
        {this.state.error && <div className="form-error">{this.state.error}</div>}
        <button type="submit">Войти</button>
      </form>
    );
  }
}

class ColorPicker extends Component {
  state = { selected: this.props.colors[0] };
  render() {
    return (
      <div>
        <div className="color-picker">
          {this.props.colors.map(color => (
            <div
              key={color}
              className={`color-swatch ${this.state.selected === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => this.setState({ selected: color })}
            />
          ))}
        </div>
        <p>Выбран цвет: {this.state.selected}</p>
      </div>
    );
  }
}

// ЗАДАНИЕ 4: Обработка событий и формы
class TodoList extends Component {
  state = { todos: [], input: '' };
  addTodo = () => {
    if (!this.state.input.trim()) return;
    this.setState({
      todos: [...this.state.todos, { id: Date.now(), text: this.state.input, done: false }],
      input: ''
    });
  };
  toggle = (id) => {
    this.setState({ todos: this.state.todos.map(t => t.id === id ? { ...t, done: !t.done } : t) });
  };
  render() {
    return (
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <input value={this.state.input} onChange={e => this.setState({ input: e.target.value })} placeholder="Новая задача" />
        <button onClick={this.addTodo}>Добавить</button>
        {this.state.todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.done ? 'completed' : ''}`}>
            <span onClick={() => this.toggle(todo.id)}>{todo.text}</span>
            <button onClick={() => this.setState({ todos: this.state.todos.filter(t => t.id !== todo.id) })}>✕</button>
          </div>
        ))}
      </div>
    );
  }
}

class SearchBox extends Component {
  state = { query: '' };
  render() {
    const filtered = this.props.items.filter(item => item.toLowerCase().includes(this.state.query.toLowerCase()));
    return (
      <div style={{ marginTop: '1rem' }}>
        <input value={this.state.query} onChange={e => this.setState({ query: e.target.value })} placeholder="Поиск..." />
        <button onClick={() => this.setState({ query: '' })}>Очистить</button>
        <ul>{filtered.map((item, i) => <li key={i}>{item}</li>)}</ul>
      </div>
    );
  }
}

class StatefulComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Компоненты с состоянием</h2>
        <div className="component-demo">
          <h3>Задание 3: Классовые компоненты</h3>
          <div className="output" id="stateful-output-1">
            <Counter initialValue={5} />
            <LoginForm />
            <ColorPicker colors={['#ff0000', '#00ff00', '#0000ff']} />
          </div>
        </div>
        <div className="component-demo">
          <h3>Задание 4: События</h3>
          <div className="output">
            <TodoList />
            <SearchBox items={['React', 'JavaScript', 'HTML', 'CSS']} />
          </div>
        </div>
      </section>
    );
  }
}

export default StatefulComponents;
