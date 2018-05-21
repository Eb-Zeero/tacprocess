import { graphqlClient } from './index'
import { removeToken } from '../util/storage'
import { convertProposals } from './converters/proposal'
import convertSaltAstronomer from './converters/saltAstronomer'
import convertTargets from './converters/target'
import convertPartnerAllocations from './converters/partner'
import { convertTacUsers, convertUsers } from './converters/user'

export const convertUserData = rowUser => ({
  firstName: rowUser.firstName,
  lastName: rowUser.lastName,
  email: rowUser.email,
  username: rowUser.username,
  roles:rowUser.role
})

export function queryPartnerAllocations(semester, partner='All' ){
  /**
	 * This method is only called by pages that will need and allocated time
	 * for partner at semester
	 *
	 * @params semester like "2017-1" type String
	 * @params partner is a partner code as it will be shown on partner filter
	 * @return GQL results of the below query
	 */
  let par = ''
  if ( partner !== 'All' ) {
    par = ` , partnerCode:"${ partner }"`
  }
	
  const query = `
{
  partnerAllocations(semester:"2018-1" ${ par }){
    code
    timeAllocation{
      allocatedTime {
        p0Andp1
        p2
        p3
      }
    }
  }
}
  `
  return graphqlClient().post('/graphql', { query })
    .then(response => convertPartnerAllocations(response.data.data.partnerAllocations))
    .catch(e => e.response)
}

export function queryUserData(){
  const query = `{
    user{
      lastName
      firstName
      email
      username
      role{
        type
        partners
      }
    }
  }`
  return graphqlClient().post('/graphql', { query })
    .then( response =>  response)
    .catch(e => {
      if (e.response.status === 401 ){
    		removeToken()
    	}
    	return e.response})
}

export function queryTargets(semester, partner){
  let par = ''
  if ( partner !== 'All' ) {
    par = ` , partnerCode:"${ partner }"`
  }
  const query = `
{
  targets(semester:"${ semester }", ${ par }) {
    id
    isOptional
    position {
      ra
      dec
    }
  }
}`
  return graphqlClient().post('/graphql', { query })
    .then( response => convertTargets(response.data.data.targets ))
    .catch(e => e.response)
}

export function queryProposals(semester, partner){
  let par = ''
  if ( partner && partner !== 'All' ) {
    par = ` , partnerCode:"${ partner }"`
  } else{
    par = ''
  }
	
  const query = `
  {
    proposals(semester: "${ semester }",${ par } ){
      code
      title
      abstract
      techReviews{
        semester
        reviewer{
          username
        }
        report
      }
      isP4
      isThesis
      status
      isTargetOfOpportunity
      transparency
      maxSeeing
      instruments{
      	type
        ...on RSS {
          mode
          detectorMode
        }
        ...on HRS{
          detectorMode
        }
       ...on BVIT{
          type
        }
        ...on SCAM{
          detectorMode
        }
      }
      timeRequirements{
        semester
        timeRequests{
          partner{
            code
          }
          time
        }
      }
      principalInvestigator{
        firstName
        lastName
        username
      }
      liaisonSaltAstronomer{
        firstName
        username
        lastName
        email
      }
      allocatedTime{
        partner{
          code
        }
        p0
        p1
        p2
        p3
        p4
      }
      tacComment{
        partner{
          code
        }
        comment
      }
    }
  }
  `
  return graphqlClient().post('/graphql', { query })
    .then(
      response => convertProposals(response.data.data, semester, partner)
    ).catch(e => e.response)
}

export const  submitAllocations = (query) =>  graphqlClient().post('/graphql', { query }).then(response => response)

export function querySALTAstronomers(){
  const query=`
{
  saltAstronomers{
    firstName
    username
    lastName
  }
}
  `
  return graphqlClient().post('/graphql', { query })
    .then(response => convertSaltAstronomer(response.data.data.saltAstronomers)).catch(e => e.response)
}

export const queryTacMembers = () => {
  const query = `
{
	tacMembers {
		lastName
		firstName
		partner {
		  code
		}
		username
		isChair
	}
}
	`
  return graphqlClient().post('/graphql', { query })
    .then( response => convertTacUsers(response.data.data.tacMembers)).catch(e => e.response)
}

export const querySaltUsers = () => {
  const query = `
{
  saltUsers{
		lastName
		firstName
		username
	}
}
	`
  return graphqlClient().post('/graphql', { query })
    .then( response => convertUsers(response.data.data.saltUsers)).catch(e => e.response)
}
