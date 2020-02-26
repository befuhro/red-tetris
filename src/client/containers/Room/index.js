import {connect} from 'react-redux';

import Room from '../../components/Room';

const mapStateToProps = (state) => ({errors: state.room.errors, intervalMove: state.room.intervalMove});

const mapDispatchToProps = dispatch => ({ dispatch: dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Room);
