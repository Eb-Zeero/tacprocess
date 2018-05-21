export default function convertSaltAstronomer(saltAstronomers){
	return saltAstronomers.map(sa => (
		{
			firstName: sa.firstName,
			username: sa.username,
			lastName: sa.lastName
		}
	))
}