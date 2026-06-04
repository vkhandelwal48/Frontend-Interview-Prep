import './App.css';
import ProgressBar from './components/ProgressBar';

function App() {
  return (
    <div>
      {/* <VirtualizedList items={Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)} itemHeight={50} height={300} /> */}
      <ProgressBar />
    </div>
  );
}

export default App;
