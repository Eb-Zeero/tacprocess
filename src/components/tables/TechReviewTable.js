import React from 'react';
import propTypes from "prop-types";
import '../../styles/components/tables.css';
import { canAssignOtherReviewer } from "../../util";
import {getTechnicalReport} from "../../util/filters";

function getReviewer(proposal, semester){
	const review = proposal.techReviews[semester];
	return review ? review.reviewer.username : null;
}

export default class TechReviewTable extends React.Component {
	techReportChange = (proposalCode, prevTechReport, field, value, reviewer) => {
		reviewer = reviewer === null ? this.props.user.username : reviewer;
		this.props.onTechReviewChange(proposalCode,
			{
				reviewer: { username: reviewer },
				...prevTechReport,
				[field]: value
			});
	};
	
	techReviewerChange = (proposalCode, reviewer, techReport) => {
		this.props.onTechReviewChange(proposalCode,
			{
				reviewer: { username: reviewer },
				...techReport
			});
	};
	disableCheckbox = (proposalCode, reviewer, semester) => {
		return this.props.initProposals.some(p => {
			if( p.proposalCode === proposalCode){
				return p.techReviews[semester].reviewer.username === reviewer
			}
			return false
		})
		
	};
	
	render() {
		const {proposals, user, SALTAstronomers, semester, unAssign} = this.props;
		if (proposals.length === 0) {
			return (<br/>)
		}
		
		// compare astronomers by their first name
		const compareByFirstName = (a, b) => {
			const name1 = a.name.toUpperCase();
			const name2 = b.name.toUpperCase();
			if (name1 < name2) {
				return -1;
			}
			if (name1 > name2) {
				return 1;
			}
			return 0;
		};
		
		const saltAstronomerName = (username) => {
			const name = (SALTAstronomers).find(a => {
				return a.username === username
			});
			return name ? name.name : null;
		};
		
		return (
			<div className='SATableDiv'>
				<h1>Salt Astronomers Proposal Assigning</h1>
				<table className='SATable' align='center'>
					<thead>
					<tr>
						<th>Proposal Code</th>
						<th>Proposal Title</th>
						<th>Proposal Investigator</th>
						{semester >= "2018-1" && <th>Feasible</th> }
						<th>Proposal Comment</th>
						{semester >= "2018-1" && <th>Detailed check</th> }
						<th>Assigned Astronomer</th>
					</tr>
					</thead>
					<tbody>
					{
						proposals.map(p => {
							const reviewer = getReviewer(p, semester);
							const techReport = getTechnicalReport(p, semester);
							return (
								<tr key={p.proposalId}>
									<td className="width-150"><a target="_blank"
									                             href={`https://www.salt.ac.za/wm/proposal/${p.proposalCode}`}>{p.proposalCode}</a>
									</td>
									<td className=" table-height width-400">{p.title}</td>
									<td className="width-100">{p.pi}</td>
									{
										semester >= "2018-1" && <td>
											<select
												defaultValue={techReport.feasible}
												onChange={e =>
													this.techReportChange(p.proposalCode,
														techReport,
														"feasible",
														e.target.value,
														reviewer)
												}>
												<option>{"none"}</option>
												<option>{"yes"}</option>
												<option>{"yes with caveats"}</option>
												<option>{"no"}</option>
												<option>{"ongoing"}</option>
											</select>
										</td> }
									<td className="width-100">
												<textarea
													disabled={!(semester >= "2018-1")}
													className="table-height-fixed width-400"
													value={
														semester >= "2018-1" ? techReport.comment
															|| ""
															:
															`Feasible: ${techReport.feasible !== null ? techReport.feasible : ""}
		                                                        Comment: ${techReport.comment !== null ? techReport.comment : ""}
		                                                        Detailed Check: ${techReport.details !== null ? techReport.details : ""}
		                                                        `
													}
													
													onChange={semester >= "2018-1" ? e => {
														this.techReportChange(p.proposalCode,
															techReport,
															"comment",
															e.target.value,
															reviewer)
													} : e => e}
												>

												</textarea>
									</td>
									{
										semester >= "2018-1" && <td className="width-100">
											<select
												defaultValue={techReport.details}
												onChange={e => {
													this.techReportChange(p.proposalCode,
														techReport,
														"details",
														e.target.value,
														reviewer);
												}}>
												<option value={null}>none</option>
												<option>yes</option>
												<option>no</option>
												<option>ongoing</option>
											</select>
										</td>
									}
									<td className="width-200">
										{
											!canAssignOtherReviewer(user.roles) ? p.techReviews[semester].reviewer.username === null  ?
												<div>
													<input
														type={"checkbox"}
														value={user.username}
														onChange={e => {
															this.techReviewerChange(p.proposalCode,
																e.target.value,
																techReport)
														}}/>
													<label>Assign Yourself</label>
												</div>
												: <div>
													
													{
													<input
														disabled={this.disableCheckbox(p.proposalCode,  p.techReviews[semester].reviewer.username, semester)}
														checked={true}
														type={"checkbox"}
														onChange={() => unAssign(p.proposalCode)
														}/>
													}
													<label>{saltAstronomerName(reviewer)}</label>
												</div>
												:
												<select disabled={!(semester >= "2018-1")}
												        value={reviewer ? reviewer : null}
												        onChange={e => {
													        this.techReviewerChange(p.proposalCode,
														        e.target.value,
														        techReport)
												        }}>
													{!p.techReviews[semester].reviewer.username && <option value={null}>none</option>}
													{
														SALTAstronomers.sort(compareByFirstName).map(
															astronomer => (
																<option
																	key={astronomer.username}
																	value={astronomer.username}
																>
																	{saltAstronomerName(
																		astronomer.username)}
																</option>
															))
													}
												</select>
										}
									</td>
								</tr>
							);
						})
					}
					</tbody>
				</table>
			</div>
		);
	};
}

TechReviewTable.propTypes = {
	proposals: propTypes.array.isRequired,
	user: propTypes.object.isRequired,
	SALTAstronomers: propTypes.array.isRequired,
	onTechReviewChange: propTypes.func.isRequired,
	unAssign: propTypes.func,
	proposalsFilter: propTypes.string,
	semester: propTypes.string.isRequired,
	initProposals: propTypes.array,
};
