import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	submitTechnicalReviewDetails,
	updateTechnicalReview
} from '../../actions/technicalReviewActions'
import TechReviewTable from '../tables/TechReviewTable'
import { defaultSemester, getLiaisonUsername } from '../../util'
import { reduceProposalsPerAstronomer } from '../../util/filters'

class TechReviewPage extends React.Component {
	// Updates the comment of the specific proposal
	onTechReviewChange = (proposalCode, techReview) => {
		this.props.dispatch(updateTechnicalReview(proposalCode, this.props.semester, techReview))
	};
	
	submitTechReview(proposals){
		this.props.dispatch(submitTechnicalReviewDetails(proposals, this.props.user, this.props.initProposals, this.props.partner, this.props.semester))
	}
	
	render() {
		const {
		  proposals,
			initProposals,
			SALTAstronomers,
			user,
			submittingReviews,
			submittedReviews,
			semester,
			loading,
			reviewsError
		} = this.props
		const submitting = submittingReviews
		
		if (loading ){
			return ( <div className='spinner'>
  <div className ='dot1'/>
  <div className='dot2'/>
			</div>)
		}
		
		return(
			
  <div>
    <TechReviewTable
					user={ user }
					proposals={ proposals }
					SALTAstronomers={ SALTAstronomers }
					onTechReviewChange={ this.onTechReviewChange }
					semester={ semester }
					initProposals={ initProposals }
				/>
    <div style={ { fontWeight: 'bold', fontSize: 20, textAlign: 'center' } }>
      {submitting && <span>Submitting...</span>}
      {submittedReviews && <span style={ { color: 'green' } }><br/>Submission successful</span>}
      {reviewsError && <span style={ { color: 'red' } }><br/>{`Submission failed: ${ reviewsError }`}</span>}
    </div>
    {
					semester >= defaultSemester() && !submitting &&
					<button
						disabled={ submitting }
						className='btn-success'
						onClick={ () => this.submitTechReview(proposals)
						}>Submit</button>
				}
			
  </div>
		)
		
	}
}

TechReviewPage.propTypes = {
	proposals: PropTypes.array.isRequired,
	initProposals: PropTypes.array.isRequired,
	SALTAstronomers: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	submittingReviews: PropTypes.bool.isRequired,
	submittedReviews: PropTypes.bool.isRequired,
	semester: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	partner: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired,
	reviewsError: PropTypes.string.isRequired
}

export default connect(store => {
	const SALTAstronomers = store.SALTAstronomers.SALTAstronomer
	const selectedSA = store.filters.selectedLiaison
	const semester = store.filters.selectedSemester
	const saUser = selectedSA === 'All' || selectedSA === 'Not Assigned' || selectedSA === 'Assigned' ? selectedSA : getLiaisonUsername(selectedSA, SALTAstronomers)
	const proposals = reduceProposalsPerAstronomer(store.proposals.proposals || [], saUser, semester)
	
	return {
		proposals,
		updatedProposals: store.proposals.updatedProposals,
		partner: store.filters.selectedPartner,
		semester: store.filters.selectedSemester,
		user: store.user.user,
		SALTAstronomers: store.SALTAstronomers.SALTAstronomer,
		loading: store.proposals.fetching,
		submittingReviews: store.proposals.submittingTechnicalReviews,
		submittedReviews: store.proposals.submittedTechnicalReviews,
		reviewsError: store.proposals.errors.submittingReviewsError,
		initProposals: store.proposals.initProposals,
		
	}
}, null)(TechReviewPage)
