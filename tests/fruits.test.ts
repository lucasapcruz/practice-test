import httpStatus from "http-status"
import app from "index"
import { Fruit } from "repositories/fruits-repository"
import { FruitInput } from "services/fruits-service"
import supertest from "supertest"

describe("fruits tests", () => {

    it("should get a specific fruit", async () => {
        const id = 1
        const specificRequestResult = await supertest(app).get(`/fruits/${id}`)
        expect(specificRequestResult.status).toBe(httpStatus.OK)
        expect(specificRequestResult.body.name).toBe("maça")
    })

    it("should create a valid fruit", async () => {
        const fruit: FruitInput = {
            name: "Jaca",
            price: 3000
        }
        const result = await supertest(app).post("/fruits").send(fruit)
        expect(result.status).toBe(httpStatus.CREATED)
    })

    it("should not create a fruit with a name that already exists", async () => {
        const fruit: FruitInput = {
            name: "maça",
            price: 2000
        }
        const result = await supertest(app).post("/fruits").send(fruit)
        expect(result.status).toBe(httpStatus.CONFLICT)
    })

})