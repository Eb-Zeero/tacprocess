import React from 'react'
import propTypes from 'prop-types'

const SubmissionStatusComponent = ({submitting, submittedReviews, reviewsError}) => (
		<div  style={ {fontWeight: 'bold', fontSize: 20, textAlign: 'center'} } >
			{submitting && <span>Submitting...</span>}
			{submittedReviews && <span style={ { color: 'green' } }><br/>Submission successful</span>}
			{reviewsError && <span style={ { color: 'red' } }><br/>{`Submission failed: ${ reviewsError }`}</span>}
		</div>
	)

SubmissionStatusComponent.defaultProps = {
	submitting: false,
	submittedReviews: false,
	reviewsError: null
}

SubmissionStatusComponent.propTypes = {
	submitting: propTypes.bool,
	submittedReviews: propTypes.bool,
	reviewsError: propTypes.string
}

export default SubmissionStatusComponent
