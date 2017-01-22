import csv
import numpy as np 

def generate_fixtures():
	
	with open('team.csv') as csvfile:

		team = csv.reader(csvfile, delimiter = ',')
		fixtures = open('fixtures.csv')
		teamwrite = csv.writer(fixtures, delimiter = ',')
		rand_done = []
		for row in team:
			rand1 = np.random.randint(1, 20)
			rand2 = np.random.randint(1, 20)

			if (((rand1 and rand2) not in rand_done) and (rand1 != rand2)):
				teamwrite.writerow(row[rand1], row[rand2])
			rand_done.append(rand1)
			rand_done.append(rand2)			
fixgen = generate_fixtures()
print("Done (??)")
