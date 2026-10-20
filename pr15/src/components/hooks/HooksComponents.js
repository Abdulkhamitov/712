import React, { useState, useEffect, useContext, createContext } from 'react';
import './HooksComponents.css';

// ЗАДАНИЕ 6: useState и useEffect
function CounterWithHooks() {
  const [count, setCount] = useState(0);
  return (
    <div className="hook-box">
      <h4>Счетчик (Hooks)</h4>
      <div className="hook-counter">{count}</div>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

function UserProfile() {
  const [name, setName] = useState('');
  return (
    <div className="hook-box">
      <h4>Профиль</h4>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Введите имя" />
      <p>Привет, {name || 'Гость'}!</p>
    </div>
  );
}

function EffectDemo() {
  const [count, setCount] = useState(0);
  useEffect(() => { document.title = `Кликов: ${count}`; }, [count]);
  return (
    <div className="hook-box">
      <h4>useEffect</h4>
      <button onClick={() => setCount(count + 1)}>Кликнуть ({count})</button>
    </div>
  );
}

// ЗАДАНИЕ 7: Кастомные хуки и Context
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);
  return data;
}

const ThemeContext = createContext();
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`theme-${theme}`}>
      <h4>Тема: {theme}</h4>
      <button onClick={toggleTheme}>Сменить тему</button>
    </div>
  );
}

function HooksComponents() {
  const [name, setName] = useLocalStorage('name', '');
  const data = useFetch('https://jsonplaceholder.typicode.com/users/1');

  return (
    <section className="task-section">
      <h2>React Hooks</h2>
      <div className="component-demo">
        <h3>Задание 6: Хуки</h3>
        <div className="output" id="hooks-output-1">
          <CounterWithHooks />
          <UserProfile />
          <EffectDemo />
        </div>
      </div>
      <div className="component-demo">
        <h3>Задание 7: Кастомные хуки и Context</h3>
        <div className="output" id="hooks-output-2">
          <div className="hook-box">
            <h4>useLocalStorage</h4>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" />
            <p>Сохранено: {name}</p>
          </div>
          <div className="hook-box">
            <h4>useFetch</h4>
            {data ? <p>Загружен: {data.name}</p> : <p>Загрузка...</p>}
          </div>
          <ThemeProvider>
            <ThemeToggle />
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
}

export default HooksComponents;
