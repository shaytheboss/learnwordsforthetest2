let translations = {};
let lastPlayedWord = null;

document.getElementById('pageLevel1').addEventListener('click', function() {
    window.location.href = 'pageLevel1.html'; // Replace with the actual URL of your page
});

document.getElementById('memoryGamePage').addEventListener('click', function() {
    window.location.href = 'memoryGamePage.html'; // Replace with the actual URL of your page
});

// Function to load translations and then play a word
function loadTranslationsAndPlayWord() {
    fetch('translations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            translations = data;
            playWord();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Function to play a random word
function playWord() {
    const words = Object.keys(translations);
    if (words.length === 0) {
        console.error('No words found in the translations object');
        return;
    }

    // cleaning from the webpage the word and its translation
    
    document.getElementById('translationDisplay').textContent = `  *******   `;
	
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
	lastPlayedWord = word; // set the last played word

    // Playing the audio
    var audio = new Audio(`sounds/${word}.mp3`);
    audio.play();
	document.getElementById('wordDisplay').textContent = `  מילה באנגלית : ${word}  `;
	
}

// Function to play again the last word
function playAgain() {
    if (lastPlayedWord) {
        var audio = new Audio(`sounds/${lastPlayedWord}.mp3`);
        audio.play();
    } else {
        console.error('No word has been played yet');
    }
}

// Function to show the hebrew translate
function displayWordInHebrew() {
	if (lastPlayedWord) {
         // Displaying the word and its translation
		//document.getElementById('wordDisplay').textContent = `מילה באנגלית : ${lastPlayedWord}`;
		//document.getElementById('translationDisplay').textContent = `  תרגום: ${translations[lastPlayedWord]}  `;
		document.getElementById('translationDisplay').innerHTML = `&nbsp;&nbsp;תרגום: ${translations[lastPlayedWord]}&nbsp;&nbsp;`;

		
    } else {
        console.error('No word has been played yet');
    }
   
}


document.getElementById('playWord').addEventListener('click', loadTranslationsAndPlayWord);
document.getElementById('playAgain').addEventListener('click', playAgain);
document.getElementById('displayWordInHebrew').addEventListener('click', displayWordInHebrew);
