//// Validates the form and redirects to the /////////////////
//// Game Page. If the form is invalid, this will alert //////
//// the user and wait for another submission           //////
//////////////////////////////////////////////////////////////
function Validate ()
{
    var nameBox = document.forms ["startGameForm"]["fPlayerName"];

    if (nameBox == undefined)
    {
        alert ("No name box found!");
    }

    if (nameBox.value == undefined || nameBox.value.length > 6 || nameBox.value.includes (" ") || nameBox.value == ""){
        alert ("You must type in a valid name to proceed!");
    }
    else{
        localStorage.setItem ("PlayerName", nameBox.value);
        ToGamePage();
    }
    
    return false;
}

function ToIndex (){
    window.location.href = "./index.html";
}

function ToGamePage (){
    window.location.href = "./gamePage.html";
}