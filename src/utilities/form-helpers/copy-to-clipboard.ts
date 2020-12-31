function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    /*
    var textField = document.createElement('textarea');
    textField.innerText = JSON.stringify(text);
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();*/
}

export default copyToClipboard;
