import React, { useState } from 'react';
import './BasicComponents.css';

// ЗАДАНИЕ 1: Компоненты с props
function WelcomeMessage({ name, age }) {
  return (
    <div className="welcome-message">
      <h3>Привет, {name}!</h3>
      <p>Тебе {age} лет.</p>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <div>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <span className={user.isOnline ? 'online' : 'offline'}>
          {user.isOnline ? '● Онлайн' : '○ Оффлайн'}
        </span>
      </div>
    </div>
  );
}

function Button({ variant = 'primary', onClick, children }) {
  return (
    <button className={`custom-button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ЗАДАНИЕ 2: Children и условный рендеринг
function Card({ title, children }) {
  return (
    <div className="custom-card">
      {title && <h4>{title}</h4>}
      <div>{children}</div>
    </div>
  );
}

function Toggle({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div style={{ margin: '1rem 0' }}>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Скрыть' : 'Показать'}
      </button>
      {isVisible && <div style={{ marginTop: '10px' }}>{children}</div>}
    </div>
  );
}

function ConditionalMessage({ status }) {
  const messages = {
    success: { text: '✅ Успешно!', color: '#27ae60' },
    error: { text: '❌ Ошибка!', color: '#e74c3c' },
    warning: { text: '⚠️ Внимание!', color: '#f39c12' }
  };
  const msg = messages[status] || { text: 'Неизвестно', color: '#333' };
  return <p style={{ color: msg.color, fontWeight: 'bold' }}>{msg.text}</p>;
}

function BasicComponents() {
  const userData = { name: 'Анна Иванова', email: 'anna@example.com', avatar: 'https://i.pravatar.cc/100', isOnline: true };

  return (
    <section className="task-section">
      <h2>Базовые компоненты</h2>
      <div className="component-demo">
        <h3>Задание 1: Компоненты с props</h3>
        <div className="output" id="basic-output-1">
          <WelcomeMessage name="Иван" age={25} />
          <UserCard user={userData} />
          <Button variant="primary" onClick={() => alert('Клик!')}>Нажми меня</Button>
          <Button variant="secondary">Вторичная</Button>
        </div>
      </div>

      <div className="component-demo">
        <h3>Задание 2: Children и условный рендеринг</h3>
        <div className="output" id="basic-output-2">
          <Card title="Пример карточки">
            <p>Содержимое карточки</p>
          </Card>
          <Toggle>
            <p>Секретный контент!</p>
          </Toggle>
          <ConditionalMessage status="success" />
          <ConditionalMessage status="error" />
        </div>
      </div>
    </section>
  );
}

export default BasicComponents;
