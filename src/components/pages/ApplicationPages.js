import React from 'react'
import propTypes from 'prop-types'
import { Route } from 'react-router-dom'
import AdminPage from './AdminPage'
import TimeAllocationPage from './TimeAllocationPage'
import LiaisonPage from './LiaisonPage'
import LoginPage from './LoginPage'
import { canViewPage } from '../../util'
import DocumentationPage from './DocumentationPage'
import TechReviewPage from './TechReviewPage'
import HomePage from './HomePage'
import StatisticsPage from './StatisticsPage'

import GuestRoute from '../routes/GuestRoute'
import UserRoute from '../routes/UserRoute'
import { ADMIN_PAGE, STATISTICS_PAGE, TAC_PAGE, TECHNICAL_PAGE } from '../../types'

const ApplicationPages = ({
  proposals,
  proposalsPerLiaison,
  initProposals,
  filters,
  user,
  isAuthenticated,
  astronomers,
  setLiaison,
  submitLiaisons,
	technicalReviewChange,
	technicalReviewerChange,
	requestSummary,
	submitTechnicalReviews,
	loading,
	submittingReviews,
	submittedReviews,
}) => {
  const userRoles = user.roles
  return (
    <div className='main-div'>
      <Route path='/' exact component={ HomePage }/>

      <GuestRoute exact path='/login' isAuthenticated={ isAuthenticated } component={ LoginPage }/>

      {
        canViewPage(userRoles, STATISTICS_PAGE) &&
        <UserRoute exact path='/statistics' isAuthenticated={ isAuthenticated }
          component={ StatisticsPage }
        />
      }

      <UserRoute exact path='/timeallocation' isAuthenticated={ isAuthenticated }
        view={ canViewPage(userRoles, TAC_PAGE) }
        component={ TimeAllocationPage }
      />
      {
        canViewPage(userRoles, TECHNICAL_PAGE) &&
        <UserRoute exact isAuthenticated={ isAuthenticated } path='/techreview'
          component={ () => <TechReviewPage
            proposals={ proposalsPerLiaison }
            user={ user }
            astronomers={ astronomers }
            filters={ filters }
						technicalReviewChange={ technicalReviewChange }
						technicalReviewerChange={ technicalReviewerChange }
						requestSummary={ requestSummary }
						submitTechnicalReviews={ submitTechnicalReviews }
						submittingReviews={ submittingReviews }
						submittedReviews={ submittedReviews }
						loading={ loading }
          />
          }
        />
      }
      {
        canViewPage(userRoles, TECHNICAL_PAGE) &&
        <UserRoute exact isAuthenticated={ isAuthenticated } path='/liaison'
          component={ () => <LiaisonPage
            proposals={ proposals.proposals }
            astronomers={ astronomers }
            initProposals={ initProposals }
            user={ user }
            filters={ filters }
            setLiaison={ setLiaison }
            submitLiaisons={ submitLiaisons }
          /> }
        />
      }
      <UserRoute exact isAuthenticated={ isAuthenticated } path='/documentation' component={ DocumentationPage } />
      {
        canViewPage(userRoles, ADMIN_PAGE) &&
        <UserRoute exact isAuthenticated={ isAuthenticated } path='/admin' component={ AdminPage } />
      }
    </div>
  )}

ApplicationPages.propTypes = {
  proposals: propTypes.object,
	proposalsPerLiaison: propTypes.array,
  isAuthenticated: propTypes.bool,
  user: propTypes.object,
  initProposals: propTypes.array,
  filters: propTypes.object,
  astronomers: propTypes.array,
  setLiaison: propTypes.func,
  submitLiaisons: propTypes.func,
	technicalReviewChange: propTypes.func,
	technicalReviewerChange: propTypes.func,
	requestSummary: propTypes.func,
	submitTechnicalReviews: propTypes.func,
	submittingReviews: propTypes.bool,
	submittedReviews: propTypes.bool,
	loading: propTypes.bool,
}

export default ApplicationPages