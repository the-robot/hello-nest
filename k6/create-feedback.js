import http from 'k6/http'
import { check, sleep } from 'k6'

// Load environment variables from .env
const secret = __ENV.AUTH_SECRET || process.env.AUTH_SECRET || 'default_secret'
const api = __ENV.API || process.env.API || 'http://localhost:3000'

// stress test (normal load)
export const options = {
  stages: [
    { duration: '5s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '5s', target: 0 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'], // http errors should be less than 5%
    http_req_duration: ['p(95)<10000'], // 99% of requests should be below 10s
  },
}

// stress test (50% higher load)
// export const options = {
//   stages: [
//     { duration: '5s', target: 30 },
//     { duration: '1m', target: 30 },
//     { duration: '5s', target: 0 },
//     { duration: '20s', target: 0 },
//   ],
//   thresholds: {
//     http_req_failed: ['rate<0.05'], // http errors should be less than 5%
//     http_req_duration: ['p(95)<10000'], // 99% of requests should be below 10s
//   },
// }

// stress test (much higher load)
// export const options = {
//   stages: [
//     { duration: '5s', target: 60 },
//     { duration: '1m', target: 60 },
//     { duration: '5s', target: 0 },
//     { duration: '20s', target: 0 },
//   ],
//   thresholds: {
//     http_req_failed: ['rate<0.05'], // http errors should be less than 5%
//     http_req_duration: ['p(95)<10000'], // 99% of requests should be below 10s
//   },
// }

// spike test
// export const options = {
//   stages: [
//     { duration: '5s', target: 240 },
//     { duration: '1m', target: 240 },
//     { duration: '5s', target: 0 },
//     { duration: '20s', target: 0 },
//   ],
// }

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
