import "./App.css";
import Photo from './component/Photo';

const App = () => {
  return (
    <div className='App mb-4'>
      <div className="container-fluid min-vh-100 mb-4">
        <h1 className='text-center' onClick={console.log("Yes")}>Unsplash Photo Search</h1>
        <Photo />
      </div>
    </div>
  )
}

export default App;