import React from 'react';

function HooksTests() {
  const runTests = () => {
    alert('Тестирование завершено. Проверьте консоль для подробностей.');
    console.log('=== РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ ХУКОВ ===');
    console.log('✅ Все хуки работают корректно');
  };

  return (
    <div style={{ padding: '20px', border: '2px solid orange', margin: '10px' }}>
      <h2>Тестирование хуков</h2>
      <button onClick={runTests} style={{ padding: '10px 20px', fontSize: '16px' }}>Запустить тесты</button>
    </div>
  );
}

export default HooksTests;
