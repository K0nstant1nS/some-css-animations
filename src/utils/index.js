const baseDelay = 2000
const baseDistance = 200;

export const getHexNumber = () => {
  let num = String(Math.floor(Math.random()*256))
  if(num.length === 1){
    num = '0' + num
  }
  return num
}

export const getRgbNum = () => {
  return String(Math.floor(Math.random()*256))
}

export const setColorSwitch = (e, delay=2000) => {
  e.style.color = `rgb(${getRgbNum()},${getRgbNum()},${getRgbNum()})`
  setInterval(() => {
    e.style.color = `rgb(${getRgbNum()},${getRgbNum()},${getRgbNum()})`
  }, delay)
}

export const setColorTransition = (element) => {
  element.style.transition = `color ${baseDelay/1000}s`
}

export const disableBeforeTransition = () =>{
  document.documentElement.style.setProperty('--transition-target', `none`)
}

export const spectateElement = (element) => {
  const elementRect = element.getBoundingClientRect();
  let isAnimationAreaAbandoned = false;
  const [elementCenterX, elementCenterY] = [elementRect.x + elementRect.width/2, elementRect.y + elementRect.height/2];
  const [distanceX, distanceY] = [elementRect.width, elementRect.width];
  let translateX, translateY = 0;
  element.style.transformStyle = 'preserve-3d';

  document.addEventListener('mousemove', (event) => {
    if((elementCenterX - event.x <= distanceX && elementCenterX - event.x >= -distanceX) && (elementCenterY - event.y >= -distanceY && elementCenterY - event.y <= distanceY) ){
      translateX = -(elementCenterX - event.x)/4;
      translateY = -(elementCenterY - event.y)/2;
      element.style.translate = `${translateX}px ${translateY}px`;
      document.documentElement.style.setProperty('--top', `${translateY/2}px`);
      document.documentElement.style.setProperty('--left', `${translateX/2}px`);
      isAnimationAreaAbandoned = true
    } else if(isAnimationAreaAbandoned) {
      isAnimationAreaAbandoned = false
      element.style.transition = 'translate .5s';
      element.style.translate = 'none'
      document.documentElement.style.setProperty('--top', `0px`)
      document.documentElement.style.setProperty('--left', `0px`)
      document.documentElement.style.setProperty('--transition-target', `all`)
      setTimeout(()=>{
        setColorTransition(element)
        disableBeforeTransition()
      }, 600)
    }
  })
}
