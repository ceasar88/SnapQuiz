#This script as of now simply finds a json file in the same
#directory named 'insert.json' and inserts it into the redis
#database. This is to automate easier testing of json files
#without having to make a button on some page to add it from
#the javascript.

#Note: will need to run:
#pip install redis
import json
import redis

with open('insert.json') as json_data:
    d = json.load(json_data)

r = redis.StrictRedis(host='li340-184.members.linode.com', port=6379, db=0, password='Snapquiz')

#Get course id from json
courseID = d["courseid"]

latestQuizID = r.incr('quizid')
r.hset('course:' + str(courseID) + ':quiz', str(latestQuizID), d)

print("Put into redis database: ")
print(r.hget('course:' + str(courseID) + ':quiz', str(latestQuizID)))
