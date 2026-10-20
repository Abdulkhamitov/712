import React, { useState } from 'react';

function UserRegistrationFormWithValidation() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', gender: '', age: '', about: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
    if (formData.password.length < 8) newErrors.password = 'Пароль должен быть не менее 8 символов';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    if (!formData.gender) newErrors.gender = 'Выберите пол';
    if (!formData.age) newErrors.age = 'Выберите возраст';
    if (!formData.about.trim()) newErrors.about = 'Расскажите о себе';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Успешная регистрация!');
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <input type="text" name="name" placeholder="Имя" onChange={handleChange} />
        {errors.name && <span style={{ color: 'red', fontSize: '12px' }}> {errors.name}</span>}
      </div>
      <div>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        {errors.email && <span style={{ color: 'red', fontSize: '12px' }}> {errors.email}</span>}
      </div>
      <div>
        <input type="password" name="password" placeholder="Пароль" onChange={handleChange} />
        {errors.password && <span style={{ color: 'red', fontSize: '12px' }}> {errors.password}</span>}
      </div>
      <div>
        <input type="password" name="confirmPassword" placeholder="Подтверждение пароля" onChange={handleChange} />
        {errors.confirmPassword && <span style={{ color: 'red', fontSize: '12px' }}> {errors.confirmPassword}</span>}
      </div>
      <div>
        <label><input type="radio" name="gender" value="male" onChange={handleChange} /> Мужской</label>
        <label><input type="radio" name="gender" value="female" onChange={handleChange} /> Женский</label>
        {errors.gender && <span style={{ color: 'red', fontSize: '12px' }}> {errors.gender}</span>}
      </div>
      <div>
        <select name="age" onChange={handleChange}>
          <option value="">Выберите возраст</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36+">36+</option>
        </select>
        {errors.age && <span style={{ color: 'red', fontSize: '12px' }}> {errors.age}</span>}
      </div>
      <div>
        <textarea name="about" placeholder="О себе" onChange={handleChange}></textarea>
        {errors.about && <span style={{ color: 'red', fontSize: '12px' }}> {errors.about}</span>}
      </div>
      <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Зарегистрироваться</button>
    </form>
  );
}

export default UserRegistrationFormWithValidation;
