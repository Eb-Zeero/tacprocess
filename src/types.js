export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const FETCHING_USER = "FETCHING_USER";
export const FAIL_TO_GET_USER = "FAIL_TO_GET_USER";

export const SWITCH_USER_START = "SWITCH_USER_START";
export const SWITCH_USER_FAIL = "SWITCH_USER_FAIL";

export const FETCH_STAT_DATA_START = "FETCH_STAT_DATA_START";
export const FETCH_STAT_DATA_FAIL = "FETCH_STAT_DATA_FAIL";
export const FETCH_STAT_DATA_PASS = "FETCH_STAT_DATA_PASS";

export const FETCH_PROPOSALS_PASS = "FETCH_PROPOSALS_PASS";
export const FETCH_PROPOSALS_FAIL = "FETCH_PROPOSALS_FAIL";
export const FETCH_PROPOSALS_START = "FETCH_PROPOSALS_START";

export const FETCH_TARGETS_PASS = "FETCH_TARGETS_PASS";
export const FETCH_TARGETS_FAIL = "FETCH_TARGETS_FAIL";
export const FETCH_TARGETS_START = "FETCH_TARGETS_START";

export const FETCH_SELECTOR_DATA_START = "FETCH_SELECTOR_DATA_START";
export const FETCH_SELECTOR_DATA_FAIL = "FETCH_SELECTOR_DATA_FAIL";
export const FETCH_SELECTOR_DATA_PASS = "FETCH_SELECTOR_DATA_PASS";

export const PAGE_CHANGE = "PAGE_CHANGE";
export const ASTRONOMER_CHANGE = "ASTRONOMER_CHANGE";
export const SEMESTER_CHANGE = "SEMESTER_CHANGE";
export const PARTNER_CHANGE = "PARTNER_CHANGE";

export const TIME_ALLOCATIONS_QUERY_START = "TIME_ALLOCATIONS_QUERY_START";
export const TIME_ALLOCATIONS_QUERY_FAIL = "TIME_ALLOCATIONS_QUERY_FAIL";
export const TIME_ALLOCATIONS_QUERY_PASS = "TIME_ALLOCATIONS_QUERY_PASS";
export const SUBMIT_TIME_ALLOCATIONS_START = "SUBMIT_TIME_ALLOCATIONS_START";
export const SUBMIT_TIME_ALLOCATIONS_PASS = "SUBMIT_TIME_ALLOCATIONS_PASS";
export const SUBMIT_TIME_ALLOCATIONS_FAIL = "SUBMIT_TIME_ALLOCATIONS_FAIL";
export const UPDATE_SINGLE_PROPOSAL = "UPDATE_SINGLE_PROPOSAL";
export const UPDATING_PROPOSALS = "UPDATING_PROPOSALS";
export const SUBMIT_TECHNICAL_REVIEWS_START = "SUBMIT_TECHNICAL_REVIEWS_START";
export const SUBMIT_TECHNICAL_REVIEWS_FAIL = "SUBMIT_TECHNICAL_REVIEWS_FAIL";
export const SUBMIT_TECHNICAL_REVIEWS_PASS = "SUBMIT_TECHNICAL_REVIEWS_PASS";
export const UPDATE_TECHNICAL_REVIEW = "UPDATE_TECHNICAL_REVIEW";

export const ALL_PARTNER = 'All';

export const ADMINISTRATOR = 'Administrator';
export const SALT_ASTRONOMER = 'SALT Astronomer';
export const TAC_CHAIR = 'TAC Chair';
export const TAC_MEMBER = 'TAC Member';

export const HOME_PAGE = "Time Allocation Committee";
export const TECHNICAL_PAGE = "Technical Review";
export const TAC_PAGE = "Time Allocation";
export const ADMIN_PAGE = "Admin";
export const STATISTICS_PAGE = "Statistics";
export const DOCUMENTATION_PAGE = "Documentation";

export const VIEW_TIME_ALLOCATION_PAGE = 'VIEW_TIME_ALLOCATION_PAGE';
export const EDIT_TIME_ALLOCATION_PAGE = 'EDIT_TIME_ALLOCATION_PAGE';
/*
* Allows a login user who is an astronomer to assign him/herself
* to the proposal is no astronomer is yet assigned
*/
export const SELF_ASSIGN_TO_PROPOSAL = "SELF_ASSIGN_TO_PROPOSAL";
/*
* Allows a login user who is an administrator to change or update
* the astronomer assigned to a proposal
*/
export const CHANGE_LIAISON = "CHANGE_LIAISON";

export const FETCH_SA_START = "FETCH_SA_START";
export const FETCH_SA_FAIL = "FETCH_SA_FAIL";
export const FETCH_SA_PASS = "FETCH_SA_PASS";

export const UPDATE_TAC_COMMENT = "UPDATE_TAC_COMMENT";
export const UPDATE_ALLOCATED_PRIORITY = "UPDATE_ALLOCATED_PRIORITY";

export const badTime = {
    color: 'black',
    background:"#FF6060"
};
export const goodTime = {
    color: 'black',
    background:"#d4fce6"
};
