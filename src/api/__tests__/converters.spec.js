import { tacComments } from '../converters/proposal'

describe('test is tac comment is created with in proposal correctly', () => {
	it('should create comment correctly for correct response', () => {
		const comments = [
			{
				comment: 'this is tac comment one',
				partner: {
					code: 'ABC'
				}
			},
			{
				comment: 'this is tac comment two',
				partner: {
					code: 'BCD'
				}
			},
			{
				comment: 'this is tac comment three',
				partner: {
					code: 'XYZ'
				}
			}
			]
		expect(tacComments(comments)).toEqual({
			'ABC': {
				comment: "this is tac comment one"
			},
			'BCD': {
				comment: "this is tac comment two"
			},
			'XYZ': {
				comment: "this is tac comment three"
			},
		})
	})
	it('should be empty if no comment, null or undefined', () => {
		expect(tacComments([])).toBe(true)
		expect(tacComments(null)).toBe(true)
		expect(tacComments(undefined)).toBe(true)
		expect(tacComments()).toBe(true)
	})
	it('should not produce any results if partner is not provided', () => {
		expect(tacComments([{comment: "this is a comment"}])).toEqual({p: "p"})
		expect(tacComments([{comment: "this is a comment", partner:{code: null}}])).toEqual({})
		expect(tacComments([{comment: "this is a comment", partner:{code: undefined}}])).toEqual({})
		expect(tacComments([{comment: "this is a comment", partner:{name: 'XXX'}}])).toEqual({})
		expect(tacComments([{comment: "this is a comment", partner:{name: ''}}])).toEqual({})
		expect(tacComments([{comment: "this is a comment", partner:{}}])).toEqual({})

	})
	it('should only produce what it can', () => {
		const comments = [
			{
				comment: 'this is tac comment one',
				partner: {
					code: 'ABC'
				}
			},
			{
				comment: 'this is tac comment two',
				partner: {
					code: null
				}
			},
			{
				comment: 'this is tac comment three',
				partner: {
					code: 'XYZ'
				}
			},
			{
				comment: 'this is tac comment three',
				partner: {
				}
			},
			
			{
				comment: 'this is tac comment three',
			},
			{
				comment: 'this is tac comment three',
				partner: {
					code: undefined
				}
			},
			{
				comment: 'this is tac comment three',
				partner: {
					code: null
				}
			}
		]
		expect(tacComments(comments)).toEqual({
			'ABC': {
				comment: "this is tac comment one"
			},
			'XYZ': {
				comment: "this is tac comment three"
			},
		})
	})
	it('should make comment string if no comment', () => {
		const comments = [
			{
				comment: 'this is tac comment one',
				partner: {
					code: 'ABC'
				}
			},
			{
				comment: '',
				partner: {
					code: 'BCD'
				}
			},
			{
				comment: null,
				partner: {
					code: 'XYZ'
				}
			},
			{
				comment: undefined,
				partner: {
				}
			},
			{
				partner: {
					code: 'CDE'
				}
			}
		]
		expect(tacComments(comments)).toEqual({
			'ABC': {
				comment: "this is tac comment one"
			},
			'BCD': {
				comment: ''
			},
			'CDE': {
				comment: ''
			},
			'XYZ': {
				comment: ''
			}
		})
	})
})