import { faker } from '@faker-js/faker'
import { StatusCodes } from 'http-status-codes'
import app from '~/app'
import userBuilder from '~/infrastructure/builders/user.builder'
import { User, UserPick } from './user.types'

const BASE_URL = '/api/v1/user/'

type ExpectType = { data: { user: User } | { user: UserPick } | { users: User[] } | { id: number } | null, errors: string[] | null}

describe('User', () => {
  test('GET / Deve retornar status NOT_FOUND e sem nenhum dado', async () => {
    const expected: ExpectType = {
      data: null,
      errors: ['No data found'],
    }

    const resp = await app.inject({
      method: 'GET',
      url: BASE_URL,
    })

    expect(resp.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('GET / Deve retornar status OK e com lista de usuários', async () => {
    const user1 = await userBuilder().insert()
    const user2 = await userBuilder().insert()
    const expected: ExpectType = {
      data: {
        users: [user1, user2],
      },
      errors: null,
    }

    const resp = await app.inject({
      method: 'GET',
      url: BASE_URL,
    })

    expect(resp.statusCode).toBe(StatusCodes.OK)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('GET / Deve retornar status OK e com lista de apenas o usuário buscado', async () => {
    await userBuilder().insert()
    const user = await userBuilder().insert()

    const expected: ExpectType = {
      data: {
        users: [user],
      },
      errors: null,
    }

    const resp = await app.inject({
      method: 'GET',
      url: BASE_URL,
      query: { name: user.name },
    })

    expect(resp.statusCode).toBe(StatusCodes.OK)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test.each([
    'asd4', '4asd',
    'as4d', '@asd',
    '*', '123',
    '(asd)', '[asd]',
    'asrr d2d', '3aasd]'
  ])('GET / Deve retornar status BAD_REQUEST ao passar query inválida: %s', async (queryParam) => {
    const expected: ExpectType = {
      data: null,
      errors: ['querystring/name must match pattern "^((?!d)[a-zA-Z\\s]+)*$"'],
    }

    const resp = await app.inject({
      method: 'GET',
      url: BASE_URL,
      query: { name: queryParam },
    })

    expect(resp.statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('POST / Deve criar um usuário e retornar CREATED', async () => {
    const user = userBuilder().create()

    const expected: ExpectType = {
      data: {
        user,
      },
      errors: null,
    }

    const resp = await app.inject({
      method: 'POST',
      url: `${BASE_URL}new`,
      payload: {
        ...user,
      } as UserPick,
    })

    expect(resp.statusCode).toEqual(StatusCodes.CREATED)
    expect(resp.json<ExpectType>()).toEqual(expect.objectContaining({
      ...expected,
      data: {
        user: expect.objectContaining(user),
      },
    }))
  })

  test.each`
  payload                      | message
  ${{ age: 26 }}               | ${'body must have required property \'name\''}
  ${{ name: 'Rodrigo' }}       | ${'body must have required property \'age\''}
  ${{ name: 'Edson', age: -1 }}| ${'body/age must be >= 0'}
  `('POST / Não deve criar usuário e retornar BAD_REQUEST dado o payload: $payload', async ({ payload, message }) => {
    const expected: ExpectType = {
      data: null,
      errors: [message],
    }

    const resp = await app.inject({
      method: 'POST',
      url: `${BASE_URL}new`,
      payload,
    })

    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test.each`
  payload                      | message
  ${{ age: 26 }}               | ${'body must have required property \'name\''}
  ${{ name: 'Rodrigo' }}       | ${'body must have required property \'age\''}
  ${{ name: 'Edson', age: -1 }}| ${'body/age must be >= 0'}
  `('PUT / Não deve atualizar usuário e retornar BAD_REQUEST dado o payload: $payload', async ({ payload, message }) => {
    const expected: ExpectType = {
      data: null,
      errors: [message],
    }

    const resp = await app.inject({
      method: 'PUT',
      url: `${BASE_URL}update`,
      query: { id: '1000' },
      payload,
    })

    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('PUT / Deve atualizar usuário, retornar CREATED e retornar os dados atualizados', async () => {
    const user = await userBuilder().insert()

    const expected: ExpectType = {
      data: {
        user: {
          id: user.id,
          name: user.name,
          age: user.age,
        },
      },
      errors: null,
    }

    const resp = await app.inject({
      method: 'PUT',
      url: `${BASE_URL}update`,
      query: { id: user?.id as unknown as string },
      payload: {
        name: user.name,
        age: user.age,
      } as UserPick,
    })

    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('PUT / Não deve atualizar usuário e retornar BAD_REQUEST', async () => {
    const user = userBuilder().withId(100).create()

    const expected: ExpectType = {
      data: null,
      errors: [`Entity not found with id ${user.id}`],
    }

    const resp = await app.inject({
      method: 'PUT',
      url: `${BASE_URL}update`,
      query: { id: user?.id as unknown as string },
      payload: {
        name: user.name,
        age: user.age,
      } as UserPick,
    })

    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('GET / Deve retornar status OK e apenas o usuário buscado por Id', async () => {
    await userBuilder().insert()
    const user = await userBuilder().insert()

    const expected: ExpectType = {
      data: {
        user,
      },
      errors: null,
    }

    const resp = await app.inject({
      method: 'GET',
      url: `${BASE_URL}${user.id}`,
    })

    expect(resp.statusCode).toBe(StatusCodes.OK)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('GET / Deve retornar status NOT_FOUND e erro de entidade não encontrada pelo Id passado', async () => {
    const Id = faker.datatype.number(55)

    const expected: ExpectType = {
      data: null,
      errors: [`Entity not found with id ${Id}`],
    }

    const resp = await app.inject({
      method: 'GET',
      url: `${BASE_URL}${Id}`,
    })

    expect(resp.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('DELETE / Deve retornar status OK e apenas o usuário buscado por Id', async () => {
    await userBuilder().insert()
    const user = await userBuilder().insert()

    const expected: ExpectType = {
      data: {
        id: Number(user.id),
      },
      errors: null,
    }

    const resp = await app.inject({
      method: 'DELETE',
      url: `${BASE_URL}delete/${user.id}`,
    })

    expect(resp.statusCode).toBe(StatusCodes.OK)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })

  test('DELETE / Deve retornar status NOT_FOUND e erro de entidade não encontrada pelo Id passado', async () => {
    const Id = faker.datatype.number(55)

    const expected: ExpectType = {
      data: null,
      errors: [`Entity not found with id ${Id}`],
    }

    const resp = await app.inject({
      method: 'DELETE',
      url: `${BASE_URL}delete/${Id}`,
    })

    expect(resp.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(resp.json<ExpectType>()).toStrictEqual(expected)
  })
})
