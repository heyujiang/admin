import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ChatEnKey = 'ChatEndata'
const options = {
  secure: true,
  sameSite: 'none'
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setTokenw7(token) {
  return Cookies.set(TokenKey, token, options)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getChatEn() {
  return Cookies.getJSON(ChatEnKey)
}

export function setChatEn(data) {
  return Cookies.set(ChatEnKey, data)
}

export function removeChatEn() {
  return Cookies.remove(ChatEnKey)
}
