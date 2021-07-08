
// import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import ReactDom from './qreact/react-dom'
// 用react写一个模板引擎,只考虑原生标签 /hreact
// import ReactDom from './hreact/react-dom'

import reportWebVitals from './reportWebVitals';

function FunctionComp(props) {
  return (
    <div className="border">
      <p>{props.name}</p>
    </div>
  )
}
const jsx = (
  <div>
    <h1>React 模板引擎</h1>
    <a href="http://www.baidu.com">百度一下</a>
    <FunctionComp name="function组件" />
  </div>
)

ReactDom.render(jsx, document.getElementById("root"))
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
