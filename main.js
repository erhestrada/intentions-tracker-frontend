let currentIndex = 0;
let currentIntentionIndex = 0;

function typeIntentions(intentions) {
    if (intentions.length > 0) {
        const container = document.querySelector('.container');
        container.innerHTML = ''; // Clear previous content
        typeNextIntention(intentions);
    }
}

function typeNextIntention(intentions) {
    if (currentIntentionIndex < intentions.length) {
        typeIntention(intentions[currentIntentionIndex]);
    } else {
        alert('All intentions completed!');
    }
}

function typeIntention(intention) {
    window.currentIntention = intention;
    currentIndex = 0;
    initializeIntention(intention);
    updateText();
    updateCaret();
}

function initializeIntention(intention) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear previous intention

    const textToTypeElement = document.createElement('span');
    textToTypeElement.id = 'text-to-type';
    textToTypeElement.textContent = intention;
    
    const caretElement = document.createElement('span');
    caretElement.id = 'caret';
    caretElement.className = 'caret';
    
    container.appendChild(textToTypeElement);
    container.appendChild(caretElement);
}

function getTextWidth(text) {
    const textToType = document.getElementById('text-to-type');

    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.fontSize = '24px'; // Make sure this matches your CSS
    tempSpan.style.fontFamily = getComputedStyle(textToType).fontFamily;
    tempSpan.style.whiteSpace = 'pre'; // Preserve spaces
    tempSpan.textContent = text;
    document.body.appendChild(tempSpan);
    const width = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    return width;
}

function updateText() {
    const textToType = document.getElementById('text-to-type');
    const originalText = textToType.textContent;

    textToType.innerHTML = '';
    for (let i = 0; i < originalText.length; i++) {
        const span = document.createElement('span');
        span.textContent = originalText[i];
        span.style.color = i < currentIndex ? '#000' : '#ccc';
        textToType.appendChild(span);
    }
}

function updateCaret() {
    const textToType = document.getElementById('text-to-type');
    const originalText = textToType.textContent;
    const caret = document.getElementById('caret');

    const typedText = originalText.substring(0, currentIndex);
    const caretOffset = getTextWidth(typedText);
    caret.style.left = `${textToType.offsetLeft + caretOffset}px`;
}

function handleKeydown(e, intentions) {
    const textToType = document.getElementById('text-to-type');
    const originalText = textToType.textContent;
    if (e.key === originalText[currentIndex]) {
        currentIndex++;
        updateText();
        updateCaret();

        if (currentIndex === originalText.length) {
            currentIntentionIndex++;
            const dateTime = new Date();
            const date = dateTime.toLocaleDateString();
            console.log(date);
            console.log(window.currentIntention);
            let intentionsLog = JSON.parse(localStorage.getItem('intentionsLog')) || {};
            const intentionEntry = [window.currentIntention, dateTime.toISOString()]
            if (!(date in intentionsLog)) {
                intentionsLog[date] = [intentionEntry];
            } else {
                intentionsLog[date].push(intentionEntry);
            }
            localStorage.setItem('intentionsLog', JSON.stringify(intentionsLog));
            
            setTimeout(typeNextIntention(intentions), 500); // Wait for 500ms before moving to the next intention
        }
    }
}

const intentions = Object.keys(JSON.parse(localStorage.getItem('requiredRepetitionsPerIntention')) || {});
console.log(intentions);
document.addEventListener('keydown', (e) => handleKeydown(e, intentions));
typeIntentions(intentions);
