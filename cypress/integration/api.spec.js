/// <reference types="cypress" />

describe("Rest API Test with Cypress", () => {
            let token = ""
            var projectId = ""
            let templateQuiz = ""
            let stageId = ""




            it("Get access token test", () => {
                cy.request({
                    method: "POST",
                    url: "https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/login",

                    body: {
                        "username": "tech.admin@accesa.eu",
                        "password": "admin",
                        "tokenAD": "activeDirectoryTokenFE"
                    }
                }).then(response => {
                    //cy.log(JSON.stringify(response));
                    cy.log(response.body.token)
                    token = response.body.token;

                })

            })
    

                

                it("Add new project request", () => {
                    cy.request({
                        method: "POST",
                        url: "https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/projects",
                        body: {

                            "name": "Bondane_Catalin",
                            "description": "new feature Project"
                        },
                        headers: {
                            "Authorization": token
                        }
                    }).then(response => {
                        projectId = response.body.projectId
                        cy.log("project id " + projectId)
                        //cy.log(JSON.stringify(response));
                        expect(response.status).to.equal(201);
                        cy.log(`Adding contributor (tech.admin@accesa.eu) to project ${projectId}`)
                        cy.request({

                            method: 'POST',
                            url: `https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/projects/contributors/${projectId}/tech.admin@accesa.eu`,
                            body: {
                                name: 'Bondane_Catalin',
                               
        
                            }
                        }).then(response => {
                           // cy.log(JSON.stringify(response));
                            expect(response.status).to.equal(204);
                        })
                    })
                })

                 it("Add new template quiz request", () => {
                    cy.request({
                        method: "POST",
                        url: `https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/template-quizzes?projectId=${projectId}`,
                        headers: {
                            "Authorization": token
                        }
                    }).then(response => {
                        templateQuiz = response.body.templateQuizId;
                        cy.log("template quiz id " + templateQuiz)
                        //cy.log(JSON.stringify(response));
                        expect(response.status).to.equal(201);

                    })
                })

                it("Add new stage request", () => {
                    cy.request({
                        method: "POST",
                        url: "https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/stages",
                        body: {
                            "templateQuizId": templateQuiz,
                            "stageName": "Stage Test1",
                            "points": 10.0
                        },
                        headers: {
                            "Authorization": token
                        }
                    }).then(response => {
                        stageId = response.body.stageId;
                        cy.log("Stage Id " + stageId)
                        //cy.log(JSON.stringify(response));
                        expect(response.status).to.equal(201);

                    })
                })
                it("Delete stage request", () => {
                    cy.log(`Delete stage with id ${stageId}`)
                    cy.request({
                        method: "DELETE",
                        url: `https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/stages/${stageId}`,
                        headers: {
                            "Authorization": token
                        }

                    }).then(response => {

                        //cy.log(JSON.stringify(response));
                        expect(response.status).to.equal(204);

                    })
                })
                it("Delete template quiz request", () => {
                    cy.log(`Delete template quiz with id ${templateQuiz}`)
                    cy.request({
                        method: "DELETE",
                        url: `https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/template-quizzes/${templateQuiz}`,
                        headers: {
                            "Authorization": token
                        }

                    }).then(response => {
                        //cy.log(JSON.stringify(response));
                        expect(response.status).to.equal(204);
                    })
                })


                it("Delete project request", () => {
                    cy.log(`Delete project with id ${projectId}`)
                    cy.request({
                        method: "DELETE",
                        url: `https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/projects/${projectId}`,
                        headers: {
                            "Authorization": token
                        }

                    }).then(response => {
                        //cy.log(JSON.stringify(response));
                        expect(response.status).to.equal(204);

                    })
                })
               



                // it("Add new question request", () => {
                //     cy.request({
                //         method: "POST",
                //         url:"https://accesa-internship-portal-be-asvanwz5ea-ez.a.run.app/api/questions/templated",
                //         body:{
                //             "type": "checkbox",
                //             "body": "test",
                //             "templateQuizId": templateQuiz,
                //             "stageName": "Stage Test1",
                //             "templatedAnswerDTOS": [{
                //                 "answerText": "test",
                //                 "truthValue": false
                //             },
                //             {
                //                 "answerText": "u",
                //                 "truthValue": true
                //             }],
                //             "codingAnswerDTOS":[]
                //         },
                //         headers: {
                //             "Authorization":token
                //         }
                //     }).then(response => {
                //         questionId=response.body.questionId;
                //         cy.log("Question id " + questionId)
                //         //cy.log(JSON.stringify(response));
                //         expect(response.status).to.equal(201);

                //     })

                // })


            })