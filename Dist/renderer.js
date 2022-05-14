class renderer{
    constructor(){
        this.dataContainer = $("#dataContainer")
        this.dataTemplate =""
    }

    prepareHandlebars(){
        const source= $("#dataTemplate").html()
        this.dataTemplate = Handlebars.compile(source)
    }

    render(data){
        this.dataContainer.empty()
        const result = this.dataTemplate({data})
        this.dataContainer.append(result)
    }
}