const mockResponse = {
  data: {
    results: [
      {
        name: {
          first: 'Leith',
          last: 'Harb'
        },
        picture: {
          large: 'https://randomuser.me/api/portraits/women/21.jpg'
        },
        login: {
          username: 'ThePhonyGOAT'
        }
      }
    ]
  }
}

export default {
  get: jest.fn().mockResolvedValue(mockResponse)
}
