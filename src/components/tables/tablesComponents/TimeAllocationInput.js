import React from 'react'
import propTypes from 'prop-types'
import {badTime, goodTime} from '../../../types'
import {illegalAllocation} from '../../../util/allocation'

const TimeAllocationInput = ({ onChange, proposal, priority, partner, name }) => {
	const sty = illegalAllocation(proposal, priority, partner) ? badTime : goodTime
	return (
		<div>
			<div>{`${ proposal.proposalCode } (${ priority.toUpperCase() })`}</div>
			<div>
				<input type='text'
							 value={ proposal.allocatedTime[ partner ] ? proposal.allocatedTime[ partner ][ priority ] : 0 }
							 style={ sty }
							 className='width-100'
							 name={ name }
							 onChange={ onChange }/>
			</div>
		</div>
	)
}

 TimeAllocationInput.propTypes = {
	partner: propTypes.string.isRequired,
	name: propTypes.string.isRequired,
	onChange: propTypes.func,
	proposal: propTypes.object,
	priority: propTypes.string,
}

export default TimeAllocationInput