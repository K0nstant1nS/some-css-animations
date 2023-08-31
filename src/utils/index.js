const baseDelay = 2000

export const createBeforeElement = (element) => {
  const copyElement = document.createElement('p');
  const wrapElement = document.createElement('p');
  element.style.position = 'relative'
  const additionalStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'max-content',
    opacity: .5
  }
  copyElement.textContent = wrapElement.textContent = element.textContent;
  element.textContent = '';
  for(let key in additionalStyles){
    copyElement.style[key] = additionalStyles[key]
  }
  element.append(copyElement, wrapElement)
  return element
}

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

export const setColorSwitch = (e, delay=2000) =>{
  e.style.transition = `color ${delay/1000}s`
  let color = `rgb(${getRgbNum()},${getRgbNum()},${getRgbNum()})`
  e.style.color = color
  setInterval(() => {
  color = `rgb(${getRgbNum()},${getRgbNum()},${getRgbNum()})`
  e.style.color = color
  }, delay)
}

export const setColorTransition = (element) => {
  element.style.transition = `color ${baseDelay/1000}s`
}

export const disableTransition = (e) =>{
  e.style.transition = `none`;
}

export const spectateElement = (element, xMax = null, yMax = null) => {
  element = createBeforeElement(element);
  const [beforeElement, mainElement] = element.children;
  const elementRect = mainElement.getBoundingClientRect();
  let isAnimationAreaAbandoned = false;
  const [elementCenterX, elementCenterY] = [elementRect.x + elementRect.width/2, elementRect.y + elementRect.height/2];
  const [distanceX, distanceY] = [ xMax || elementRect.width, yMax || elementRect.width];
  let translateX, translateY = 0;
  mainElement.style.transformStyle = 'preserve-3d';

  document.addEventListener('mousemove', (event) => {
    if((elementCenterX - event.x <= distanceX && elementCenterX - event.x >= -distanceX) && (elementCenterY - event.y >= -distanceY && elementCenterY - event.y <= distanceY) ){
      translateX = -(elementCenterX - event.x)/4;
      translateY = -(elementCenterY - event.y)/2;
      mainElement.style.translate = `${translateX}px ${translateY}px`;
      beforeElement.style.top = `${translateY/2}px`;
      beforeElement.style.left = `${translateX/2}px`;
      isAnimationAreaAbandoned = true
    } else if(isAnimationAreaAbandoned) {
      isAnimationAreaAbandoned = false
      mainElement.style.transition = 'translate .5s';
      mainElement.style.translate = 'none'
      beforeElement.style.top = `0px`;
      beforeElement.style.left = `0px`;
      beforeElement.style.transition = `all .5s`;
      setTimeout(()=>{
        disableTransition(beforeElement);
        disableTransition(mainElement);
      }, 500)
    }
  })
}


