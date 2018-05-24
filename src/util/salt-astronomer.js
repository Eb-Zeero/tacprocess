/**
 * It get a salt astronomer name from the list of astronomers that match salt astronomer username or none
 * @params username
 * @params SALTAstronomers
 * @return name
 * */
export const getSaltAstronomerName = (username, SALTAstronomers) => {
  if ( !username ) return null
  const name = (SALTAstronomers || []).find(a =>  a.username === username )
  return name ? name.firstName : null
}

/**
 * It get a salt astronomer username from the list of astronomers that match salt astronomer firstName or none
 * @params firstName
 * @params SALTAstronomers
 * @return firstName
 * */
export const getSaltAstronomerUsername = (firstName, SALTAstronomers) => {
  if ( !firstName ) return null
  const username = (SALTAstronomers || []).find(a =>  a.firstName === firstName )
  return username ? username.username : null
}

/**
 * method used for sorting Salt Astronomers by firstName
 * */
export const compareByFirstName = (a, b) => {
  const name1 = a.firstName.toUpperCase()
  const name2 = b.firstName.toUpperCase()
  if (name1 < name2) {
    return -1
  }
  if (name1 > name2) {
    return 1
  }
  return 0
}

/**
 * This method checks if the proposal has a liaison astronomer
 *
 * @param proposal
 * @return boolean
* */
export const hasLiaison = (proposal) => {

  if (proposal.initialState){
    if (!proposal.initialState.liaisonAstronomer || proposal.initialState.liaisonAstronomer === '') {
      return false
    }
    return !!proposal.liaisonAstronomer
  }
  return false
}
