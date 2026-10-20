import React, { useState } from 'react';

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    newsletter: false,
    age: '',
    about: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправленные данные:', formData);
    alert('Форма отправлена! Проверьте консоль.');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <label>Имя: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Пароль: </label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Подтверждение пароля: </label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      </div>
      <div>
        <label>Пол: </label>
        <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Мужской</label>
        <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Женский</label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
          Подписка на рассылку
        </label>
      </div>
      <div>
        <label>Возраст: </label>
        <select name="age" value={formData.age} onChange={handleChange}>
          <option value="">Выберите</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36+">36+</option>
        </select>
      </div>
      <div>
        <label>О себе: </label>
        <textarea name="about" value={formData.about} onChange={handleChange}></textarea>
      </div>
      <button type="submit" style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }}>Отправить</button>
    </form>
  );
}

export default UserRegistrationForm;
