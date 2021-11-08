describe ("Basic API Testing #1",() =>{
    it("API Test-Validate Headers",() =>{
        cy.request("https://accesa-internship-portal.web.app/").as("portal")
        cy.get("@portal").its("headers").its("content-type").should("include", "text/html; charset=utf-8")
    })
    it("API Test-Validate status code", () =>{
        cy.request("https://accesa-internship-portal.web.app").as("portal")
        cy.get("@portal").its("status").should("equal",200)
    })
  
    //    it("API Test-Validate Name Value",()=>{
    //   cy.request("https://accesa-internship-portal.web.app").as("portal")
    //      cy.log(cy.get("@portal").its("body")//.should("include","<h2>Evaluations</h2>")
    //      )
    //   })

    // it("API Test-Validate Body length",()=>{
    //     cy.request("https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/login").as("portal")
    //     cy.get("@portal").its("body").its("content-length").should("have.length", "429")
    // })

})