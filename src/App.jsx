import "./App.css";
import Photo from './component/Photo';

const App = () => {
  return (
    <div className='App'>
      <div className="container-fluid">
        <h1 className='text-center'>Photo Search</h1>
        <Photo />
      </div>
    </div>
  )
}

export default App;