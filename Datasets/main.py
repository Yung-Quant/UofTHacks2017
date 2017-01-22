import os
os.chdir("/home/gov/UofTHacks2017/Datasets/")
import first_layer
import second_layer
import third_layer
import sys

team1 = sys.argv[1]
team2 = sys.argv[2]

prob1 = first_layer.firstLayerMain(team1,team2) # first probability layer, head to  head probability
prob2 = second_layer.secondLayerMain(team1,team2) # second probability, indirect comparision using mutual opponents
probBoost = third_layer.thirdLayerMain(team1,team2) # probability boost, relative superiority in standings non-weighted just added 


weight1 = 0.7
weight2 = 0.3
prob1Adj = prob1[0]*weight1
prob2Adj = prob2[0]*weight2
finalProb = prob1Adj + prob2Adj + probBoost

print(round(100 * finalProb))