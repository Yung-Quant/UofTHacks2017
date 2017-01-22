var builder = require('botbuilder');
var restify = require('restify');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var connector = new builder.ChatConnector({
    appId: 'd2374428-8187-48f6-a248-a7d0d8b21aad',//process.env.MICROSOFT_APP_ID,
    appPassword: 'U04vvCGsr1seaDrOm5U7Fvd'//process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

/*bot.dialog('/', function (session) {
    session.send('Hello World');
});*/

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/061c3379-3434-40cf-93e1-c419d847b734?subscription-key=9be2351f2e23465ba1663a214a0fe997&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

dialog.matches('BookFlight', [
    function(session, args, next) {
        var location = builder.EntityRecognizer.findEntity(args.entities, 'Location');
        if (!location) {
            builder.Prompts.text(session, "What would you like to call the task?");
        } else {
            next({ response: location.entity });
        }
    },
    function(session, results) {
        
    }
]);
dialog.onDefault(builder.DialogAction.send("Default"));