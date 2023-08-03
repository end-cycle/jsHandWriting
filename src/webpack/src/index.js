import './main.css';
import './sass.sass'
import logo from '../public/avatar.png';

const a = 'Hello ITEM'
console.log(a)

const img = new Image()
img.src = logo

document.getElementById('imgBox').appendChild(img)
