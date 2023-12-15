function generateVigenereSquare(language) {
    let alphabet;
    if (language === 'english') {
        alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else if (language === 'russian') {
        alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    }
        
    const vigenereSquare = {};
    for (let i = 0; i < alphabet.length; i++) {
        vigenereSquare[alphabet[i]] = alphabet.slice(i) + alphabet.slice(0, i);
    }
        
     return vigenereSquare;
}
        
function vigenereEncrypt(plaintext, key, language) {
    const vigenereSquare = generateVigenereSquare(language);
    let encryptedText = '';
    let keyIndex = 0;
        
    for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i];
        const charCode = char.charCodeAt(0);
        
        if ((language === 'english' && ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) ||
        (language === 'russian' && ((charCode >= 1040 && charCode <= 1071) || (charCode >= 1072 && charCode <= 1103)))
        ) {
            const rowIndex = key.charCodeAt(keyIndex) - (language === 'english' ? 65 : 1040);
            const encryptedChar = vigenereSquare[char][rowIndex];
            encryptedText += encryptedChar;
            keyIndex = (keyIndex + 1) % key.length;
          }  else {
               encryptedText += char;
             }
    }
        
    return encryptedText;
}
        
function vigenereDecrypt(ciphertext, key, language) {
    const vigenereSquare = generateVigenereSquare(language);
    let decryptedText = '';
    let keyIndex = 0;
        
    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        const charCode = char.charCodeAt(0);
        
        if ((language === 'english' && ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) ||
        (language === 'russian' && ((charCode >= 1040 && charCode <= 1071) || (charCode >= 1072 && charCode <= 1103)))
        ) {
            const rowIndex = key.charCodeAt(keyIndex) - (language === 'english' ? 65 : 1040);
            const decryptedChar = Object.keys(vigenereSquare).find((key) => vigenereSquare[key][rowIndex] === char);
            decryptedText += decryptedChar;
            keyIndex = (keyIndex + 1) % key.length;
          } else {
                decryptedText += char;
            }
    }
        
    return decryptedText;
}
        
function encryptMessage() {
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;
    const language = document.getElementById('language').value; 
        
    const encryptedMessage = vigenereEncrypt(message, key, language); 
    document.getElementById('output').value = encryptedMessage;
}
        
function decryptMessage() {
    const encryptedMessage = document.getElementById('message').value;
    const key = document.getElementById('key').value;
    const language = document.getElementById('language').value; 
        
    const decryptedMessage = vigenereDecrypt(encryptedMessage, key, language); 
    document.getElementById('output').value = decryptedMessage;
}

