import http from 'k6/http'
import { check, sleep } from 'k6'

// Load environment variables from .env
const secret = __ENV.AUTH_SECRET || process.env.AUTH_SECRET || 'default_secret'
const api = __ENV.API || process.env.API || 'http://localhost:3000'

// stress test
// export const options = {
//   stages: [
//     { duration: '30s', target: 200 },
//     { duration: '3m', target: 200 },
//     { duration: '30s', target: 0 },
//   ],
// };

// spike test
export const options = {
  stages: [
    { duration: '30s', target: 1500 },
    { duration: '3m', target: 1500 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  // Generate random data
  let title = generateRandomString(10)
  let message = generateRandomString(50)
  let contactEmail = generateRandomEmail()

  // Prepare payload
  let payload = {
    title,
    message,
    contactEmail,
    _secret: secret,
  }

  // Send POST request
  let res = http.post(`${api}/feedback`, JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Check if request was successful
  check(res, {
    'status is 201': (r) => r.status === 201,
  })

  sleep(1)
}

function generateRandomString(length) {
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return result
}

function generateRandomEmail() {
  let username = generateRandomString(8)
  let domain = generateRandomString(5) + '.com'
  return `${username}@${domain}`
}
