import { queryTargets } from '../api/graphQL'
import {
  FETCH_TARGETS_START,
  FETCH_TARGETS_PASS,
  FETCH_TARGETS_FAIL,
} from '../types'

function startFetchTargets() {
  return (
    {
      type: FETCH_TARGETS_START
    }
  )

}
function fetchTargetsFail(error) {
  return (
    {
      type: FETCH_TARGETS_FAIL,
      payload: { error }
    }
  )
}

export function fetchTargetsPass(targets) {
  return (
    {
      type: FETCH_TARGETS_PASS,
      payload: targets
    }
  )
}

export default function fetchTargets(semester, partner='All'){
  return function disp(dispatch){
    dispatch(startFetchTargets())
    queryTargets(semester, partner).then( targets =>
    {
      dispatch(fetchTargetsPass(targets))
    }
    ).catch((e) => {
      dispatch(fetchTargetsFail(e.message))})
  }
}
