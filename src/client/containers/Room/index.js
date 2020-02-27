import {connect} from 'react-redux';

import Room from '../../components/Room';


const mapDispatchToProps = dispatch => ({ dispatch: dispatch });

export default connect(mapDispatchToProps)(Room);
