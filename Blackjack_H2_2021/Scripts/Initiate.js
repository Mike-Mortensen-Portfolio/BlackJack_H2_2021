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

//// Represents a timer that can be started and stopped ///////
//////////////////////////////////////////////////////////////
class Timer{
    constructor (){
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var run = true;

        this.GetSeconds = function (){
            return seconds;
        }

        this.GetMinutes = function (){
            return minutes;
        }

        this.GetHours = function (){
            return hours;
        }

        this.GetSecondsWithDigets = function (_digits = 2){
            return seconds.toLocaleString("en-US", { minimumIntegerDigits: _digits, useGrouping: false});
        }

        this.GetMinutesWithDigets = function (_digits = 2){
            return minutes.toLocaleString("en-US", { minimumIntegerDigits: _digits, useGrouping: false});
        }

        this.GetHoursWithDigets = function (_digits = 2){
            return hours.toLocaleString("en-US", { minimumIntegerDigits: _digits, useGrouping: false});
        }
        
        this.GetAsString = function (){
            return `${this.GetHoursWithDigets(2)}:${this.GetMinutesWithDigets(2)}:${this.GetSecondsWithDigets(2)}`;
        }

        this.Start = async function (_shouldLog = false){
            run = true;
            do {
                if (run == false){
                    break;
                }
                if (_shouldLog == true){
                    console.log(this.GetAsString());
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

        this.Stop = function (_shouldLog){
            run = false;
            console.log ("Timer Stopped");
        }
    }
}