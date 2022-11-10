const  phrase = document.querySelector("#phrase");
let ul = document.querySelector('#phrase ul');
const  buttons = document.querySelectorAll("button"); 
let overlay = document.querySelector("#overlay");
let hearts = document.querySelectorAll("ol li");
//const  scoreboard = document.querySelector("#scoreboard"); 
const reset = document.querySelector(".btn__reset");
const qwerty = document.querySelectorAll("#qwerty[class=section]");
const keyrow = document.querySelectorAll("div[class=keyrow]");
let missed = 0;
let showClass_count = 0;
let lettersClass_count= 0;
document.querySelector(".btn__reset").addEventListener("click", ()=>{//  hide overlay
    overlay.style.display="none";
})
const phrases = [
    "a b",
    "c d",
    "The quick brown fox jumps over the lazy dog",
    "I hate you",
    "I am very happy to see you",
    "When your pocket is empty ask your hand why",
    "I have access to my bank account",
    "Good night my friend",
    "My english speaking skills is very basic",
    "I love you so much"
];
function getRandomPhraseAsArray(arr){//this function select random phrase from the phrases array and stores in a new array
    for (let i = 0; i<arr.length; i++){
        let randomIndex = Math.floor(Math.random() * phrases.length);
        let phrase =arr[randomIndex]; // selects randon phrase
        let phraseArray =phrase.split("");
        return phraseArray;  
    }
}
//display phrase on the page
function addPhraseToDisplay(xterArr){
    //first remove children if it exist. This is helpful for reset
    ul.replaceChildren();                                           //https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    // do stuff any arr that is passed in, and add to `#phrase ul`
    for (let i = 0; i<xterArr.length; i++){
        //check if the character is a letter
        let li = document.createElement("li");
        (/[a-zA-Z]/).test(xterArr[i])===true? li.className = "letter":li.className = "space";
        li.textContent =`${xterArr[i]}`;
        ul.appendChild(li);
    }
    //Grab the length of letter class and show class. This will be used  for decision making if a player wins
    lettersClass_count = document.querySelectorAll("li[class=letter]").length;
    return ul;
}
//check if the button letter selected is available
function checkLetter(btn){
    let ulChildren = ul.children;
    for (let i = 0; i<ulChildren.length; i++){
        let matchedVar = null;   // this null will be returned if the li is not a letter
        let eachChild = ulChildren[i];
        if (eachChild.className==="letter" || eachChild.className !=="show"){ // if the list is a letter ( not a space ) and "show" class has not been assigned
            btnTxt = btn.textContent.toLowerCase();
            if(btnTxt===eachChild.textContent.toLowerCase()) {//if btn value is equal to li value
                /*
                    It should be noted that sometimes the phrase may contain more than one type of letter that matches the button textcontent clicked. 
                    Search through the phrase and find out if the phrase has one or more identical letters matching the button's textContent.
                    If available, add the appropriate classes.
                */
                for(let b = 0; b< ulChildren.length; b++){
                    let each = ulChildren[b];
                    if (each.className==="letter" || each.className !=="show"){
                        if(btnTxt===each.textContent.toLowerCase()) {
                            //add transition class  "anime" to each letter in the phrase display as they are revealed
                            each.className=`letter anime show`; 
                            if (b <(ulChildren.length)){
                                each.className=`letter anime show`; 
                                setTimeout(() => {// then remove the "anime" class after .3 seconds of displaying the class as seen in the above code
                                    each.className=`letter show`; 
                                }, 300);
                            }
                        }
                    }
                }
                showClass_count  = document.querySelectorAll("li.show").length; // This variable will be used to determine if a player won
                matchedVar = eachChild.textContent;
                return matchedVar;
            }    
        }else{
            return matchedVar;
        }
    }  
}
createElem=(msg, parent_node)=>{//create h3 element funct
    let h3_msg = document.createElement("h3");
    h3_msg.textContent =msg;
    parent_node.appendChild(h3_msg);
}
function msg(msg1, msg2){ // function for success or failure msg
    let last = overlay.lastElementChild;
    let parent = last.parentNode;
    if (last.tagName !=="H3"){ //create new h1 not created
        createElem(msg1, parent)
        createElem(msg2, parent)
    }else{
        last.previousElementSibling.textContent=msg1;
        last.textContent=msg2;
    }
}
let overlayFunction=(className, message1, message2)=>{
    overlay.className = className;
    overlay.style.display="block";
    msg(message1, message2)
}
function checkWin(show_class, letters_class){
    if(show_class===letters_class){
        setTimeout(()=>{ // this delay function delay for 1 second before showing the overlay ( win/lose )
            overlayFunction("win", "Congratulation! you won!", `You made ${missed} failure(s)`)
        }, 1000)
    }else if(missed >=5){
            setTimeout(()=>{
            overlayFunction("lose", "You l ose.", "Please try again !!!")
    }, 1000)
    }
}
// listen to the buttons and update the heart image if failed
buttons.forEach(button =>{
    button.addEventListener("click", e=>{
        button.classList ="chosen";
        button.disabled = true;
        let letterFound= checkLetter(e.target);//    call the check letter function   
        //update heart images
        if (!(letterFound)){// if the value of the letterFound stored is null
            hearts[missed].firstElementChild.src="images/lostHeart.png";
            missed++;// This variable is useful to determine if a player lost
        }
        let li = ul.children;
        //display win or lose overlay
        checkWin(showClass_count, lettersClass_count);
    })
})
////////////////////////////////////reset
reset.addEventListener("click", ()=>{
    //reset the variables
    missed = 0;
    showClass_count = 0;
    lettersClass_count= 0;
    //reset display
    let  ul_children = ul.children;
    /*the loop below removes other classes except class "lette",
    from the phrases list with class "letter" */
    for(let i=0; i<ul_children.length; i++){
        ul_children[i].classList.contains("letter")?ul_children[i].classList="letter":0;
    }
    let phraseArray = getRandomPhraseAsArray(phrases)//save the random phrase array in a variable
    addPhraseToDisplay(phraseArray); // display list
    //reset keyboard
    qwerty.forEach(div=>{
        keyrow.forEach(row=>{
            buttons.forEach(btn=>{
                btn.disabled=false;
                btn.removeAttribute("class");                
            })
        })
    });
    //reset hearts
    hearts.forEach(heart=>heart.firstElementChild.src="images/liveHeart.png")

})




















