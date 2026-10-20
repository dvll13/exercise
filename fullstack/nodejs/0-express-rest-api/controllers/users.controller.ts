import usersService from '../services/users.service.ts'

const register = (req, res, next) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }
}
