import { querySALTAstronomers } from '../api/graphQL'
import {
  FETCH_SA_START,
  FETCH_SA_PASS,
  FETCH_SA_FAIL
} from '../types'

function startFetchSA() {
  return (
    {
      type: FETCH_SA_START
    }
  )

}
function fetchSAFail(error) {
  return (
    {
      type: FETCH_SA_FAIL,
      payload: { error }
    }
  )
}

export function fetchSAPass(sa) {
  return (
    {
      type: FETCH_SA_PASS,
      payload: sa
    }
  )
}

export default function fetchSA(){
  return function disp(dispatch){
    dispatch(startFetchSA())
    querySALTAstronomers().then( saltAstronomers => {
      dispatch(fetchSAPass(saltAstronomers))
    }).catch ((e) => {
      dispatch(fetchSAFail(e.message))
    })
  }
}
