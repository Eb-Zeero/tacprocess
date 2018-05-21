import { ALL_PARTNER, FETCHED_DATA, FETCHING_DATA_FAIL, FETCHING_DATA } from '../types'
import { fetchAllocationsPass } from './timeAllocationActions'
import { fetchTargetsPass } from './targetsActions'
import { fetchProposalsPass } from './proposalsActions'
import { fetchSAPass } from './saltAstronomerActions'
import {
  convertUserData,
  queryPartnerAllocations,
  queryProposals,
  querySALTAstronomers, querySaltUsers, queryTacMembers,
  queryTargets,
  queryUserData
} from '../api/graphQL'
import { userLoggedIn, partnersFilter } from './auth'
import { fetchSaltUsersPass, fetchTacMembersPass } from './AdminActions'

export const fetchingAllData = () => ({
  type: FETCHING_DATA,
})

export const fetchedAllData = () => ({
  type: FETCHED_DATA,
})

export const fetchedAllDataFail = (message) => ({
  type: FETCHING_DATA_FAIL,
  payload: {
    error: message
  }
})

/**
 * this method fetch and dispatch all the dataStatus needed on the tac pages
 * dataStatus include:
 *  proposals, targets, user, salt astronomers, partners allocated times, tac members of all partners
 *  and all salt users
 *  @param semester
 *  @param partner
 * */
export function fetchAllData(semester, partner){
  return async (dispatch) => {
    dispatch(fetchingAllData())
    try {
      const saltAstronomers = querySALTAstronomers()
      const user = queryUserData()
      const proposals = queryProposals(semester, partner)
      const targets = queryTargets(semester, partner)
      const allocations = queryPartnerAllocations(semester, partner)
      const tacMembers = queryTacMembers()
      const saltUsers = querySaltUsers()
      await Promise.all([saltAstronomers, user, proposals, targets, allocations, tacMembers, saltUsers])
        .then(data => {
          dispatch(fetchSAPass(data[ 0 ]))
          dispatch(userLoggedIn(convertUserData(data[ 1 ].data.data.user)))
          dispatch(partnersFilter(ALL_PARTNER))
          dispatch(fetchProposalsPass(data[ 2 ]))
          dispatch(fetchTargetsPass(data[ 3 ]))
          dispatch(fetchAllocationsPass(data[ 4 ]))
          dispatch(fetchTacMembersPass(data[ 5 ]))
          dispatch(fetchSaltUsersPass(data[ 6 ]))
        })

    }catch (e) {
      dispatch(fetchedAllDataFail(e.message))
      return
    }
    dispatch(fetchedAllData())
  }
}
