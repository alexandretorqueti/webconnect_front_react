//router
// import IndexRouters from "./router/index"

//scss
import "./assets/scss/socialv.scss"
import "./assets/scss/customizer.scss"
import { PropTypes } from "prop-types";

// Redux Selector / Action
import { useDispatch } from 'react-redux';

// import state selectors
import { setSetting } from './store/setting/actions'

function App(props) {
  const dispatch = useDispatch()
  dispatch(setSetting())

  // Socket
  // const socket = new Socket({
  return (
    <div className="App">
      {/* <IndexRouters /> */}
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
}

export default App;
