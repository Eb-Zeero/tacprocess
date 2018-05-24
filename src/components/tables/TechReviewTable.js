import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
// import {canAssignOtherReviewer, currentSemester, downloadSummary, isAdministrator} from '../../util'
// import { getTechnicalReport } from '../../util/technicalReports'
import { compareByProposalCode } from '../../util/proposal'
// import { compareByFirstName } from '../../util/salt-astronomer'
import TechnicalReviewRow from './tablesComponents/TechnicalReviewRow'
import {getTechnicalReport} from '../../util/technicalReports'
//
// function getReviewer(proposal, semester){
// 	const review = proposal.techReviews[ semester ]
// 	return review ? review.reviewer.username : null
// }
//
// export default class TechReviewTable extends React.Component {
// 	techReportChange = (proposalCode, prevTechReport, field, value, reviewer) => {
// 		this.props.onTechReviewChange(proposalCode,
// 			{
// 				reviewer: { username: reviewer === null ? this.props.user.username : reviewer },
// 				...prevTechReport,
// 				[ field ]: value
// 			})
// 	};
//
// 	techReviewerChange = (proposalCode, reviewer, techReport) => {
// 		this.props.onTechReviewChange(proposalCode,
// 			{
// 				reviewer: { username: reviewer },
// 				...techReport
// 			})
// 	};
//
// 	disableCheckbox = (proposalCode, reviewer, semester) => this.props.initProposals.some(p => {
// 		if( p.proposalCode === proposalCode){
// 			return p.techReviews[ semester ].reviewer.username === reviewer
// 		}
// 		return false
// 	});
//
// 	showNone = (proposalCode, semester) => this.props.initProposals.some(p => {
// 		if( p.proposalCode === proposalCode){
// 			return !p.techReviews[ semester ].reviewer.username
// 		}
// 		return false
// 	});
//
// 	showChecked = (proposalCode, semester) => this.props.proposals.some(p => {
// 		if( p.proposalCode === proposalCode){
// 			return !p.techReviews[ semester ].reviewer.username
// 		}
// 		return false
// 	});
//
// 	requestSummary = (event, proposalCode, semester) => {
// 		event.preventDefault()
// 		downloadSummary(proposalCode, semester)
// 	};
//
// 	render() {
// 		const { proposals, user, SALTAstronomers, semester } = this.props
// 		if (proposals.length === 0) {
// 			return (<br/>)
// 		}
//
// 		const saltAstronomerName = (username) => {
// 			const name = (SALTAstronomers).find(a => a.username === username)
// 			return name ? name.name : username
// 		}
//
// 		const saltAstronomers = SALTAstronomers.sort(compareByFirstName)
//
// 		const isSaltAstronomer = (username) => saltAstronomers.some(astronomer => astronomer.username === username)
//
// 		const isPastSemester = semester < currentSemester()
//
// 		return (
// 			<div className='SATableDiv'>
// 				<h1>Salt Astronomers Proposal Assigning</h1>
// 				<table className='SATable' align='center'>
// 					<thead>
// 					<tr>
// 						<th>Proposal Code</th>
// 						<th>Summary</th>
// 						<th>Proposal Title</th>
// 						<th>Proposal Investigator</th>
// 						{semester >= '2018-1' && <th>Feasible</th> }
// 						<th>Proposal Comment</th>
// 						{semester >= '2018-1' && <th>Detailed check</th> }
// 						<th>Reviewed by</th>
// 					</tr>
// 					</thead>
// 					<tbody>
// 					{
// 						proposals.sort(compareByProposalCode).map(p => {
// 							const reviewer = getReviewer(p, semester)
// 							const techReport = getTechnicalReport(p, semester, 'object')
// 							const techReportString = getTechnicalReport(p, semester, 'string')
//
// 							return (
// 								<TechnicalReviewRow
// 									technicalReportString={}
// 									username={}
// 									technicalReviewChange={ technicalReviewChange }
// 									setLiaison={}
// 									requestSummary={}
// 									proposal={}
// 									canAssign={}
// 									astronomers={}
// 									user={}
// 									technicalReport={}
// 									reviewer={}
// 									isPastSemester={}
// 									semester={} />
// 							)
// 						})
// 					}
// 					</tbody>
// 				</table>
// 			</div>
// 		)
// 	};
// }


const TechReviewTable = ({
	proposals,
	isPastSemester,
	technicalReviewChange,
	technicalReviewerChange,
	user,
	astronomers,
	submitTechnicalReviews,
	requestSummary,
	semester
												 }) => (
	<div className='SATableDiv'>
		<h1>Salt Astronomers Liaison Assigning</h1>
		<table className='SATable' align='center'>
			<thead>
			<tr>
				<th>Proposal Code</th>
				<th>Summary</th>
				<th>Proposal Title</th>
				<th>Proposal Investigator</th>
				{ !isPastSemester && <th>Feasible</th> }
				<th>Proposal Comment</th>
				{ !isPastSemester && <th>Detailed check</th> }
				<th>Reviewed by</th>
			</tr>
			</thead>
			<tbody>
			{
				proposals.sort(compareByProposalCode).map(proposal => {
					const techReview = getTechnicalReport(proposal, semester, 'object')
					return (
						<TechnicalReviewRow
							key={ `technical-${ proposal.proposalCode }` }
							proposal={ proposal }
							technicalReport={ techReview }
							technicalReportString={ getTechnicalReport(proposal, semester, 'string') }
							technicalReviewChange={ technicalReviewChange }
							technicalReviewerChange={ technicalReviewerChange }
							astronomers={ astronomers }
							user={ user }
							requestSummary={ requestSummary }
							submitTechnicalReviews={ submitTechnicalReviews }
							isPastSemester={ isPastSemester }
							semester={ semester }
						/>
				)})
			}
			
			</tbody>
		</table>
	</div>
)
TechReviewTable.propTypes = {
	proposals: propTypes.array.isRequired,
	user: propTypes.object.isRequired,
	astronomers: propTypes.array.isRequired,
	technicalReviewChange: propTypes.func.isRequired,
	technicalReviewerChange: propTypes.func.isRequired,
	requestSummary: propTypes.func.isRequired,
	submitTechnicalReviews: propTypes.func.isRequired,
	isPastSemester: propTypes.bool.isRequired,
	semester: propTypes.string.isRequired,
}

export default  TechReviewTable
