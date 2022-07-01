import app from "~/app"
import { StatusCodes } from 'http-status-codes'
import userBuilder from "~/infrastructure/builders/user.builder"
import { User } from "./user.types"

const BASE_URL = '/api/v1/user/'

type ExpectType = { data: { users: User[] } | null, errors: string[] | null}


describe('User', () => {

  test('GET / Deve retornar status PARTIAL_CONTENT e com lista vazia', async () => {
    const expected: ExpectType = {
      data: {
        users: []
      },
      errors: ['No data found']
    }

    const resp = await app.inject({
      method: 'GET',
      url: BASE_URL
    })

    expect(resp.statusCode).toBe(StatusCodes.PARTIAL_CONTENT)
    expect(resp.json()).toStrictEqual(expected)
  })

  test('GET / Deve retornar status OK e com lista de usuários', async () => {
    const user1 = await userBuilder().insert()
    const user2 = await userBuilder().insert()
    const expected: ExpectType = {
      data: {
        users: [user1, user2]
      },
      errors: null
    }

    const resp = await app.inject({
      method: 'GET',
      url: BASE_URL
    })

    expect(resp.statusCode).toBe(StatusCodes.OK)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('GET / Deve retornar status OK e com lista de apenas o usuário buscado', async () => {
    await userBuilder().insert()
    const user = await userBuilder().insert()

    const expected: ExpectType = {
      data: {
        users: [user]
      },
      errors: null
    }

    const resp = await app.inject({
      method: 'GET',
      url: BASE_URL,
      query: { name: user.name}
    })

    expect(resp.statusCode).toBe(StatusCodes.OK)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test.each([
    'asd4', '4asd',
    'as4d', '@asd', 
    '*', '123',
    '(asd)', '[asd]'
  ])('GET / Deve retornar status BAD_REQUEST ao passar quary inválida: %s', async (queryParam) => {

    const expected: ExpectType = {
      data: null,
      errors: ['querystring/name must match pattern "^((?!d)[a-zA-Zs]+)*$"']
    }

    const resp = await app.inject({
      method: 'GET',
      url: BASE_URL,
      query: { name: queryParam }
    })

    expect(resp.statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

})
