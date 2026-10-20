import React, { useRef } from 'react';

function ContactFormUncontrolled() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };
    console.log('Данные из неуправляемой формы:', data);
    alert(`Сообщение от ${data.name} отправлено!`);
    e.target.reset(); // Очистка формы
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <input type="text" ref={nameRef} placeholder="Ваше имя" required />
      </div>
      <div>
        <input type="email" ref={emailRef} placeholder="Ваш Email" required />
      </div>
      <div>
        <textarea ref={messageRef} placeholder="Сообщение" required></textarea>
      </div>
      <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Отправить сообщение</button>
    </form>
  );
}

export default ContactFormUncontrolled;
