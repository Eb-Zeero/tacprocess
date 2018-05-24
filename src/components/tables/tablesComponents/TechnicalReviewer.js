import React from 'react'
import propTypes from 'prop-types'

import { isAdministrator } from '../../../util'

const astronomerName = (username, astronomers) => {
	const name = (astronomers).find(a => a.username === username)
	return name ? name.firstName : username
}

const showNone = (proposal, semester) =>  {
	if( proposal.technicalReport){
		if ( proposal.technicalReport.initialState) {
			if ( proposal.technicalReport.initialState[ semester ]) {
				return !proposal.technicalReport.initialState[ semester ].reviewer.username
			}
		}
	}
	return true
}

const TechnicalReviewer = ({ proposal,  astronomers, user, semester, isPastSemester, technicalReviewerChange }) => <td className='width-200'>
		{
			isAdministrator ?
				<select disabled={ isPastSemester }
								value={ user.username || '' }
								onChange={ e => {
									technicalReviewerChange(proposal.proposalCode, e.target.value)
								} }
				>
					{showNone(proposal, semester) && <option value=''>none</option>}
					{
						astronomers.map(
							astronomer => (
								<option
									key={ astronomer.username }
									value={ astronomer.username }
								>
									{astronomerName(astronomer.username, astronomers)}
								</option>
							))
					}
				</select>
				:
				<div>
					<input
						disabled={ isPastSemester || !showNone(proposal.proposalCode, semester) }
						type='checkbox'
						checked={ !this.showChecked(proposal.proposalCode, semester) }
						value={ user.username }
						onChange={ e => {
							technicalReviewerChange(proposal.proposalCode, e.target.value)
						} }/>
					{!proposal.techReviews[ semester ].reviewer.username
						?
						<label>Assign Yourself</label>:<label>{user.firstName}</label>}
				</div>
		}
	</td>
TechnicalReviewer.propTypes = {
	astronomers: propTypes.array.isRequired,
	proposal: propTypes.object.isRequired,
	user: propTypes.object.isRequired,
	semester: propTypes.string.isRequired,
	technicalReviewerChange: propTypes.func.isRequired,
	isPastSemester: propTypes.bool.isRequired,
}
export default  TechnicalReviewer