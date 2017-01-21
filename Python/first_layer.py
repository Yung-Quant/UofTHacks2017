import csv
import numpy as np
import sys
import os

def getTeamID(yourTeam, opponent):
	
	with open('Team.csv') as csvfile:
                		
		ids = []
		teamInfo = csv.reader(csvfile, delimiter=',')
		count = 0
		for row in teamInfo:
			if not(row[3].find(yourTeam, 0, len(row[3]))):
				ids.append(row[1])
				break
		for row in teamInfo:
			if not(row[3].find(opponent, 0, len(row[3]))):
				ids.append(row[1])
				break
			
				
		csvfile.close()
		return ids

def getTeamHistory(idNums):
	
	with open('Match.csv') as csvfile:
		matchCount = 0
		history = []
		matchData = csv.reader(csvfile, delimiter=',')
		for row in matchData:
			if (row[7] == idNums[0]  and row[8] == idNums[1]) or (row[7] == idNums[1] and row[8] == idNums[0]):
				matchCount += 1
				history.append(row[7:11])
			if matchCount == 6:
				break
		csvfile.close()
		return history
		
def getProbability(history, idNums):
	
	winCount = 0
	outcomes = []
	for list in history:
		if list[0] == idNums[0] and list[2] > list[3]:
			winCount += 1
			outcomes.append(1)
		elif list[1] == idNums[0] and list[3] > list[2]:
			winCount += 1
			outcomes.append(1)
		else:
			outcomes.append(0)
	return [winCount/len(history), np.std(outcomes)]

sys.path.append('~/UofTHacks2017/Datasets/')
idNums = getTeamID('Manchester United', 'Liverpool')
history = getTeamHistory(idNums)
probability = getProbability(history, idNums)
print(probability[0], probability[1])
