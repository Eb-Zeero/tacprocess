import {
  SUBMIT_TECHNICAL_REVIEWS_FAIL,
  SUBMIT_TECHNICAL_REVIEWS_PASS,
  SUBMIT_TECHNICAL_REVIEWS_START,
  UPDATE_TECHNICAL_REVIEWER,
  UPDATE_TECHNICAL_REVIEW,
} from '../types'
import { jsonClient } from '../api/'
import { isTechReportUpdated, isReviewerUpdated } from '../util/filters'
import fetchProposals from './proposalsActions'
import { makeTechComment } from '../util'

/**
 * An action for updating the technical review of a proposal in the local store.
 *
 * @param proposalCode Proposal code, such as "2018-1-SCI-009".
 * @param semester Semester, such as "2018-1".
 * @param field either comment details, or feasible. it is a string
 * @param newValue a new value to place on a filed.
 * @returns {{type, payload: {proposalCode: *, reviewer: *}}} The action.
 */
export function updateTechnicalReview(proposalCode, semester, field, newValue) {
  return {
    type: UPDATE_TECHNICAL_REVIEW,
    payload: {
      proposalCode,
      semester,
			field,
      newValue
    }
  }
}

/**
 * An action for updating the technical reviewer of a proposal in the local store.
 *
 * @param proposalCode Proposal code, such as "2018-1-SCI-009".
 * @param semester Semester, such as "2018-1".
 * @param reviewer a new value to place on a filed.
 * @returns {{type, payload: {proposalCode: *, reviewer: *}}} The action.
 */
export function updateTechnicalReviewer(proposalCode, semester, reviewer) {
	return {
		type: UPDATE_TECHNICAL_REVIEWER,
		payload: {
			proposalCode,
			semester,
			reviewer
		}
	}
}

function startSubmittingTechnicalReviews() {
  return {
    type: SUBMIT_TECHNICAL_REVIEWS_START
  }
}

function submittingTechnicalReviewsFail(error) {
  return {
    type: SUBMIT_TECHNICAL_REVIEWS_FAIL,
    payload: { error }
  }
}

function submittingTechnicalReviewsPass() {
  return {
    type: SUBMIT_TECHNICAL_REVIEWS_PASS
  }
}

/**
 * An action for submitting reviewers and technical reviews.
 *
 * @param proposals Proposals whose reviewer and technical report are submitted, if they have changed.
 * @param user Current user of tac Web
 * @param initProposals Proposals downloaded from the server. They are used to check whether reviewers or
 *                      technical reports have changed.
 * @param partner Partner code, such "RSA" or "IUCAA".
 * @param semester Semester, such as "2018-1".
 */
export function submitTechnicalReviewDetails(proposals, user, initProposals, partner, semester) {
  return async (dispatch) => {
    dispatch(startSubmittingTechnicalReviews())
    const updatedProposals = proposals
      .filter(p => (
        isReviewerUpdated(p, initProposals, semester) ||
			isTechReportUpdated(p, initProposals, semester)
      ))
    if (updatedProposals.some(p => !p.techReviews[ semester ].reviewer || !p.techReviews[ semester ].reviewer.username)) {
      dispatch(submittingTechnicalReviewsFail('A reviewing astronomer must be assigned to every updated review.'))
      return
    }
    const reviews = updatedProposals.map(p => {
      const reviewer = !p.techReviews[ semester ].reviewer || !p.techReviews[ semester ].reviewer.username
        ? null
        : p.techReviews[ semester ].reviewer.username
      return {
        proposalCode: p.proposalCode,
        reviewer,
        report: makeTechComment(p.techReviews[ semester ])
      }
    })

    try {
      await jsonClient().post('technical-reviews', { semester, reviews })
    } catch (e) {
      dispatch(submittingTechnicalReviewsFail(e.message))
      return
    }
    dispatch(fetchProposals(semester, partner))
    dispatch(submittingTechnicalReviewsPass())
  }
}
