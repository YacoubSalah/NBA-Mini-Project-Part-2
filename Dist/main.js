const myRenderer = new renderer()
myRenderer.prepareHandlebars()

$("#getRosterButton").on("click", function () {
    const teamName = $("#teamNameInputField").val()
    const routeUrl = `/teams/${teamName}`
    $.get(routeUrl, function (data) {
        myRenderer.render(data)
    })
})

$("#dreamTeamButton").on("click", function () {
    const routeUrl = `/dreamTeam`
    $.get(routeUrl, function (data) {
        myRenderer.render(data)
    })
})

$("#dataContainer").on("click", ".addToDreamTeamButton.notInDreamTeam", function () {
    const firstName = $(this).closest(".playerCard").find(".firstName").html()
    const lastName = $(this).closest(".playerCard").find(".lastName").html()
    const jersy = $(this).closest(".playerCard").find(".jersy").html()
    const pos = $(this).closest(".playerCard").find(".pos").html()
    const player = { "firstName": firstName, "lastName": lastName, "jersy":jersy , "pos" : pos , "inDreamTeam" : true} 
    $.post("/addPlayer" , player  ,function(teamData){
        myRenderer.render(teamData)
    })
})

$("#dataContainer").on("click", ".addToDreamTeamButton.inDreamTeam", function () {
    const firstName = $(this).closest(".playerCard").find(".firstName").html()
    const lastName = $(this).closest(".playerCard").find(".lastName").html()
    const jersy = $(this).closest(".playerCard").find(".jersy").html()
    const pos = $(this).closest(".playerCard").find(".pos").html()
    const player = { "firstName": firstName, "lastName": lastName, "jersy":jersy , "pos" : pos , "inDreamTeam" : true} 
    $.ajax({
        url: "/deleteFromDreamTeam",
        method: "DELETE",
        data : player,
        success: function(teamData){
            myRenderer.render(teamData)
        }
    })
})