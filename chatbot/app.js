var builder = require('botbuilder');
var restify = require('restify');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var connector = new builder.ChatConnector({
    appId: '72e12202-a840-462f-85f8-9e993d0bfdfd',//process.env.MICROSOFT_APP_ID,
    appPassword: 'U04vvCGsr1seaDrOm5U7Fvd'//process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

/*bot.dialog('/', function (session) {
    session.send('Hello World');
});*/

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/72e12202-a840-462f-85f8-9e993d0bfdfd?subscription-key=9be2351f2e23465ba1663a214a0fe997&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

dialog.matches('CalculateProbability', [
    function(session, args, next) {
        var Team1 = builder.EntityRecognizer.findEntity(args.entities, 'team1');
        var Team2 = builder.EntityRecognizer.findEntity(args.entities, 'team2');
        //var Outcome = buider.EntityRecognizer.findEntity(args.entities, 'outcome');
        if (!Team1 && !Team2) {
            builder.Prompts.text(session, "No teams found.");
        } else if (Team1 && !Team2) { 
            builder.Prompts.text(session, "Team 1: " + Team1);
        } else if (!Team1 && Team2) {
            builder.Prompts.text(session, "Team 2: " + Team2);
        } else {
            builder.Prompts.text(session, "Test 1: " + Team1 + ", Team 2: " + Team2);
            /*next({ response: {
                    toLocation: toLocation,
                    fromLocation: fromLocation
            } 
            });*/
        }
    }/*,
    function(session, results) {
        if (results.response) {
            if (results.response.toLocation && results.response.fromLocation) {
                session.send("Your flight has been booked from '%s' to '%s'.", results.response.toLocation, results.response.fromLocation);
                results.response.toLocation = null;
                results.response.fromLocation = null;
            } else {
                session.send("Ok");
            }
        }   
    }*/
]);
dialog.onDefault(builder.DialogAction.send("Default"));