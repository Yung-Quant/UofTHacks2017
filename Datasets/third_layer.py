import csv
import numpy as np

def getTeamID(team):

    with open('Team.csv') as csvfile:
        ids = []
        teamInfo = csv.reader(csvfile, delimiter=',')
        count = 0
        for row in teamInfo:
            if not(row[3].find(team,0,len(row[3]))):
                ids = row[1]
                break
        csvfile.close()
        return ids

def getTeamHistory(idNum):

    with open('Match.csv') as csvfile:
        matchCount = 0
        history = []
        matchData = csv.reader(csvfile,delimiter=',')
        for row in matchData:
            if row[7] == idNum or row[8] == idNum:
                history.append(row[7:11])
                matchCount += 1
            if matchCount == 38:
                break
        csvfile.close()
        return history

def getPoints(history, id):
    point = 0
    for row in history:
        if row[0] == id:
            if row[2] > row[3]:
                point += 3
            if row[2] == row[3]:
                point += 1
        if row[1] == id:
            if row[3] > row[2]:
                point += 3
            if row[2] == row[3]:
                point += 1
    return point

def thirdLayerMain(team1, team2):
    myTeamID = getTeamID(team1)
    theirTeamID = getTeamID(team2)
    myTeamHistory = getTeamHistory(myTeamID)
    theirTeamHistory = getTeamHistory(theirTeamID)
    myPoints = getPoints(myTeamHistory, myTeamID)
    theirPoints = getPoints(theirTeamHistory, theirTeamID)
    probabilityBoost = (myPoints-theirPoints)/float(myPoints)
    return probabilityBoost
