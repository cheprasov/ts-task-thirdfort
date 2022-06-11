# Alexander Cheprasov

## About me

https://cv.cheprasov.com

## Coding Challenge

Your task is to build a REST API backend application that can be used to manage personal notes in a multi-user environment.

The API must have the following key features:
- Save a new note
- Update a previously saved note
- Delete a saved note
- Archive a note
- Unarchive a previously archived note
- List saved notes that aren't archived
- List notes that are archived


## How to run
### 1. Via Docker
```
run ./start_docker.sh
```
Then open http://localhost:3000/ in your browser

### 2. Via npx
If you do not have docker, please use npx command, but you need to have provide credentials for Mysql connection.
```
MYSQL_HOST=localhost MYSQL_PORT=3306  MYSQL_USER=<user> MYSQL_PWD=<password> npx ts-node --project ./tsconfig.json ./server.ts
```
Then open http://localhost:3000/ in your browser

## What need to do and what I have not done, because it is a test exercise.

- I did almost code from scratch for showing skills, but it is good to use some framework for backend like NestJS, ORM for databases, proper user_id, separate database connections for write/read, cache implementation and so on.
- Code and API should be covered by tests.
- Different `todo` things in code should be implemented.
- CRUD response codes, response data format and the REST API could be updated according business needs, good to have pagination for lists.
- Logger / Metrics should be added for collecting possible error and monitoring the App.
- Good to have a linter for checking code style.
- Generator for documenting API could be implemented.


## Authorization

Note. All requests require user authorization. And auth token should be provided for each REST request to server via header `Authorization: <token>`, but for the code challende only and because user table is not implemented, you need provide numeric user id instead of the token. Example: `Authorization: 42`.

## -> Save a new note
```
POST http://localhost:3000/notes
```
**Body params:**
- title: string. Max length 200
- text: string.

**Returns** new created note.

Example:
```
> curl -X POST -H 'Authorization: 42' -d 'title=New title&text=Some note content'  http://localhost:3000/notes

{"status":201,"data":{"id":13980471623,"title":"New title","text":"Some note content"}}
```

## -> Update a previously saved note
```
PUT http://localhost:3000/notes/:id
```
**Params:**
- title: string. Max length 200
- text: string.

**Returns** updated note.

Example:
```
> curl -X PUT -H 'Authorization: 42' -d 'title=Updated title&text=Updated note content' http://localhost:3000/notes/13980471623

{"status":200,"data":{"id":13980471623,"title":"Updated title","text":"Updated note content"}}%
```
## -> Delete a saved note
```
DELETE http://localhost:3000/notes/:id
```

Example:
```
> curl -X DELETE -H 'Authorization: 42' http://localhost:3000/notes/13980924931

{"status":200,"data":"Deleted"}
```
## -> Archive a note
```
PUT http://localhost:3000/notes/:id/archive
```

Example:
```
> curl -X PUT -H 'Authorization: 42' http://localhost:3000/notes/13980925929/archive

{"status":200,"data":true}
```
## -> Unarchive a previously archived note
```
PUT http://localhost:3000/notes/:id/unarchive
```

Example:
```
> curl -X PUT -H 'Authorization: 42' http://localhost:3000/notes/13980925929/unarchive

{"status":200,"data":true}
```
## -> List saved notes that aren't archived
```
GET http://localhost:3000/notes
```
Example:
```
> curl -X GET -H 'Authorization: 42' http://localhost:3000/notes

{"status":200,"data":[{"id":13910261906,"title":"New","text":"body"},{"id":13966830551,"title":"New","text":"body"}]}
```
## -> List notes that are archived
```
GET http://localhost:3000/notes/archive
```

Example:
```
> curl -X GET -H 'Authorization: 42' http://localhost:3000/notes/archive

{"status":200,"data":[{"id":13980925929,"title":"New title","text":"Some note content"}]}
```
