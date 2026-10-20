import React, { Component } from 'react';
import './LifecycleComponents.css';

// ЗАДАНИЕ 5: Жизненный цикл
class Timer extends Component {
  state = { seconds: 0, isRunning: false };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isRunning !== this.state.isRunning) {
      if (this.state.isRunning) {
        this.interval = setInterval(() => this.setState(s => ({ seconds: s.seconds + 1 })), 1000);
      } else {
        clearInterval(this.interval);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="lifecycle-box">
        <h4>Таймер</h4>
        <div className="timer-display">{this.state.seconds} сек.</div>
        <button onClick={() => this.setState(s => ({ isRunning: !s.isRunning }))}>
          {this.state.isRunning ? 'Стоп' : 'Старт'}
        </button>
        <button onClick={() => this.setState({ seconds: 0, isRunning: false })}>Сброс</button>
      </div>
    );
  }
}

class WindowSizeTracker extends Component {
  state = { width: window.innerWidth, height: window.innerHeight };
  componentDidMount() { window.addEventListener('resize', this.handleResize); }
  componentWillUnmount() { window.removeEventListener('resize', this.handleResize); }
  handleResize = () => this.setState({ width: window.innerWidth, height: window.innerHeight });

  render() {
    return (
      <div className="lifecycle-box">
        <h4>Размер окна</h4>
        <p>Ширина: {this.state.width}px | Высота: {this.state.height}px</p>
      </div>
    );
  }
}

class DataFetcher extends Component {
  state = { data: null, loading: true };
  componentDidMount() { this.fetchData(); }
  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) this.fetchData();
  }
  fetchData = async () => {
    this.setState({ loading: true });
    const res = await fetch(this.props.url);
    const data = await res.json();
    this.setState({ data, loading: false });
  };

  render() {
    return (
      <div className="lifecycle-box">
        <h4>Загрузка данных</h4>
        {this.state.loading ? <p>Загрузка...</p> : <p>{this.state.data[0]?.name}</p>}
      </div>
    );
  }
}

class LifecycleComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Жизненный цикл</h2>
        <div className="component-demo">
          <h3>Задание 5: Методы жизненного цикла</h3>
          <div className="output" id="lifecycle-output">
            <Timer />
            <WindowSizeTracker />
            <DataFetcher url="https://jsonplaceholder.typicode.com/users" />
          </div>
        </div>
      </section>
    );
  }
}

export default LifecycleComponents;
