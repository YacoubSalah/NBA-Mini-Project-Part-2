const urllib = require("urllib")
const express = require("express")
const router = express.Router()

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

let dreamTeam = []

let teamData = []

//this route is to add new teams to the teamToIDs list
router.put("/team/:admin", function (req, res) {
    const isAdmin = (req.params.admin == "admin")
    if (isAdmin) {
        const newTeam = req.body
        teamToIDs[newTeam.teamName] = newTeam.teamId
        res.send(JSON.stringify(teamToIDs))
    }
})

//get a team data by team name
router.get("/teams/:teamName", function (req, res) {
    const teamName = req.params.teamName
    const teamId = teamToIDs[teamName]
    const nba_API_URL = "http://data.nba.net/10s/prod/v1/2018/players.json"

    urllib.request(nba_API_URL, function (err, data) {
        const nbaData = JSON.parse(data).league.standard
        const nbaDataFiltered = nbaData.filter(players => players.teamId == teamId & players.isActive)
        const nbaDataMapped = nbaDataFiltered.map(player => ({ "firstName": player.firstName, "lastName": player.lastName, "jersy": player.jersey, "pos": player.pos }))
        teamData = checkInDreamTeam(nbaDataMapped)
        res.send(teamData)
    })

})

//sends dreamTeam Data
router.get("/dreamTeam", function (req, res) {
    teamData = dreamTeam
    res.send(teamData)
})

//adds player to Dream Team
router.post("/addPlayer", function (req, res) {
    const newPlayer = req.body
    dreamTeam.push(newPlayer)
    checkInDreamTeam(teamData)
    res.send(teamData)
})

function checkInDreamTeam(nbaDataMapped) {
    nbaDataMapped.forEach(p => {
        p.inDreamTeam = false
        dreamTeam.forEach(dp => {
            if (dp.firstName == p.firstName && dp.lastName == p.lastName) {
                p.inDreamTeam = true
            }
        })
    })
    return nbaDataMapped
}

router.delete("/deleteFromDreamTeam", function (req, res) {
    const player = req.body
    for (let i = 0; i < dreamTeam.length; i++) {
            if (dreamTeam[i].firstName == player.firstName && dreamTeam[i].lastName == player.lastName) {
                dreamTeam.splice(i, 1)
                break;
            }
    }
    checkInDreamTeam(teamData)
    res.send(teamData)
})

module.exports = router