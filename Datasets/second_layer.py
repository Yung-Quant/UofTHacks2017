import csv
import numpy as np

def getTeamID(team):

	ids = []
	with open('Team.csv') as csvfile:
		teamInfo = csv.reader(csvfile, delimiter=',')
		count = 0
		for row in teamInfo:
			if not(row[3].find(team, 0, len(row[3]))):
				ids = row[1]
				break
		csvfile.close()				
		return ids

def getTeamHistory(idNum):
    
    with open('Match.csv') as csvfile:
        matchCount = 0
        history = []
        matchData = csv.reader(csvfile, delimiter=',')
        for row in matchData:
            
            if row[7] == idNum or row[8] == idNum:
                history.append(row[7:11])
                matchCount += 1
            if matchCount == 72:
                break
        csvfile.close()
        return history

def getIndirectMatchup(myHist, theirHist, myID, theirID):

    myDiff = 0
    theirDiff = 0
    numMutGames = 0
    myOutcome = 0
    theirOutcome = 0
    numScratch = 0
    oldMutual = 0
    mutual = []
    for j in range(0, len(theirHist), 1):
        if theirHist[j][0] == theirID and theirHist[j][1] != myID:
            temp = theirHist[j][1]
            if theirHist[j][2] == theirHist[j][3]:
                theirOutcome = -1
            else:
                theirOutcome = theirHist[j][2] > theirHist[j][3]
        else:
            temp = theirHist[j][0]
            if theirHist[j][3] == theirHist[j][2]:
                theirOutcome = -1
            else:
                theirOutcome = theirHist[j][3] > theirHist[j][2]
        
        if temp not in mutual:
            for i in range(0,len(myHist), 1):

                if myHist[i][0] == myID and myHist[i][1] == temp and myHist[i][1] != theirID:
                    
                    if myHist[i][2] != myHist[i][3]:
                        myOutcome = myHist[i][2] > myHist[i][3]
                    if myHist[i][2] == myHist[i][3]:
                        myOutcome = -1
                    if myOutcome != theirOutcome:
                        numMutGames += 1
                        if myOutcome > theirOutcome:
                            myDiff += 1
                        else: 
                            theirDiff += 1
                    else:
                        numScratch += 1
                        
                elif myHist[i][1] == myID and myHist[i][0] == temp and myHist[i][0] != theirID:
                    
                    if myHist[i][3] != myHist[i][2]:
                        myOutcome = myHist[i][3] > myHist[i][2]
                    if myHist[i][2] == myHist[i][3]:
                        myOutcome = -1
                    if myOutcome != theirOutcome:
                        numMutGames += 1
                        if myOutcome > theirOutcome:
                            myDiff += 1
                        else:
                            theirDiff += 1
                    else:
                        numScratch += 1
                
        mutual.append(temp)
    stdList = myDiff*[1] + (numMutGames-myDiff)*[0]
    return [float(myDiff)/numMutGames, np.std(stdList)]


def secondLayerMain(team1, team2):
    myTeamID = getTeamID(team1)
    theirTeamID = getTeamID(team2)
    myTeamHistory = getTeamHistory(myTeamID)
    theirTeamHistory = getTeamHistory(theirTeamID)
    probability = getIndirectMatchup(myTeamHistory, theirTeamHistory, myTeamID, theirTeamID)
    return probability
