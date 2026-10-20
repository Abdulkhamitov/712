import React, { useReducer, useEffect, useContext, useState, useMemo, useRef, createContext } from 'react';

// ЗАДАНИЕ 3: useReducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    case 'REMOVE_ITEM': return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY': return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i) };
    case 'CLEAR_CART': return { items: [] };
    default: return state;
  }
};

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const sampleItems = [
    { id: 1, name: 'Товар 1', price: 100 },
    { id: 2, name: 'Товар 2', price: 200 },
  ];
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Корзина покупок</h3>
      {sampleItems.map(item => (
        <button key={item.id} onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}>Добавить {item.name}</button>
      ))}
      <ul>
        {state.items.map(item => (
          <li key={item.id}>
            {item.name} - {item.price}₽ x {item.quantity}
            <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}>+</button>
            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>Удалить</button>
          </li>
        ))}
      </ul>
      <div>Общая сумма: {total}₽</div>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Очистить</button>
    </div>
  );
}

const stopwatchReducer = (state, action) => {
  switch (action.type) {
    case 'START': return { ...state, isRunning: true };
    case 'STOP': return { ...state, isRunning: false };
    case 'RESET': return { isRunning: false, time: 0, laps: [] };
    case 'TICK': return { ...state, time: state.time + 1 };
    case 'LAP': return { ...state, laps: [...state.laps, state.time] };
    default: return state;
  }
};

function Stopwatch() {
  const [state, dispatch] = useReducer(stopwatchReducer, { isRunning: false, time: 0, laps: [] });
  
  useEffect(() => {
    let interval;
    if (state.isRunning) interval = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(interval);
  }, [state.isRunning]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Секундомер: {state.time} сек.</h3>
      <button onClick={() => dispatch({ type: state.isRunning ? 'STOP' : 'START' })}>{state.isRunning ? 'Стоп' : 'Старт'}</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Сброс</button>
      <button onClick={() => dispatch({ type: 'LAP' })}>Круг</button>
      <ul>{state.laps.map((lap, i) => <li key={i}>Круг {i + 1}: {lap} сек.</li>)}</ul>
    </div>
  );
}

// ЗАДАНИЕ 4: useContext
const ThemeContext = createContext();
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
      <h3>Тема: {theme}</h3>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
  );
}

// ЗАДАНИЕ 5: useMemo и useCallback
function ExpensiveCalculation() {
  const [number, setNumber] = useState(1);
  const [renderCount, setRenderCount] = useState(0);

  const expensiveResult = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 100000000; i++) result += number;
    return result;
  }, [number]);

  useEffect(() => setRenderCount(prev => prev + 1));

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Сложные вычисления</h3>
      <div>Результат: {expensiveResult}</div>
      <div>Рендеров: {renderCount}</div>
      <button onClick={() => setNumber(prev => prev + 1)}>Увеличить</button>
    </div>
  );
}

// ЗАДАНИЕ 6: useRef
function FocusInput() {
  const inputRef = useRef(null);
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <input ref={inputRef} placeholder="Фокус" />
      <button onClick={() => inputRef.current.focus()}>Фокус на input</button>
    </div>
  );
}

function PreviousValue() {
  const [value, setValue] = useState('');
  const previousValue = useRef('');
  
  useEffect(() => { previousValue.current = value; }, [value]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="Введите текст" />
      <div>Текущее: {value}</div>
      <div>Предыдущее: {previousValue.current}</div>
    </div>
  );
}

function AdvancedHooks() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px', border: '2px solid green', margin: '10px' }}>
        <h2>Продвинутые хуки</h2>
        <h3>useReducer</h3>
        <ShoppingCart />
        <Stopwatch />
        <h3>useContext</h3>
        <ThemeToggle />
        <h3>useMemo</h3>
        <ExpensiveCalculation />
        <h3>useRef</h3>
        <FocusInput />
        <PreviousValue />
      </div>
    </ThemeProvider>
  );
}

export default AdvancedHooks;
