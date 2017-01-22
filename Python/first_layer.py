import csv
import numpy as np

def getTeamID(team):
	
	with open('/home/gov/UofTHacks2017/Datasets/Team.csv') as csvfile:
		
		teamInfo = csv.reader(csvfile, delimiter=',')
		count = 0
		for row in teamInfo:
			if not(row[3].find(team, 0, len(row[3]))):
				ids = row[1]
				break	
		csvfile.close()
		return ids

def getTeamHistory(idNums):
	
	team1 = idNums[0]
	team2 = idNums[1]
	with open('/home/gov/UofTHacks2017/Datasets/Match.csv') as csvfile:
		matchCount = 0
		history = []
		matchData = csv.reader(csvfile, delimiter=',')
		for row in matchData:
			if (row[7] == team1  and row[8] == team2):
				matchCount += 1
				history.append(row[7:11])
			if (row[7] == team2 and row[8] == team1):
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

	return [float(winCount)/len(history), np.std(outcomes)]
	
idNums = []						
idNums.append(getTeamID('Manchester United'))
idNums.append(getTeamID('Liverpool'))
history = getTeamHistory(idNums)
probability = getProbability(history, idNums)
print(probability[0], probability[1])
