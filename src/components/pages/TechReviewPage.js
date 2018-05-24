import React from 'react'
import propTypes from 'prop-types'
import TechReviewTable from '../tables/TechReviewTable'
import {currentSemester, defaultSemester} from '../../util'
import SubmissionStatusComponent from '../tables/tablesComponents/SubmissionStatusComponent'
import LoadSpinner from '../messages/LoadSpinner'
import {submitTechnicalReviewDetails} from '../../actions/technicalReviewActions'

const TechReviewPage = (
	{
		proposals, astronomers, user, filters, technicalReviewChange,
		technicalReviewerChange, requestSummary, submitTechnicalReviews,
		submittedReviews, submittingReviews, loading, reviewsError
	}) => {
	// const  = proposals.errors.submittingReviewsError
	
	if (loading ){
		return <LoadSpinner />
		}
	return(
  <div>
    <TechReviewTable submitTechnicalReviews={ submitTechnicalReviews }
			isPastSemester={ currentSemester() > filters.selectedSemester }
			astronomers={ astronomers }
			user={ user }
			proposals={ proposals }
			SALTAstronomers={ astronomers }
			technicalReviewChange={ technicalReviewChange }
			technicalReviewerChange={ technicalReviewerChange }
			requestSummary={ requestSummary }
			semester={ filters.selectedSemester }
		/>
    <SubmissionStatusComponent
			submitting={ submittingReviews }
			reviewsError={ reviewsError }
			submittedReviews={ submittedReviews }
		/>
    {
    	filters.selectedSemester >= defaultSemester() && !submittingReviews &&
			<button
				disabled={ submittingReviews }
				className='btn-success'
				onClick={ () => submitTechnicalReviewDetails(proposals) }>Submit</button>
    }
			
  </div>
		)
	
}

TechReviewPage.propTypes = {
	proposals: propTypes.object.isRequired,
	astronomers: propTypes.array.isRequired,
	user: propTypes.object.isRequired,
	filters: propTypes.object.isRequired,
	technicalReviewChange: propTypes.func.isRequired,
	technicalReviewerChange: propTypes.func.isRequired,
	requestSummary: propTypes.func.isRequired,
	submitTechnicalReviews: propTypes.func.isRequired,
	submittingReviews: propTypes.bool.isRequired,
	submittedReviews: propTypes.bool.isRequired,
	loading: propTypes.bool.isRequired,
}

export default TechReviewPage

// export default connect(store => {
// 	const SALTAstronomers = store.SALTAstronomers.SALTAstronomer
// 	const selectedSA = store.filters.selectedLiaison
// 	const semester = store.filters.selectedSemester
// 	const saUser = selectedSA === 'All' || selectedSA === 'Not Assigned' || selectedSA === 'Assigned' ? selectedSA : getLiaisonUsername(selectedSA, SALTAstronomers)
// 	const proposals = reduceProposalsPerAstronomer(store.proposals.proposals || [], saUser, semester)
//
// 	return {
// 		proposals,
// 		updatedProposals: store.proposals.updatedProposals,
// 		partner: store.filters.selectedPartner,
// 		semester: store.filters.selectedSemester,
// 		user: store.user.user,
// 		SALTAstronomers: store.SALTAstronomers.SALTAstronomer,
// 		loading: store.proposals.fetching,
// 		submittingReviews: store.proposals.submittingTechnicalReviews,
// 		submittedReviews: store.proposals.submittedTechnicalReviews,
// 		reviewsError: store.proposals.errors.submittingReviewsError,
// 		initProposals: store.proposals.initProposals,
//
// 	}
// }, null)(TechReviewPage)

