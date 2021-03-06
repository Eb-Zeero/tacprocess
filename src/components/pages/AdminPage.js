import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import SwitchUserForm from '../forms/SwitchUserForm'
import TacMemberEditTable from '../tables/TacMemberEditTable'
import { switchUser } from '../../actions/auth'
import {addNewMember, removeMember, saveMembers} from '../../actions/timeAllocationActions'
import { fetchTacMembers, fetchSaltUsers } from '../../actions/adminActions'
import { getPartnerList } from '../../util/filters'
import { ADMINISTRATOR } from '../../types'
import { addTacMembers, removeTacMembers } from '../../util'

class AdminPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTacMembers())
    dispatch(fetchSaltUsers())
  }
	onSwitchUser = (username) => {
	  this.props.dispatch(switchUser(username))
	};
	addMember = (member, partner) => {
	  this.props.dispatch(addNewMember(member, partner))
	};
	removeMember = (member, partner) => {
	  this.props.dispatch(removeMember(member, partner))
	};
	saveMembers = (partner) => {
		addTacMembers(partner, (this.props.newMembers[ partner ] || []).reduce((prev, cur) => [...prev, {
			member: cur.username,
			is_chair: false
		}], []))
		removeTacMembers(partner, (this.props.removedMembers[ partner ] || []).reduce((prev, cur) => [...prev, {
			member: cur.username,
		}], []))
		this.props.dispatch(saveMembers())
		this.props.dispatch(fetchTacMembers())
	};
	
	render() {
	  const { user } = this.props
	  const partners = getPartnerList(user.roles)
	  return (
	    <div>
	      { (user.roles || []).some(r => r.type === ADMINISTRATOR) &&
				<div>
				  {this.props.fetchingUser && <h1>LOADING!!!!</h1>}
				  {this.props.userError && <h1>ERROR!!!!!</h1>}
				  <SwitchUserForm onSwitchUser={ this.onSwitchUser } error={ this.props.userError }/>
				</div>
	      }
	      <div>
	        <TacMemberEditTable
	          tacMembers={ this.props.tacMembers }
	          newMembers={ this.props.newMembers }
	          removedMembers={ this.props.removedMembers }
	          saveMembers={ this.saveMembers }
	          saltUsers={ this.props.saltUsers }
	          addMember={ this.addMember }
	          removeMember={ this.removeMember }
	          newMemberInput={ this.newMemberInput }
	          partners={ partners }
	        />
	      </div>
	    </div>
	  )
	}
}

AdminPage.propTypes = {
  dispatch: propTypes.func.isRequired,
  tacMembers: propTypes.object.isRequired,
  newMembers: propTypes.object,
  removedMembers: propTypes.object,
  userError: propTypes.object,
  saltUsers: propTypes.array.isRequired,
  fetchingUser: propTypes.bool,
  user: propTypes.object.isRequired,
}

export default connect((store) => ({
  fetchingUser: store.user.fetching,
  userError: store.user.error,
  user: store.user.user,
  tacMembers: store.tac.tacMembers,
  saltUsers: store.tac.saltUsers,
  newMembers: store.tac.newMembers,
  removedMembers: store.tac.removedMembers
}))(AdminPage)
