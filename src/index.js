import './index.css'
import { createBeforeElement, getHexNumber, getRgbNum, setColorSwitch, setTranformTransition, spectateElement } from './utils'

const rootElement = document.querySelector('#app');
const textElement = document.querySelector('.transform-text');


setColorSwitch(textElement);
spectateElement(textElement);

