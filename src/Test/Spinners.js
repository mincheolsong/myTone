import Spinner from 'react-bootstrap/Spinner';

function Spinner_fuc() {
  return (
    <div style={{alignItems:"center", width:"100%"}}>
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
  );
}

export default Spinner_fuc;