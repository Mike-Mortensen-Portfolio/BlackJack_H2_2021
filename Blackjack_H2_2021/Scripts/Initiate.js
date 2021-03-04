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

//// Redirects to the Index.html page ////////////////////////
//////////////////////////////////////////////////////////////
function ToIndex (){
    window.location.href = "./index.html";
}

//// Redirect to the GamePage.html page //////////////////////
//////////////////////////////////////////////////////////////
function ToGamePage (){
    window.location.href = "./gamePage.html";
}

//// Represents a timer that can be started and stopped ///////
//////////////////////////////////////////////////////////////
class Timer{
    constructor (){
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var run = true;

        //// Get the current second count ////////////////////////////
        //////////////////////////////////////////////////////////////
        this.GetSeconds = function (){
            return seconds;
        }

        //// Get the current minute count ////////////////////////////
        //////////////////////////////////////////////////////////////
        this.GetMinutes = function (){
            return minutes;
        }

        //// Get the current hour count ////////////////////////////
        //////////////////////////////////////////////////////////////
        this.GetHours = function (){
            return hours;
        }

        //// Get the current second count as a double digit ///////////
        ////  format string                                 //////////
        //////////////////////////////////////////////////////////////
        this.GetSecondsWithDigets = function (){
            return seconds.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false});
        }

        //// Get the current minute count as a double digit //////////
        ////  format string                                 //////////
        //////////////////////////////////////////////////////////////
        this.GetMinutesWithDigets = function (){
            return minutes.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false});
        }

        //// Get the current hour count as a double digit  ///////////
        ////  format string                                 //////////
        //////////////////////////////////////////////////////////////
        this.GetHoursWithDigets = function (){
            return hours.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false});
        }
        
        //// Get the current time as a formated string ///////////////
        //////////////////////////////////////////////////////////////
        this.GetAsString = function (){
            return `${this.GetHoursWithDigets(2)}:${this.GetMinutesWithDigets(2)}:${this.GetSecondsWithDigets(2)}`;
        }

        //// Starts the timer ////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////// _associatedUIID: The ID of the HTML element that ////
        ////////                  the timer should output to      ////
        ////------------------------------------------------------////
        //////// _shouldLog: Whether or not the timer should      ////
        ////////             output to the console                ////
        //////////////////////////////////////////////////////////////
        this.Start = async function (_associatedUIID = undefined, _shouldLog = false){
            run = true;

            let UI = document.getElementById (_associatedUIID);

            do {
                if (run == false){
                    break;
                }
                if (_shouldLog == true){
                    console.log(this.GetAsString());
                }

                if (UI != undefined){
                    UI.innerHTML = this.GetAsString();
                }

                await new Promise (resolve => {setTimeout (resolve, 1000)});
                seconds++;

                if (seconds == 60){
                    seconds = 0;
                    minutes++;
            
                    if (minutes == 60){
                        minutes = 0;
                        hours++;
                    }
                }
            }while (true);
        }

        //// Stop the timer //////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        this.Stop = function (_shouldLog){
            run = false;
            console.log ("Timer Stopped");
        }
    }
}

//// Executed when the pages is loaded ///////////////////////
//// This simply starts a timer        ///////////////////////
//////////////////////////////////////////////////////////////
window.onload = function (){
    new Timer ().Start ("clock");
}