export async function fetchAvailablePlaces() {
  // fetch('http://localhost:3000/places')
  //   .then((response) => response.json())
  //   .then((resData) => setAvailablePlaces(resData.places))
  //   .catch((e) => console.error(e))

  const response = await fetch('http://localhost:3000/places')
  const resData = await response.json()

  if (!response.ok) {
    // 400, 500
    throw new Error('Failed to fetch places')
  }
  // else {
  //   // 200, 300
  // }

  return resData.places
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places')
  const resData = await response.json()

  if (!response.ok) {
    throw new Error('Failed to fetch places')
  }

  return resData.places
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      // to inform the BE that the sent data is in a json format
      'Content-Type': 'application/json',
    },
  })
  const resData = await response.json()

  if (!response.ok) {
    throw new Error('Failed to update user data.')
  }

  return resData.message
}
