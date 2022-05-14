import axios from 'axios'

export default function CheckUserLoggedIn() {
  const { data } = axios.get('http://ec2-3-17-138-220.us-east-2.compute.amazonaws.com:5000/api/auth/checkauthstatus')
  return data.isLoggedIn
}