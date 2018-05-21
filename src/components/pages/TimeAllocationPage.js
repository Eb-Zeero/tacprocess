import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CSVReader from 'react-csv-reader'
import { saveAs } from 'file-saver'
import  Papa  from 'papaparse'
import AvailableTimePerPartner from '../tables/statisticsTables/AvailableTimePerPartner'
import ProposalsPerPartner from '../tables/ProposalsPerPartner'
import { getQuaryToAddAllocation } from '../../util/allocation'
import { canUserWriteAllocations, canUserWriteTechReviews, downloadSummaries, canSubmitTimeAllocations } from '../../util'
import PartnerProposals  from '../../util/proposal'
import { submitAllocations } from '../../api/graphQL'
import { updateProposals } from '../../actions/proposalsActions'
import { startSubmittingTimeAllocations, TimeAllocationSubmittedSuccessfully, failToSubmitTimeAllocations } from '../../actions/timeAllocationActions'
import { ALL_PARTNER } from '../../types'
import { getPartnerList, listForDropdown } from '../../util/filters'
import { checkColumns, getIndexOfColumns, updateProposalFromCSV } from '../../util/uploadCsv'
import {updateTacComment, updateAllocatedTimePriority} from '../../actions/TimeAllocationsActions'
import { getTechnicalReport } from '../../util/technicalReports'


class TimeAllocationPage extends React.Component {

	submitForPartner(event, partner) {
		const { proposals, user, dispatch, semester } = this.props
		const ppp = PartnerProposals(proposals.proposals, getPartnerList(user.roles), semester)

		const query = getQuaryToAddAllocation(ppp[ partner ],
			partner,
			semester
		)
		dispatch(startSubmittingTimeAllocations(partner))
		submitAllocations(query)
		.then(d => { // eslint-disable-next-line
			d.data.data.updateTimeAllocations.success ?
					dispatch(TimeAllocationSubmittedSuccessfully(partner))
					: dispatch(failToSubmitTimeAllocations(partner, 'Something went pear-shaped...'))
		})
		.catch(dispatch(failToSubmitTimeAllocations(partner, 'Why fail...')))
	}

	allocationChange = (event, proposalCode, priority, partner) => {

		const{ proposals, dispatch }= this.props
		const { value }= event.target
		const updatedProposals = proposals.map(p => {
			if (p.proposalCode === proposalCode) {
				p.allocatedTime[ partner ][ priority ] = value
			}
			return p
		})
		dispatch(updateProposals(updatedProposals))
	}

	allocatedTimeChange = (event, proposalCode, partner) => {
		const { dispatch, semester } = this.props
		const time = event.target.value
		const priority = event.target.name
		dispatch(updateAllocatedTimePriority(proposalCode, semester, partner, time, priority))
	};

	tacCommentChange = (event, proposalCode, partner) => {
		const { dispatch, semester } = this.props
		const tacComment = event.target.value
		dispatch(updateTacComment(proposalCode, semester, partner, tacComment))
	}

	/*
* This method setup the csv file content as it appears in the time allocation page table.
* and returns that data to use in the react-csv Component for downloading.
*/
	CSVData = (proposals, partner, semester) => {
		const tableDataHeaders = [
			'Code', 'Title', 'Abstract', 'PI', 'Semester', 'TAC comment',
			'Minimum useful time (Sec)',
			`Total Requested Time for ${ partner } (Sec)`,
			'Total Requested Time (Sec)',
			'P0', 'P1', 'P2', 'P3', 'P4',
			'Transparency', 'Max seeing', 'Tech Report'
		]
		return [
			tableDataHeaders,
			...proposals.map(p => [
				p.proposalCode,
				p.title,
				p.abstract,
				p.pi,
				semester,
				p.tacComment[ partner ]? p.tacComment[ partner ].comment : '',
				p.minTime,
				p.requestedTime.requests[ partner ],
				p.totalRequestedTime,
				p.allocatedTime[ partner ] ? p.allocatedTime[ partner ].p0 : 0,
				p.allocatedTime[ partner ] ? p.allocatedTime[ partner ].p1 : 0,
				p.allocatedTime[ partner ] ? p.allocatedTime[ partner ].p2 : 0,
				p.allocatedTime[ partner ] ? p.allocatedTime[ partner ].p3 : 0,
				p.allocatedTime[ partner ] ? p.allocatedTime[ partner ].p4 : 0,
				p.transparency, p.maxSeeing, getTechnicalReport(p, this.props.semester)
			])
		]
	};

