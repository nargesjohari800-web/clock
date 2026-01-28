function createFlipCard(value){
    const container = document.createElement('div');
    container.className = 'flip-container';
    container.innerHTML = `
        <div class='flip-card'>
            <div class='top'>${value}</div>
            <div class='bottom'>${value}</div>
            <div class='flip-top'>${value}</div>
            <div class='flip-bottom'>${value}</div>
        </div>`;
    return container;
}

function flipDigit(card,newValue){
    const top = card.querySelector('.top');
    const bottom = card.querySelector('.bottom');
    const flipTop = card.querySelector('.flip-top');
    const flipBottom = card.querySelector('.flip-bottom');
    const flipCard = card.querySelector('.flip-card');

    if(top.innerText == newValue) return;

    flipTop.innerText = top.innerText;
    flipBottom.innerText = newValue;
    bottom.innerText = newValue;
    flipCard.classList.add('animate');
    setTimeout(()=>{ top.innerText=newValue; flipCard.classList.remove('animate'); },350);
}

function updateUnit(unitId,value,maxBits){
    const unitDiv = document.getElementById(unitId).querySelector('.bits');
    const binStr = value.toString(2).padStart(maxBits,'0');
    if(unitDiv.childNodes.length !== binStr.length){
        unitDiv.innerHTML='';
        for(let ch of binStr){
            unitDiv.appendChild(createFlipCard(ch));
        }
        return;
    }
    binStr.split('').forEach((v,i)=>{
        flipDigit(unitDiv.childNodes[i],v);
    });
}

setInterval(()=>{
    const now = new Date();
    updateUnit('hours',now.getHours(),5);  // ساعت 0-23 → 5 بیت
    updateUnit('minutes',now.getMinutes(),6); // دقیقه 0-59 → 6 بیت
    updateUnit('seconds',now.getSeconds(),6); // ثانیه 0-59 → 6 بیت
},1000);