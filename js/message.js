var Message = function() {};

Message.print = function(text, clear) {
	var textArea = document.getElementById('messageText');
	if (clear == null || clear) {
		textArea.value = text;
	} else {
		textArea.value += "\n"+text;
		textArea.scrollTop = textArea.scrollHeight;
	}
};

Message.getLastLine = function() {
	var content = document.getElementById('messageText').value;
	return content.substring(content.lastIndexOf("\n")+1);
};