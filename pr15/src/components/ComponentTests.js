import React from 'react';

function ComponentTests() {
  const runTests = () => {
    const results = [];
    const basic = document.querySelectorAll('#basic-output-1 > *').length;
    const stateful = document.querySelectorAll('#stateful-output-1 > *').length;
    const hooks = document.querySelectorAll('#hooks-output-1 > *').length;

    results.push({ name: 'Базовые', passed: basic > 0, count: basic });
    results.push({ name: 'С состоянием', passed: stateful > 0, count: stateful });
    results.push({ name: 'Hooks', passed: hooks > 0, count: hooks });

    console.log('=== РЕЗУЛЬТАТЫ ===');
    results.forEach(r => console.log(`${r.passed ? '✅' : '❌'} ${r.name}: найдено ${r.count}`));
    alert(`Тесты пройдены: ${results.filter(r => r.passed).length}/3`);
  };

  return (
    <section className="task-section">
      <h2>Тестирование</h2>
      <button onClick={runTests} style={{ padding: '1rem 2rem', cursor: 'pointer' }}>
        Запустить тесты
      </button>
    </section>
  );
}

export default ComponentTests;
