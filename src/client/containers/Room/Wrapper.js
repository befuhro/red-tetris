import {connect} from 'react-redux';

import Wrapper from '../../components/Room/Wrapper';

const mapStateToProps = (state) => ({errors: state.room.errors});

const mapDispatchToProps = dispatch => ({ dispatch: dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
