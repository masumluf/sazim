export default function TestInput({ grade, handleChange }) {
  return (
    <div className='App'>
      <input value={grade} onChange={handleChange} placeholder='Enter Grade' />
    </div>
  );
}
