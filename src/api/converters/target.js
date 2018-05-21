export default function convertTargets(targets){
	return targets.map(target => (
		{
			isOptional: target.isOptional,
			ra: target.position.ra / 15, // from degrees to hours
			dec: target.position.dec
		}
	))
}