import app from "../../../app"


describe('User', () => {
  afterEach(async () => {
    await app.close()
  })

  test('GET', async () => {

    const rs = await app.inject({
      method: 'GET',
      url: 'v1/user'
    })
    
    expect(rs.statusCode).toBe(200)
    expect(rs.json()).toEqual({data: {
      name: 'saller'
    }})
  })
})
