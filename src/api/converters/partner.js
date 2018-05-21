import { ALL_PARTNER } from '../../types'

export default function convertPartnerAllocations(availableTimes){
	return availableTimes.reduce(
		(prev, partner) => ({
			...prev,
			[ partner.code ]: {
				p0p1: partner.timeAllocation.allocatedTime.p0Andp1,
				p2: partner.timeAllocation.allocatedTime.p2,
				p3: partner.timeAllocation.allocatedTime.p3
			}
		}),
		{ [ ALL_PARTNER ]: { p0p1: 0, p1: 0, p2: 0, p3: 0 } }
	)
}