import React from 'react'
import propTypes from 'prop-types'
import {didReportChange} from '../../../util/proposal'
import TechnicalReviewer from './TechnicalReviewer'

const TechnicalReviewRow = ({
															proposal,
															user,
															requestSummary,
															semester,
															astronomers,
															isPastSemester,
															technicalReport,
															technicalReviewChange,
															technicalReviewerChange,
															technicalReportString
}) => (
	<tr>
		<td>
			<a target='_blank'
				 href={ `https://www.salt.ac.za/wm/proposal/${ proposal.proposalCode }` }>
				{proposal.proposalCode}
			</a>
		</td>
		<td className='width-100'>
			<a className='file-download'
				 href=''
				 onClick={ () => requestSummary(proposal.proposalCode) }>
				Download
			</a>
		</td>
		<td className=' table-height width-400'>{proposal.title}</td>
		<td className='width-100'>{proposal.principalInvestigator}</td>
		{
			!isPastSemester && <td>
				<select
					defaultValue={ technicalReport.feasible }
					onChange={ e =>
						technicalReviewChange(proposal.proposalCode, 'feasible', e.target.value )
					}
				>
					<option value={ null }>none</option>
					<option value='yes'>yes</option>
					<option value='yes with caveats'>yes with caveats</option>
					<option value='no'>no</option>
				</select>
			</td>
		}
		<td className='width-100'>
      <textarea
				key={ `tr ${ proposal.proposalCode }` }
				disabled={ isPastSemester }
				className='table-height-fixed width-400'
				value={
					!isPastSemester
						? technicalReport.comment || ''
						: technicalReportString
				}
				onChange={ e =>	technicalReviewChange(proposal.proposalCode, 'comment', e) }
			/>
			{(didReportChange(proposal, semester) && !technicalReport.reviewer) &&
			<p style={ { color: '#b7a201', textAlign: 'center' } }>A reviewer must be assigned to the technical review.</p>}
		</td>
		{
			!isPastSemester && <td className='width-100'>
				<select
					defaultValue={ technicalReport.details }
					onChange={
						e => {
							technicalReviewChange(proposal.proposalCode, 'details', e.target.value)
						}
					}
					disabled={ isPastSemester }
				>
					<option>none</option>
					<option>yes</option>
					<option>no</option>
				</select>
			</td>
		}
		<TechnicalReviewer
			proposal={ proposal }
			user={ user }
			technicalReport={ technicalReport }
			reviewer={ technicalReport.reviewer }
			semester={ semester }
			isPastSemester={ isPastSemester }
			technicalReviewerChange={ technicalReviewerChange }
			astronomers={ astronomers }
			/>
	</tr>
)

// proposal={ proposal }
// technicalReviewChange={ technicalReviewChange }
// technicalReviewerChange={ technicalReviewerChange }
// astronomers={ astronomers }
// user={ user }
// requestSummary={ requestSummary }
// submitTechnicalReviews={ submitTechnicalReviews }
// isPastSemester={ isPastSemester }

TechnicalReviewRow.propTypes = {
	proposal: propTypes.object.isRequired,
	user: propTypes.object.isRequired,
	astronomers: propTypes.array.isRequired,
	requestSummary: propTypes.func.isRequired,
	technicalReviewChange: propTypes.func.isRequired,
	technicalReviewerChange: propTypes.func.isRequired,
	semester: propTypes.string.isRequired,
	technicalReport: propTypes.object.isRequired,
	technicalReportString: propTypes.string.isRequired,
	isPastSemester: propTypes.bool.isRequired,
}
export default TechnicalReviewRow
