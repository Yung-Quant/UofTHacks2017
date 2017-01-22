import first_layer
import second_layer
import third_layer
import sys

team1 = sys.argv[1]
team2 = sys.argv[2]

prob1 = first_layer.firstLayerMain(team1,team2) # first probability layer, head to  head probability
print prob1
prob2 = second_layer.secondLayerMain(team1,team2) # second probability, indirect comparision using mutual opponents
print prob2
prob3 = third_layer.thirdLayerMain(team1,team2) # probability boost, relative superiority in standings non-weighted just added 
print prob3