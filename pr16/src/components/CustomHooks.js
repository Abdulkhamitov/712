import React, { useState, useEffect, useCallback } from 'react';

// 7.1 useLocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// 7.2 useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка сети');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

// 7.3 useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(prev => !prev), []);
  return [value, toggle];
}

// 7.4 useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// --- Компоненты-демонстрации ---

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('username', '');
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>useLocalStorage</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Введите имя" />
      <div>Текущее имя: {name}</div>
    </div>
  );
}

function FetchDemo() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>useFetch</h3>
      {loading && <div>Загрузка...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {data && <ul>{data.slice(0, 3).map(u => <li key={u.id}>{u.name} ({u.email})</li>)}</ul>}
    </div>
  );
}

function ToggleDemo() {
  const [isVisible, toggleVisible] = useToggle(false);
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>useToggle</h3>
      <button onClick={toggleVisible}>{isVisible ? 'Скрыть' : 'Показать'}</button>
      {isVisible && <div style={{ marginTop: '10px', background: '#f0f0f0', padding: '10px' }}>Секретный контент!</div>}
    </div>
  );
}

function DebounceDemo() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedSearch) {
      setResults([`Результат 1 для ${debouncedSearch}`, `Результат 2 для ${debouncedSearch}`]);
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>useDebounce</h3>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск..." />
      <div>Текущий: {search}</div>
      <div>Debounced: {debouncedSearch}</div>
      <ul>{results.map((r, i) => <li key={i}>{r}</li>)}</ul>
    </div>
  );
}

function CustomHooks() {
  return (
    <div style={{ padding: '20px', border: '2px solid purple', margin: '10px' }}>
      <h2>Кастомные хуки</h2>
      <LocalStorageDemo />
      <FetchDemo />
      <ToggleDemo />
      <DebounceDemo />
    </div>
  );
}

export default CustomHooks;
