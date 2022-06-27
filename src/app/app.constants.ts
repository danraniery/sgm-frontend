import {environment} from 'src/environments/environment';

/**
 * Password regex explanation
 * ^ Beginning. Match the beginning of the regex string
 * (?=.*[a-z]) lowercase alphabet
 * (?=.*[A-Z]) uppercase alphabet
 * (?=.*\d) numbers
 * (?=.*[#$^+=!*()@%&]) special characters
 * . Dot. Match any characters except line breaks
 * {7, } Quantifier. Match from 7 or more,  the precending token
 * $ End. Match the end of the regex string
 */
export const PATTERN_PASSWORD = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{7,}$';
/** Constants for security add its constraints */
export const MIN_SIZE_PASSWORD = 7;

/**
 * Endpoint URLs Constants
 */
export const API = 'api';
export const SERVER_API_URL = environment.API_BASE_URL;
export const API_URL = `${API}/`;
export const ACTIVATED = `/activated`;
export const API_USERS_URL = `${SERVER_API_URL}${API_URL}users`;
export const API_ACCOUNT_URL = `${API_URL}account`;
export const API_PROFILE_URL = `${API_URL}profiles`;
export const API_AUTHENTICATE_URL = `${API_URL}authenticate`;
export const API_CHANGE_PASSWORD_URL = `${SERVER_API_URL + API_ACCOUNT_URL}/change-password`;
export const API_REFRESH_TOKEN_URL = `${SERVER_API_URL + API_AUTHENTICATE_URL}/refresh`;
export const DISABLE_GENERIC_ROUTE = '/logic';

/**
 * Navigation URLs Constants
 */
export const NEW = '/new';
export const EDIT = '/edit';
export const VIEW = '/view';

/**
 * Settings Constants
 */
export const SETTINGS = '/settings';
export const SETTINGS_PROFILE = `${SETTINGS}/profiles/`;
export const SETTINGS_PERMISSIONS = `${SETTINGS}/permissions/`;

/**
 * User Constants
 */
export const USER_LIST_ROUTER = '/users';
export const CREATE_USER_ROUTER = '/users/new';
export const MIN_SIZE_NAME = 2;
export const MAX_SIZE_NAME = 100;
export const MIN_SIZE_USER_NAME = 2;
export const MAX_SIZE_USER_NAME = 256;

/**
 * Login page Constants
 */
export const LOGIN_ROUTE = '/login';
export const CHANGE_PASSWORD_ROUTER = '/password';
export const TEXT_TYPE = 'text';
export const PASSWORD_TYPE = 'password';
export const LOCK_ICON = 'lock';
export const UNLOCK_ICON = 'lock_open';

/**
 * Storage Constants
 */
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const PREVIOUS_URL_SESSION_TOKEN = 'previousUrl';
export const REQUIRED_CHANGE_PASSWORD = 'requiredChangePassword';

/**
 * Authentication Constants
 */
export const BEARER = 'Bearer ';
export const DEFAULT_SERVER_NOT_REACHABLE_MESSAGE = 'Unreachable server.';
export const DEFAULT_SERVER_NOT_REACHABLE_KEY = 'message.serverNotReachable';
export const DEFAULT_ACTION_NOT_REACHABLE_KEY = 'message.actionNotReachable';
export const CHUNK_LOAD_ERROR = 'ChunkLoadError';

/**
 * Profile Constants
 */
export const PROFILE_MIN_SIZE_NAME = 2;
export const PROFILE_MAX_SIZE_NAME = 100;
export const PROFILE_MAX_SIZE_DESCRIPTION = 256;

/**
 * Pagination Constants
 */
export const INITIAL_PAGE = 1;
export const ITEMS_PER_PAGE = 20;

/**
 * Others constants
 */
export const DEBOUNCE_TIME = 500;
export const LOADING_TIME = 500;
export const TOAST_TIME_OUT = 4000;
export const TOAST_TIME_OUT_LATE = 8000;
export const ACTIVE_LABEL = 'status.active';
export const INACTIVE_LABEL = 'status.inactive';
