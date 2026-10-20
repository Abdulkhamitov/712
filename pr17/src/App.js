import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Практическая работа №17: Работа с формами</h1>
        <p>Студент: [Ваше Имя] | Группа: [Ваша Группа]</p>
      </header>
      
      <section style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Задание 1: Базовая форма (Управляемая)</h2>
        <UserRegistrationForm />
      </section>

      <section style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Задание 2: Валидация формы</h2>
        <UserRegistrationFormWithValidation />
      </section>

      <section style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Задание 3: Неуправляемая форма (useRef)</h2>
        <ContactFormUncontrolled />
      </section>
    </div>
  );
}

export default App;
