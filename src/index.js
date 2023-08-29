import './index.css'
import { getHexNumber, getRgbNum, setColorSwitch, setTranformTransition, spectateElement } from './utils'

const rootElement = document.querySelector('#app')
const textElement = document.querySelector('.transform-text')
textElement.style.position = 'relative'
document.documentElement.style.setProperty('--text', `'${textElement.textContent}'`)

setColorSwitch(textElement)
//setTranformTransition(textElement)
spectateElement(textElement)