	downloadCSV = (proposals, partner) => {
		const data = this.CSVData(proposals, partner, this.props.semester)
		const columns = data[ 0 ]
		const rows = data.slice(1)
		const csv = Papa.unparse({fields: columns, data: rows})

		const blob = new Blob([csv], { type: 'text/csv' })
		saveAs(blob, `${ partner }-time-allocations.csv`)

	};

	updateFromCSV = (data, proposals, partner) => {
		const { dispatch } = this.props
		let allColumns = false
		let columnIndex = {}
		let updatedProposals = proposals;
		(data || []).forEach( (r, i) => {
			if (i === 0) {
				allColumns = checkColumns(r)
				if (allColumns){
					columnIndex = getIndexOfColumns(r)
				}
			} else if(allColumns){
				updatedProposals = updateProposalFromCSV(proposals, partner, r, columnIndex)
			}
		})
		dispatch(updateProposals(updatedProposals))
	};

	handleDarkSideForce = (data, proposals, partner) => {
		console.log(partner, data, proposals)
	};

	render() {
		const { allocatedTime, filters, user, tac, semester } = this.props
		const { submittedTimeAllocations } = this.props.proposals
		const proposals = this.props.proposals.proposals || []
		const { roles } = user
		let partners = listForDropdown(getPartnerList(roles || []))

		if (filters.selectedPartner !== ALL_PARTNER) {
			partners = filters.selectedPartner ? [{value: filters.selectedPartner, label: filters.selectedPartner}] : []
		}
		const partnerProposals = PartnerProposals(proposals, getPartnerList(roles || []), semester)

		return (
			<div>
				{
					tac.submiting ? (<div><h1>Submitting...</h1></div>) : partners.map(part => {
						const partner = part.value

						if (partner === ALL_PARTNER){
							return null
						}
						if ((partnerProposals[ partner ] || []).length === 0){
							return null
						}

						return (
							<div key={ partner }  style={ {paddingBottom:'40px'} }>
								<div className='stat-wrapper-center'>
									<AvailableTimePerPartner
										proposals={ partnerProposals[ partner ] || [] }
										partner={ partner }
										availableTime={ allocatedTime }
									/>
								</div>
								<ProposalsPerPartner
									proposals={ partnerProposals[ partner ] || [] }
									partner={ partner }
									semester={ semester }
									tacCommentChange={ this.tacCommentChange }
									allocationChange={ this.allocationChange }
									canAllocate={ canUserWriteAllocations(roles, partner) || false }
									canComment={ canUserWriteTechReviews(roles, partner) || false }
									submitted={ tac }
									allocatedTimeChange = { this.allocatedTimeChange }
									updateFromCSV = { this.updateFromCSV }
								/>
								<label>Download table</label><br/>
								<button className='btn'
								        onClick={ () => { this.downloadCSV(partnerProposals[ partner ] || [], partner) } }>
									Download as CSV
								</button>
								{
									canSubmitTimeAllocations(roles, partner) &&
									<label><br/>Upload Allocations from CSV<br/></label>
								}
								{
									canSubmitTimeAllocations(roles, partner) && <CSVReader
										cssClass='btn'
										onFileLoaded={ e => this.updateFromCSV(e, partnerProposals[ partner ] || [], partner) }
										onError={ this.handleDarkSideForce }
									/>
								}

								<button onClick={ () => downloadSummaries(partnerProposals[ partner ] || [], semester, partner) }>
									Download summary files
								</button>
								{
									canSubmitTimeAllocations(roles, partner) &&
									<button
										disabled={ semester < '2018-1' }
										className='btn-success'
										onClick={ e => this.submitForPartner(e, partner) }>Submit {partner}</button>
								}
								{ // eslint-disable-next-line
									submittedTimeAllocations.partner !== partner ? <div />
										: submittedTimeAllocations.results ? <div style={ {color: '#60FF60', fontSize: '20px'} }>Successfully Submitted</div>
											: <div style={ { color: '#FF6060', 'fontSize': '20px' } }>
												<p>Time allocations <strong>not</strong> submitted.</p>
												<p>Please check for missing or invalid values.</p>
											</div>

								}

							</div>
						)
					})
				}

			</div>
		)
	}
}
TimeAllocationPage.propTypes = {
	proposals: PropTypes.array.isRequired,
	filters: PropTypes.array.isRequired,
	allocatedTime: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	tac: PropTypes.object.isRequired,
	semester: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired
}

export default connect(
	store => ({
		tac: store.tac,
		allocatedTime:store.tac.data,
		proposals: store.proposals,
		filters: store.filters,
		user: store.user.user,
		semester: store.filters.selectedSemester,
	}),null
)(TimeAllocationPage)
