import React from 'react'
import * as _ from 'lodash'

/**
 * Return the technical report. The returned object depends on the requested format:
 *
 * 'object' returns an object with fields 'feasible', 'comment' and 'details'.
 * 'jsx' returns a JSX object.
 * Any other format returns a string representation.
 *
 * The format is case-insensitive.
 *
 * @param proposal The proposal.
 * @param semester The semester.
 * @param format The format.
 * @returns {*}
 */
export function getTechnicalReport(proposal, semester, format='string') {
  const review = proposal.technicalReviews[ semester ]
  const feasible = review && review.feasible ? review.feasible : null
  const comment = review && review.comment ? review.comment : null
  const details = review && review.details ? review.details : null
  const report = review && review.report ? review.report : null

  const lcFormat = format.toLowerCase()

  if (lcFormat === 'object') {
    return {
      feasible,
      comment,
      details,
      report
    }
  }

  let lines
  if (!feasible && !comment && !details) {
    lines = ['(no report yet)']
  } else {
    lines = [
      `Feasible: ${ feasible || '' }`,
      `Comment: ${ comment || '' }`,
      `Detailed check: ${ details || '' }`
    ]
  }

  if (lcFormat === 'jsx') {
    return <div>
      {lines.map((line) => <div key={ line }>{line}</div>)}
    </div>
  }

  return lines.join('\n')
}

function getDefaultReview(p, semester) {
  let name = null
  let feasible = null
  let details = null
  let comment = null

  if (Object.keys(p.technicalReviews).some(s => s < semester)) {
    Object.keys(p.technicalReviews).forEach(s => {

      if (s < semester && (!_.isNull(p.technicalReviews[ s ].comment) || p.technicalReviews[ s ].comment !== 'none')) {
        name = p.liaisonAstronomer
        feasible = 'yes'
        details = 'no'
        comment = 'Continuation of an existing proposal. Please see the PI’s report.'
      }
    })
  }
  return {
    reviewer: { username: name },
    feasible,
    comment,
    details

  }

}

export function setDefaultTechReviews(proposals, semester) {
  return (proposals || []).map(proposal => {
    if (proposal.technicalReviews[ semester ]) {
      return proposal
    }
        
    const rev = getDefaultReview(proposal, semester)
    return {
      ...proposal,
      technicalReviews: {
        ...proposal.technicalReviews,
        [ semester ]: {
          reviewer: rev.reviewer,
          feasible: rev.feasible,
          comment: rev.comment,
          details: rev.details
        }
      }
    }

  })
}