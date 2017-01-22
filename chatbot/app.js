var builder = require('botbuilder');
var restify = require('restify');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var connector = new builder.ChatConnector({
    appId: 'f26e7b53-b86d-4312-9dd7-d905196f74e9',//process.env.MICROSOFT_APP_ID,
    appPassword: 'hZkfwj2LGxTmib5Gd4zO2wO'//process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

/*bot.dialog('/', function (session) {
    session.send('Hello World');
});*/

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/02ef0317-40d0-443a-ba13-3206060ecad2?subscription-key=9be2351f2e23465ba1663a214a0fe997&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Welcome to the soccer prediction pool. What\'s your name?');
});

bot.dialog('loop', [
    function (session, results) 
{        if (!session.userData.name) {
            session.userData.name = results.response;
            builder.Prompts.choice(session, "Hi " + name + ". What team are you rooting for?");
        } else {
            builder.Prompts.choice(session, "What team will you root for this time?", teams);
        }
    },
    function (session, results) {
        teams2 = removeByValue(results.response);
        session.dialogData.firstChoice = results.response;
        builder.Prompts.choice(session, "Who should we simulate them against?", teams2);
    },
    function (session, results) {
        session.send('Simulating ' + session.dialogData.firstChoice + ' vs. ' + results.response);
        //python call with session.dialogData.firstChoice and results.response
        var spawn = require("child_process").spawn;
        var process = spawn('python',["main.py", session.dialogData.firstChoice, results.response]);

        process.stdout.on('data', function (data){
        // Do something with the data returned from python script
        console.log(data.toString('utf8'));
        });
    }
]);

var teams = [
    "AFC Bournemouth",
    "Arsenal FC",
    "Aston Villa",
    "Chelsea FC",
    "Crystal Palace",
    "Everton FC",
    "Leicester City",
   " Liverpool FC",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Norwich City",
    "Southampton FC",
    "Stoke City",
    "Sunderland AFC",
    "Swansea City",
    "Tottenham Hotspur",
    "Watford FC",
    "West Bromwich Albion",
    "West Ham United",
];

function removeByValue(value, teams) {
    var index = teams.indexOf(value);
    var newTeams = teams.slice();
    newTeams.splice(index, 1);
    return newTeams;    
} 

