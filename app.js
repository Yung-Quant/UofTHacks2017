var builder = require('botbuilder');
var restify = require('restify');
var server = restify.createServer();
var spawn = require("child_process").spawn;

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var connector = new builder.ChatConnector({
    appId: 'f26e7b53-b86d-4312-9dd7-d905196f74e9',//process.env.MICROSOFT_APP_ID,
    appPassword: 'hZkfwj2LGxTmib5Gd4zO2wO'//process.env.MICROSOFT_APP_PASSWORD
});
var globaldata, globalteam1, globalteam2;

var teams = [
    "Bournemouth",
    "Arsenal",
    "Aston Villa",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Leicester City",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Norwich City",
    "Southampton",
    "Stoke City",
    "Sunderland",
    "Swansea City",
    "Tottenham Hotspur",
    "Watford",
    "West Bromwich Albion",
    "West Ham United",
];

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

/*bot.dialog('/', function (session) {
    session.send('Hello World');
});*/

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/02ef0317-40d0-443a-ba13-3206060ecad2?subscription-key=9be2351f2e23465ba1663a214a0fe997&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var bot = new builder.UniversalBot(connector, function (session, message) {
    session.send('Welcome to the soccer prediction pool!');//. What\'s your name?');
    session.beginDialog('loop');
});

bot.dialog('loop', [
    function (session, results) 
{   //     if (!session.userData.name) {
 //           console.log('before');
 //           session.userData.name = results.response;
//            console.dir(results);
//            builder.Prompts.choice(session, "Hi " + name + ". What team are you rooting for?");
//         } else {
            builder.Prompts.choice(session, "What team will you root for this time?", teams);
//        }
    },
    function (session, results) {
        //teams2 = removeByValue(results, teams);
        session.dialogData.firstChoice = results.response.entity;
        builder.Prompts.choice(session, "Who should we simulate them against?", teams);
        console.log('hello');
        },
    function (session, results) {
        console.log('hello');
        session.send('Simulating ' + String(session.dialogData.firstChoice) + ' vs. ' + results.response.entity);
        //python call with session.dialogData.firstChoice and results.response
        console.log('hello');

        var process = spawn('python',["/home/gov/UofTHacks2017/Datasets/main.py", session.dialogData.firstChoice, results.response.entity]);
        console.log('asfg');
        globalteam1 = session.dialogData.firstChoice;
        globalteam2 = results.response.entity
        process.stdout.on('data', function (data){
        console.log('sgfhafdh');
        // Do something with the data returned from python script
        globaldata = data.toString('utf8');
        console.log('hello');
        });
        process.on('close', function(){
            session.send("The chances of " + globalteam1 + " defeating " + globalteam2 + " is " + globaldata + "%");
        });
    }]);

function removeByValue(value, teams) {
    var index = teams.indexOf(value);
    var newTeams = teams.slice();
    newTeams.splice(index, 1);
    return newTeams;    
} 

