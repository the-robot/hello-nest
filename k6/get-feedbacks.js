import http from 'k6/http'
import { check, sleep } from 'k6'

// Load environment variables from .env
const api = __ENV.API || process.env.API || 'http://localhost:3000'

// normal load
export const options = {
  stages: [
    { duration: '5s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '5s', target: 0 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 5%
    http_req_duration: ['p(95)<60'], // 99% of requests should be below 40ms
  },
}

// high load
// export const options = {
//   stages: [
//     { duration: '5s', target: 100 },
//     { duration: '1m', target: 100 },
//     { duration: '5s', target: 0 },
//     { duration: '20s', target: 0 },
//   ],
//   thresholds: {
//     http_req_failed: ['rate<0.01'], // http errors should be less than 5%
//     http_req_duration: ['p(95)<60'], // 99% of requests should be below 40ms
//   },
// }

export default function () {
  let res = http.get(`${api}/feedback?page=1`)

  // Check if request was successful
  check(res, {
    'status is 200': (r) => r.status === 200,
  })

  sleep(1)
}
