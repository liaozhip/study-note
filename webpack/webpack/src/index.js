// import './a';
// import './style/index.css';
// import './style/index.less';
// import './style/index.scss';
// import logo from './public/images/logo.png'

// const app = document.getElementById('index')
// const img = new Image();
// img.src = logo;
// app.appendChild(img)
// const p = new Promise(resolve => {
//   setTimeout(() => {
//     resolve('gg')
//   }, 1000);
// });
// p.then(res => {
//   console.log(res);
// })
// console.log('hello webpack.');

// import React from 'react';
// import ReactDOM from 'react-dom';

// const App = () => {
//   return <div>Hello react</div>
// }

// ReactDOM.render(<App />, document.getElementById('app'));

import { createApp } from 'vue'
import App from './index.vue'

const app = createApp(App)
app.mount('#app')
