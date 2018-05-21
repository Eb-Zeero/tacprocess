import { isLongTermProposal, isNewProposal } from '../../util/proposal'
import { getTechReportFields } from '../../util/index'

export function tacComments (comment) {
	let tacComment = {}
	comment.forEach( c => {
		if ( c.partner ){
			if ( c.partner.code ) {
				if ( c.partner.code !== '' ){
					tacComment = {
						...tacComment,
						[ c.partner.code ]: c.comment
					}
				}
			}
		}
	})
	return tacComment
}

function techReviews(technicalReview) {
	
	return ( technicalReview || [] ).reduce((prev, tr) => ({
		...prev,
		[ tr.semester ]: {
			reviewer: tr.reviewer,
			...getTechReportFields(tr.report)
		}
	}), {})
}

function allocatedTime(timeAllocations){
	return timeAllocations.reduce((prev, allocation) => ({
		...prev,
		[ allocation.partner.code ]: {
			p0: allocation.p0,
			p1: allocation.p1,
			p2: allocation.p2,
			p3: allocation.p3,
			p4: allocation.p4,
		}
	}), {})
}

function totalRequested(timeRequirements, semester){
	let total = 0
	timeRequirements.forEach( requirement => {
		if (requirement.semester === semester ){
			requirement.timeRequests.forEach( time => { total += parseFloat(time.time) }
			)
		}
	})
	return total
}

const minimumRequestedTime = (timeRequirements, semester) => {
	let minimum = null
	timeRequirements.forEach( requirement => {
		if (requirement.semester === semester){
			minimum = requirement.minimumUsefulTime
		}
	})
	return minimum
}

function requestedTime(timeRequirements, semester) {
	let reqTime = {	}
	timeRequirements.forEach(requirements => {
		if (requirements.semester === semester) {
			reqTime = requirements.timeRequests.map(time => ({
				...reqTime,
				[ time.partner.code ]: time.time
			}))
		}
	})
	return reqTime
}

export function convertProposals(proposals, semester, partner){
	if (!proposals.proposals){ return []}
	return ( proposals.proposals || [] ).map( proposal => ({
			proposalCode: proposal.code,
			title: proposal.title,
			abstract: proposal.abstract,
			isP4: proposal.isP4,
			status: proposal.status,
			isTargetOfOpportunity: proposal.isTargetOfOpportunity,
			maxSeeing: proposal.maxSeeing,
			transparency: proposal.transparency,
			isNew: isNewProposal(proposal, semester),
			isLong: isLongTermProposal(proposal, semester),
			isThesis: proposal.isThesis,
			totalRequestedTime: totalRequested(proposal.timeRequirements, semester),
			minTime: minimumRequestedTime(proposal.timeRequests, semester),
			instruments: proposal.instruments,
			principalInvestigator: `${ proposal.principalInvestigator.lastName } ${ proposal.principalInvestigator.firstName }`,
			liaisonAstronomer: proposal.liaisonSaltAstronomer ? proposal.liaisonSaltAstronomer.username : null,
			techReviews: techReviews(proposal.techReviews),
			allocatedTime: allocatedTime(proposal.allocatedTime, partner),
			tacComment: tacComments(proposal.tacComment),
			requestedTime: requestedTime(proposal.timeRequests, semester)
		}))
}
