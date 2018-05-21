import { queryPartnerAllocations } from '../api/graphQL'
import { TIME_ALLOCATIONS_QUERY_START,
  TIME_ALLOCATIONS_QUERY_FAIL,
  TIME_ALLOCATIONS_QUERY_PASS,
  SUBMIT_TIME_ALLOCATIONS_START,
  SUBMIT_TIME_ALLOCATIONS_PASS,
  SUBMIT_TIME_ALLOCATIONS_FAIL,
  ADD_NEW_MEMBER,
  REMOVE_MEMBER
} from '../types'

const fetchAllocationsStart = () => ({
  type: TIME_ALLOCATIONS_QUERY_START
})

const fetchAllocationFail = (error) => ({
  type: TIME_ALLOCATIONS_QUERY_FAIL,
  payload: { error }
})

export const fetchAllocationsPass = data => ({
  type: TIME_ALLOCATIONS_QUERY_PASS,
  timeallocation: data
})

export const startSubmittingTimeAllocations = () => ({
  type: SUBMIT_TIME_ALLOCATIONS_START,

})

export const TimeAllocationSubmittedSuccessfully = partner => ({
  type: SUBMIT_TIME_ALLOCATIONS_PASS,
  payload: { partner }
})

export const failToSubmitTimeAllocations = (partner, error) => ({
  type: SUBMIT_TIME_ALLOCATIONS_FAIL,
  payload: {
    partner,
    error }
})

export const addNewMember = (member, partner) => ({
  type: ADD_NEW_MEMBER,
  payload: {
    member: { ...member, isTacChair: false },
    partner
  }
})
export const removeMember = (member, partner) => ({
  type: REMOVE_MEMBER,
  payload: {
    member,
    partner }
})

export const fetchPartnerAllocations = (semester, partner='All') => function fits(dispatch) {
  dispatch(fetchAllocationsStart())
  queryPartnerAllocations(semester, partner).then( allocations => {
    dispatch(fetchAllocationsPass(allocations))
  }).catch((e) => {
		dispatch(fetchAllocationFail(e.message))
	})

}
