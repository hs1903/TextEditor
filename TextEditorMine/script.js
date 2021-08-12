
import { Stack } from './stack.js';

//this function prevents the use of Ctrl and Cmd
//we do this so that user dont use functions like copy ,paste,cut
document.onkeydown = function(event) {
    if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
    }
};

onload = function () {
    // Get reference to elements
    const textbox = document.getElementById('comment');
    const undo = document.getElementById('undo');
    const clear = document.getElementById('clear');
    const temptext = document.getElementById('temptext');

    textbox.value = "";
    let text = "";
    let stack = new Stack();
    
    //it ensure that cursor remains at end of string and doenot come in between of string and user cannot perform insertion and deletion operation in between of string
    textbox.onclick = function () {
        textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
    };

    clear.onclick = function () {
        stack.clear();
        text = "";
        textbox.value = "";
        temptext.innerHTML = "Sequence of operations will be shown here !";
    };

    textbox.oninput = function(event){
        // console.log(event);
        switch(event.inputType){
            case "insertText":      //when user inputs a,b,c or any other letter
                stack.push(0, event.data);
                break;
            case "deleteContentBackward":   //when user inputs backspace key
                //event operation tell user which element is inserted
                //since event doesnot tell user which element was deleted we keep a hash of string to store the deleted element
                //so we created hash to get last element which was deleted
                stack.push(1, text[text.length-1]); 
                break;
        }
        //to update the text box-> to show what is on top of text box whnever an operation is performed
        temptext.innerHTML = "On stack "+stack.top()+"<br>"+temptext.innerHTML;
        text = textbox.value;
    };

    undo.onclick = function () {
        let operation = stack.pop();
        if(operation[0]!==-1){
            temptext.innerHTML = "Performing undo operation<br>"+temptext.innerHTML;
            if(operation[0] === 0){
                let len = operation[1].length;
                textbox.value = textbox.value.substring(0,textbox.value.length-len);
            } else{
                textbox.value += operation[1];
            }
            text = textbox.value;
        }
    };
};