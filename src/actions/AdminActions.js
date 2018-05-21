import { querySaltUsers, queryTacMembers } from '../api/graphQL'
import {
  FAIL_TO_GET_SALT_USERS,
  FAIL_TO_GET_TAC_MEMBERS,
  SALT_USERS_QUERY_PASS,
  TAC_MEMBERS_QUERY_PASS,
  FETCHING_SALT_USERS_START,
  FETCHING_TAC_MEMBERS_START
} from '../types'

const failToGetSaltUsers = () => ({
  type: FAIL_TO_GET_SALT_USERS
})
const failToGetTacMembers = () => ({
  type: FAIL_TO_GET_TAC_MEMBERS
})

export const fetchSaltUsersPass = (users) => ({
  type: SALT_USERS_QUERY_PASS,
  payload: users
})
export const fetchTacMembersPass = (tacs) => ({
  type: TAC_MEMBERS_QUERY_PASS,
  payload: tacs
})

const fetchingSaltUsersStart = () => ({
  type: FETCHING_SALT_USERS_START
})
const fetchingTacMembersStart = () => ({
  type: FETCHING_TAC_MEMBERS_START
})

export function fetchSaltUsers(){
  return function disp(dispatch){
    dispatch(fetchingSaltUsersStart())
    querySaltUsers().then( tacs =>
    {
      dispatch(fetchSaltUsersPass(tacs))
    }).catch((e) => {
			dispatch(failToGetSaltUsers(e.message))})
  }
}

export function fetchTacMembers(){
  return function disp(dispatch){
    dispatch(fetchingTacMembersStart())
    queryTacMembers().then( tacs =>
    {
      dispatch(fetchTacMembersPass(tacs))
    }).catch((e) => {
      dispatch(failToGetTacMembers(e.message))})
  }
}
